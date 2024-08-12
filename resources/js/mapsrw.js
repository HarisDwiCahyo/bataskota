import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import XYZ from "ol/source/XYZ.js";
import TileLayer from "ol/layer/Tile.js";
import Group from "ol/layer/Group.js";
import View from "ol/View.js";
import MousePosition from "ol/control/MousePosition.js";
import ScaleLine from "ol/control/ScaleLine.js";
import Control from "ol/control/Control.js";
import { fromLonLat, toLonLat } from "ol/proj.js";
import { format } from "ol/coordinate.js";
import { Circle, Fill, Stroke, Style } from "ol/style.js";
import { DoubleClickZoom, DragBox, DragPan, Draw } from "ol/interaction.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { ImageWMS, Source, TileWMS, Vector } from "ol/source";
import { Image, Layer, Tile } from "ol/layer";
import Overlay from "ol/Overlay.js";
import { getLength, getArea } from "ol/sphere.js";
import { Point, Polygon } from "ol/geom";
import LineString from "ol/geom/LineString.js";
import LayerSwitcher from "ol-layerswitcher";
import { getCenter } from "ol/extent";
import { GeoJSON, WKT } from "ol/format";
import { createBox, createRegularPolygon } from "ol/interaction/Draw";
import { Feature } from "ol";
import Geolocation from "ol/Geolocation.js";
import { transform, Projection } from "ol/proj";

document.addEventListener("DOMContentLoaded", function () {
    // Get all user action links
    var userActions = document.querySelectorAll(".user-action");

    // Add click event listener to each user action link
    userActions.forEach(function (action) {
        action.addEventListener("click", function (event) {
            event.preventDefault();

            // Hide all side-navs
            var sideNavs = document.querySelectorAll(".side-nav");
            sideNavs.forEach(function (nav) {
                nav.classList.remove("active");
            });

            // Show the target side-nav
            var targetSelector = action.getAttribute("data-target");
            var target = document.querySelector(targetSelector);

            if (target) {
                target.classList.add("active");
            } else {
                console.error(
                    "Target sidebar not found for selector: ",
                    targetSelector
                );
            }
        });
    });
});

var cache = {}; // Objek cache untuk menyimpan data GeoJSON

// Fungsi untuk Mengambil Data GeoJSON Berdasarkan URL yang Dipilih
function fetchGeoJsonData1(url) {
    // Cek cache terlebih dahulu
    if (cache[url]) {
        return Promise.resolve(cache[url]);
    }

    return $.getJSON(url)
        .then(function (response) {
            if (response.data) {
                var vectorSource = new VectorSource({
                    features: new GeoJSON().readFeatures(response.data, {
                        featureProjection: "EPSG:4326",
                    }),
                });
                // Simpan data di cache
                cache[url] = vectorSource;
                return vectorSource;
            } else {
                throw new Error("Data GeoJSON tidak ditemukan dalam respons");
            }
        })
        .catch(function (error) {
            console.error("Request Failed:", error);
            return null;
        });
}

// Fungsi untuk Menangani Perubahan Layer
document.getElementById("layerSelect").addEventListener("change", function () {
    var selectedLayer = this.value;
    var url;

    switch (selectedLayer) {
        case "bataspilar":
            url = "/admin/bataspilar";
            break;
        case "bataskota":
            url = "/admin/kota";
            break;
        case "bataskemantren":
            url = "/admin/kecamatan";
            break;
        case "bataskelurahan":
            url = "/admin/kelurahan";
            break;
        case "batasrw":
            url = "/admin/rw";
            break;
        default:
            return;
    }

    // Ambil data GeoJSON dan proses
    fetchGeoJsonData1(url).then(function (vectorSource) {
        if (vectorSource) {
            processData(vectorSource);
        }
    });
});

// Fungsi untuk Memproses Data GeoJSON
function processData(vectorSource) {
    var features = vectorSource.getFeatures();
    var uniqueProperties = extractUniqueProperties(features);

    updatePropertySelect(uniqueProperties);

    document
        .getElementById("propertySelect")
        .addEventListener("change", function () {
            var selectedProperty = this.value;
            processSelectedProperty(selectedProperty, features);
        });
}

// Fungsi untuk Mengekstrak Properti Unik dari Fitur GeoJSON
function extractUniqueProperties(features) {
    var uniqueProperties = new Set();
    features.forEach(function (feature) {
        var properties = feature.getProperties();
        for (var key in properties) {
            if (properties.hasOwnProperty(key) && key !== "geometry") {
                uniqueProperties.add(key);
            }
        }
    });
    return uniqueProperties;
}

// Fungsi untuk Memperbarui Elemen Select Properti
function updatePropertySelect(uniqueProperties) {
    var propertySelect = document.getElementById("propertySelect");
    propertySelect.innerHTML = "<option>Pilih Properti</option>";

    uniqueProperties.forEach(function (property) {
        var option = document.createElement("option");
        option.value = property;
        option.text = property;
        propertySelect.appendChild(option);
    });
}

// Fungsi untuk Memproses Properti yang Dipilih
function processSelectedProperty(selectedProperty, features) {
    var propertyType = determinePropertyType(selectedProperty, features);
    updateOperatorSelect(propertyType);
}

// Fungsi untuk Menentukan Jenis Properti
function determinePropertyType(selectedProperty, features) {
    var propertyType = "";
    features.forEach(function (feature) {
        var properties = feature.getProperties();
        if (properties.hasOwnProperty(selectedProperty)) {
            if (propertyType === "") {
                propertyType = typeof properties[selectedProperty];
            }
        }
    });
    return propertyType;
}

// Fungsi untuk Memperbarui Elemen Select Operator
function updateOperatorSelect(propertyType) {
    var operatorSelect = document.getElementById("operatorSelect");
    operatorSelect.innerHTML = "<option>Pilih Operator</option>";

    var operators = propertyType === "number" ? ["=", ">", "<"] : ["=", "LIKE"];
    operators.forEach(function (operator) {
        var option = document.createElement("option");
        option.value = operator;
        option.text = operator;
        operatorSelect.appendChild(option);
    });
}

// Event listener untuk tombol "Get Filter"
// Variabel global untuk menyimpan referensi ke layer filter yang telah ditambahkan
var previousFilterLayer = null;
var cache = {}; // Objek cache untuk menyimpan data GeoJSON

// Fungsi untuk Mengambil Data GeoJSON Berdasarkan Layer yang Dipilih
function fetchGeoJsonData(url) {
    // Cek cache terlebih dahulu
    if (cache[url]) {
        return Promise.resolve(cache[url]);
    }

    return $.getJSON(url)
        .then(function (response) {
            if (response.data) {
                var vectorSource = new VectorSource({
                    features: new GeoJSON().readFeatures(response.data, {
                        featureProjection: "EPSG:4326",
                    }),
                });
                // Simpan data di cache
                cache[url] = vectorSource;
                return vectorSource;
            } else {
                throw new Error("Data GeoJSON tidak ditemukan dalam respons");
            }
        })
        .catch(function (error) {
            console.error("Request Failed:", error);
            return null;
        });
}

// Fungsi untuk Memfilter Fitur Berdasarkan Properti, Operator, dan Nilai
function filterFeatures(
    vectorSource,
    selectedProperty,
    selectedOperator,
    inputValue
) {
    return vectorSource.getFeatures().filter(function (feature) {
        var value = feature.getProperties()[selectedProperty];

        switch (selectedOperator) {
            case "=":
                return value == inputValue;
            case ">":
                return value > inputValue;
            case "<":
                return value < inputValue;
            case "LIKE":
                return value.toLowerCase().includes(inputValue.toLowerCase());
            default:
                return false;
        }
    });
}

// Fungsi untuk Membuat Layer Vektor dari Fitur yang Difilter
function createVectorLayer(filteredFeatures) {
    var filteredSource = new VectorSource({
        features: filteredFeatures,
    });

    return new VectorLayer({
        title: "Hasil Filter",
        source: filteredSource,
        style: styleFunction, // Gunakan fungsi gaya
    });
}

// Fungsi untuk Menentukan Gaya Berdasarkan Tipe Geometri
function styleFunction(feature) {
    var geometryType = feature.getGeometry().getType();

    switch (geometryType) {
        case "Point":
            return new Style({
                image: new Circle({
                    radius: 7,
                    fill: new Fill({
                        color: "rgba(255, 0, 0, 0.6)",
                    }),
                    stroke: new Stroke({
                        color: "red",
                        width: 2,
                    }),
                }),
            });
        case "LineString":
            return new Style({
                stroke: new Stroke({
                    color: "red",
                    width: 3,
                }),
            });
        case "Polygon":
            return new Style({
                stroke: new Stroke({
                    color: "red",
                    width: 2,
                }),
                fill: new Fill({
                    color: "rgba(0, 0, 255, 0.1)",
                }),
            });
        default:
            return new Style({
                stroke: new Stroke({
                    color: "black",
                    width: 1,
                }),
                fill: new Fill({
                    color: "rgba(0, 0, 0, 0.1)",
                }),
            });
    }
}

// Fungsi untuk Mengatur Tampilan Layer di Peta
function updateMapLayer(vectorLayer) {
    if (previousFilterLayer) {
        map.removeLayer(previousFilterLayer);
    }

    map.addLayer(vectorLayer);
    previousFilterLayer = vectorLayer;

    var extent = vectorLayer.getSource().getExtent();
    map.getView().fit(extent, { duration: 1000 });
}

// Fungsi Utama yang Dijalankan Saat Tombol "Get Filter" Diklik
function onGetFilterButtonClick() {
    var selectedLayer = document.getElementById("layerSelect").value;
    var selectedProperty = document.getElementById("propertySelect").value;
    var selectedOperator = document.getElementById("operatorSelect").value;
    var inputValue = document.getElementById("valueInput").value;

    if (selectedLayer && selectedProperty && selectedOperator && inputValue) {
        var url;
        switch (selectedLayer) {
            case "bataspilar":
                url = "/admin/bataspilar";
                break;
            case "bataskota":
                url = "/admin/kota";
                break;
            case "bataskemantren":
                url = "/admin/kecamatan";
                break;
            case "bataskelurahan":
                url = "/admin/kelurahan";
                break;
            case "batasrw":
                url = "/admin/rw";
                break;
            default:
                return;
        }

        fetchGeoJsonData(url).then(function (vectorSource) {
            if (vectorSource) {
                var filteredFeatures = filterFeatures(
                    vectorSource,
                    selectedProperty,
                    selectedOperator,
                    inputValue
                );
                var vectorLayer = createVectorLayer(filteredFeatures);
                updateMapLayer(vectorLayer);
            }
        });
    } else {
        alert("Silakan pilih semua opsi dan masukkan nilai.");
    }
}

// Event listener untuk tombol "Get Filter"
document
    .getElementById("getFilterButton")
    .addEventListener("click", onGetFilterButtonClick);

function adjustMapHeight() {
    const cardBodyElement = document.querySelector(".card-body");
    const attributeElement = document.getElementById("attribute");
    const mapElement = document.getElementById("map");

    const cardBodyHeight = cardBodyElement.offsetHeight;
    const attributeHeight = attributeElement.offsetHeight;
    const newMapHeight = cardBodyHeight - attributeHeight;

    // Pastikan tinggi baru tidak negatif
    mapElement.style.height = `${newMapHeight > 0 ? newMapHeight : 0}px`;
}

// Tampilkan attribute dan sesuaikan tinggi map saat attribute muncul
function showAttribute() {
    const attributeElement = document.getElementById("attribute");
    attributeElement.classList.add("visible");
    adjustMapHeight();
}

// Sembunyikan attribute dan kembalikan tinggi map saat attribute hilang
function hideAttribute() {
    const attributeElement = document.getElementById("attribute");
    attributeElement.classList.remove("visible");
    adjustMapHeight();
}

// Pasang observer untuk memantau perubahan ukuran attribute
const attributeElement = document.getElementById("attribute");
const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
        adjustMapHeight();
    }
});

observer.observe(attributeElement);

// Misalnya, panggil fungsi showAttribute untuk menampilkan attribute pada halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
    showAttribute(); // Atau gunakan kondisi yang sesuai untuk menampilkan attribute
});

var mapview = new View({
    center: fromLonLat([110.35385111973005, -7.791739623962835]),
    zoom: 18,
    projection: "EPSG:4326",
});

var map = new Map({
    target: "map",
    view: mapview,
    controls: [],
});

var osmTile = new TileLayer({
    title: "Open Street Map",
    visible: true,
    source: new OSM(),
});
var Esri = new TileLayer({
    title: "Esri Maps",
    visible: true,
    source: new XYZ({
        attributions: ["Tiles © Esri"],
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    }),
});

var WorldStreet = new TileLayer({
    title: "World Street Map",
    visible: true,
    source: new XYZ({
        attributions: ["Tiles © Esri"],
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    }),
});

var World_Imagery = new TileLayer({
    title: "World Imagery Map",
    visible: true,
    source: new XYZ({
        attributions: ["Tiles © Esri"],
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    }),
});

var baseGroup = new Group({
    title: "BaseMaps",
    layers: [Esri, osmTile, WorldStreet, World_Imagery],
});

map.addLayer(baseGroup);

// Asumsikan `overlays` sudah didefinisikan dan ditambahkan ke peta
var overlays = new Group({
    title: "Group",
    layers: [],
});
map.addLayer(overlays);

// Ambil data GeoJSON dari endpoint Anda
var highlightedFeature = null; // Variable to store the currently highlighted feature

// Ambil data GeoJSON dari endpoint Anda
// Function to initialize the vector layer
function createVectorLayer1(responseData) {
    const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(responseData, {
            featureProjection: "EPSG:4326",
        }),
    });

    const vectorLayer = new VectorLayer({
        title: "RW",
        source: vectorSource,
        style: new Style({
            stroke: new Stroke({
                color: "blue",
                width: 2,
            }),
            fill: new Fill({
                color: "rgba(0, 0, 255, 0.1)",
            }),
        }),
    });

    return { vectorSource, vectorLayer };
}

// Function to add vector layer to map and fit the view
function addLayerToMap1(vectorLayer, vectorSource) {
    overlays.getLayers().push(vectorLayer);

    const extent = vectorSource.getExtent();
    map.getView().fit(extent, { duration: 1000 });
}

// Function to handle feature highlighting on click
function handleMapClick1(vectorLayer) {
    let highlightedFeature = null;
    const highlightStyle = new Style({
        stroke: new Stroke({
            color: "yellow",
            width: 3,
        }),
        fill: new Fill({
            color: "rgba(255, 255, 0, 0.3)",
        }),
    });

    map.on("click", function (event) {
        let clickedFeature = null;

        map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
            if (layer === vectorLayer) {
                clickedFeature = feature;
                return true;
            }
        });

        if (clickedFeature) {
            if (highlightedFeature) {
                highlightedFeature.setStyle(null);
            }

            clickedFeature.setStyle(highlightStyle);
            highlightedFeature = clickedFeature;

            displayFeatureProperties1(clickedFeature);
        } else {
            document.getElementById("attribute").style.display = "none";
        }
    });
}

// Function to display feature properties in the attribute table
function displayFeatureProperties1(feature) {
    const properties = feature.getProperties();
    let info =
        "<table class='table table-bordered m-0'><thead><tr><th>Keterangan</th><th>Detail</th></tr></thead><tbody>";

    for (const key in properties) {
        if (properties.hasOwnProperty(key) && key !== "geometry") {
            let value = properties[key];

            if (key === "beritaacara") {
                value = `<a href='${value}' target='_blank'>link berita acara</a>`;
            }

            info += `<tr><td>${key}</td><td>${value}</td></tr>`;
        }
    }
    info += "</tbody></table>";

    document.querySelector("#attribute .card-body").innerHTML = info;
    document.getElementById("attribute").style.display = "block";
}

// Main function to fetch data and initialize map features
function initializeMap1() {
    $.getJSON("/admin/rw", function (response) {
        if (response.data) {
            const { vectorSource, vectorLayer } = createVectorLayer1(
                response.data
            );
            addLayerToMap1(vectorLayer, vectorSource);
            handleMapClick1(vectorLayer);
        } else {
            console.error("Data GeoJSON tidak ditemukan dalam respons");
        }
    });
}

// Initialize the map features on page load or when required
initializeMap1();

// Buat instance LayerSwitcher
const layerSwitcher = new LayerSwitcher({
    tipLabel: "Show Layers",
    // collapseTipLabel: "Hide Layers",
    groupSelectStyle: "children",
    collapseTipLabel: "Collapse layers",
});
map.addControl(layerSwitcher);

var mousePosition = new MousePosition({
    className: "mousePosition",
    projection: "EPSG:4326",
    coordinateFormat: function (coordinate) {
        return format(coordinate, "{y} , {x}", 6);
    },
});

map.addControl(mousePosition);

var scaleControl = new ScaleLine({
    target: "custom-scale-line", // Gunakan target terpisah
    text: true,
    bar: true,
});

// Tambahkan kontrol ScaleLine ke peta
map.addControl(scaleControl);

//Home controls
var toolbarDivElement = document.createElement("div");
toolbarDivElement.className = "toolbarDiv";

//full screen control
let fsButton = document.createElement("button");
fsButton.innerHTML = '<span class="icon"><i class="icon-enlarge"></i></span>';
fsButton.className = "myButton";
fsButton.title = "FullScreen";

var fsElement = document.createElement("div");
fsElement.className = "fsButtonDiv";
fsElement.appendChild(fsButton);
toolbarDivElement.appendChild(fsElement);

let fsControl = new Control({
    element: fsElement,
});

fsButton.addEventListener("click", () => {
    let mapEle = document.getElementById("map");
    if (mapEle.requestFullscreen) {
        mapEle.requestFullscreen();
    } else if (mapEle.msRequestFullscreen) {
        mapEle.msRequestFullscreen();
    } else if (mapEle.mozRequestFullscreen) {
        mapEle.mozRequestFullscreen();
    } else if (mapEle.webkitRequestFullscreen) {
        mapEle.webkitRequestFullscreen();
    }
});
map.addControl(fsControl);
//end fullscreen

// Button for Panning
let panButton = document.createElement("button");
panButton.innerHTML = '<span class="icon"><i class="icon-hand"></i></span>';
panButton.className = "myButton";
panButton.id = "panButton";
panButton.title = "Pan";

let panElement = document.createElement("div");
panElement.className = "panButtonDiv";
panElement.appendChild(panButton);
toolbarDivElement.appendChild(panElement);

let panControl = new Control({
    element: panElement,
});

let panFlag = false;
let drgPanInteraction = new DragPan();

panButton.addEventListener("click", () => {
    panButton.classList.toggle("clicked");
    panFlag = !panFlag;
    if (panFlag) {
        document.getElementById("map").style.cursor = "grab";
        map.addInteraction(drgPanInteraction);
    } else {
        document.getElementById("map").style.cursor = "default";
        map.removeInteraction(drgPanInteraction);
    }
});
map.addControl(panControl);
//end pan tool

//start zoom in
var zoomInInteraction = new DragBox();

zoomInInteraction.on("boxend", function () {
    var zoomInExtent = zoomInInteraction.getGeometry().getExtent();
    map.getView().fit(zoomInExtent);
});

var ziButton = document.createElement("button");
ziButton.innerHTML = '<span class="icon"><i class="icon-zoom-in"></i></span>';
ziButton.className = "myButton";
ziButton.id = "ziButton";
ziButton.title = "ZoomIn";

var ziElement = document.createElement("div");
ziElement.className = "ziButtonDiv";
ziElement.appendChild(ziButton);
toolbarDivElement.appendChild(ziElement);

var ziControl = new Control({
    element: ziElement,
});

var zoomInFlag = false;
ziButton.addEventListener("click", () => {
    ziButton.classList.toggle("clicked");
    zoomInFlag = !zoomInFlag;

    if (zoomInFlag) {
        document.getElementById("map").style.cursor = "zoom-in";
        map.addInteraction(zoomInInteraction);
    } else {
        map.removeInteraction(zoomInInteraction);
        document.getElementById("map").style.cursor = "default";
    }
});
map.addControl(ziControl);

//zoom out
var zoomOutInteraction = new DragBox();

zoomOutInteraction.on("boxend", function () {
    var zoomOutExtent = zoomOutInteraction.getGeometry().getExtent();
    map.getView().setCenter(getCenter(zoomOutExtent));

    mapview.setZoom(mapview.getZoom() - 1);
});

var zoButton = document.createElement("button");
zoButton.innerHTML = '<span class="icon"><i class="icon-zoom-out"></i></span>';
zoButton.className = "myButton";
zoButton.id = "zoButton";
zoButton.title = "Zoom Out";

var zoElement = document.createElement("div");
zoElement.className = "zoButtonDiv";
zoElement.appendChild(zoButton);
toolbarDivElement.appendChild(zoElement);

var zoControl = new Control({
    element: zoElement,
});

var zoomOutFlag = false;
zoButton.addEventListener("click", () => {
    zoButton.classList.toggle("clicked");
    zoomOutFlag = !zoomOutFlag;

    if (zoomOutFlag) {
        document.getElementById("map").style.cursor = "zoom-out";
        map.addInteraction(zoomOutInteraction);
    } else {
        map.removeInteraction(zoomOutInteraction);
        document.getElementById("map").style.cursor = "default";
    }
});
map.addControl(zoControl);
//end zoom control

// tool geolocation
// $("#btnCrosshair").on("click", function (event) {
//     $("#btnCrosshair").toggleClass("clicked");
//     if ($("#btnCrosshair").hasClass("clicked")) {
//         startAutolocate();
//     } else {
//         stopAutolocate();
//     }
// });

// var intervalAutolocate;
// var posCurrent;

// var geolocation = new Geolocation({
//     trackingOptions: {
//         enableHighAccuracy: true,
//     },
//     tracking: true,
//     projection: mapview.getProjection(),
// });

// var positionFeature = new Feature();
// positionFeature.setStyle(
//     new Style({
//         image: new Circle({
//             radius: 6,
//             fill: new Fill({
//                 color: "#3399cc",
//             }),
//             stroke: new Stroke({
//                 color: "#fff",
//                 width: 2,
//             }),
//         }),
//     })
// );

// var accuracyFeature = new Feature();
// var currentPositionLayer = new VectorLayer({
//     map: map,
//     source: new VectorSource({
//         features: [accuracyFeature, positionFeature],
//     }),
// });

// function startAutolocate() {
//     var coordinates = geolocation.getPosition();
//     positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
//     accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());

//     // Zoom ke posisi geolokasi
//     if (coordinates) {
//         map.getView().animate({
//             center: coordinates,
//             zoom: 16,
//             duration: 1000, // Durasi animasi dalam milidetik
//         });
//     }

//     intervalAutolocate = setInterval(function () {
//         var coordinates = geolocation.getPosition();
//         var accuracy = geolocation.getAccuracyGeometry();

//         positionFeature.setGeometry(
//             coordinates ? new Point(coordinates) : null
//         );
//         accuracyFeature.setGeometry(accuracy);

//         // Update posisi peta saat geolokasi berubah
//         if (coordinates) {
//             map.getView().animate({
//                 center: coordinates,
//                 duration: 1000, // Durasi animasi dalam milidetik
//             });
//         }
//     }, 10000);
// }

// function stopAutolocate() {
//     clearInterval(intervalAutolocate);
//     positionFeature.setGeometry(null);
//     accuracyFeature.setGeometry(null);
// }
// end tool geolocation

// length measure
let lengthButton = document.createElement("button");
lengthButton.innerHTML = '<span class="icon"><i class="icon-ruler"></i></span>';
lengthButton.className = "myButton";
lengthButton.id = "lengthButton";
lengthButton.title = "Measure Length";

var lengthElement = document.createElement("div");
lengthElement.className = "lengthButtonDiv";
lengthElement.appendChild(lengthButton);
toolbarDivElement.appendChild(lengthElement);

var lengthControl = new Control({
    element: lengthElement,
});

var lengthFlag = false;
lengthButton.addEventListener("click", () => {
    lengthButton.classList.toggle("clicked");
    lengthFlag = !lengthFlag;

    document.getElementById("map").style.cursor = "default";
    if (lengthFlag) {
        map.removeInteraction(draw);
        addInteraction("LineString");
    } else {
        map.removeInteraction(draw);
        source.clear();
        const elements = document.getElementsByClassName(
            "ol-tooltip ol-tooltip-static"
        );
        while (elements.length > 0) elements[0].remove();
    }
});
map.addControl(lengthControl);

//area measure
let areaButton = document.createElement("button");
areaButton.innerHTML =
    '<span class="icon"><i class="icon-straighten"></i></span>';
areaButton.className = "myButton";
areaButton.id = "areaButton";
areaButton.title = "Measure Area";

var areaElement = document.createElement("div");
areaElement.className = "areaButtonDiv";
areaElement.appendChild(areaButton);
toolbarDivElement.appendChild(areaElement);

var areaControl = new Control({
    element: areaElement,
});

var areaFlag = false;
areaButton.addEventListener("click", () => {
    areaButton.classList.toggle("clicked");
    areaFlag = !areaFlag;

    document.getElementById("map").style.cursor = "default";
    if (areaFlag) {
        map.removeInteraction(draw);
        addInteraction("Polygon");
    } else {
        map.removeInteraction(draw);
        source.clear();
        const elements = document.getElementsByClassName(
            "ol-tooltip ol-tooltip-static"
        );
        while (elements.length > 0) elements[0].remove();
    }
});
map.addControl(areaControl);

var continuePolygonMsg = "Click to continue polygon, Doble Click to complete";

var continueLineMsg = "Click to continue line, Doble Click to complete";

var draw;
var source = new VectorSource();

// Membuat layer vektor dengan style yang sudah ditentukan
var vector = new VectorLayer({
    source: source,
    style: new Style({
        fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
            color: "#ffcc33",
            width: 2,
        }),
        image: new Circle({
            radius: 7,
            fill: new Fill({
                color: "#ffcc33",
            }),
        }),
    }),
});
map.addLayer(vector);

function addInteraction(intType) {
    draw = new Draw({
        source: source,
        type: intType,
        style: new Style({
            fill: new Fill({
                color: "rgba(200, 200, 200, 0.6)",
            }),
            stroke: new Stroke({
                color: "rgba(0, 0, 0, 0.5)",
                lineDash: [10, 10],
                width: 2,
            }),
            image: new Circle({
                radius: 5,
                stroke: new Stroke({
                    color: "rgba(0, 0, 0, 0.7)",
                }),
                fill: new Fill({
                    color: "rgba(255, 255, 255, 0.2)",
                }),
            }),
        }),
    });
    map.addInteraction(draw);

    createMeasureTooltip();
    createHelpTooltip();

    var sketch;

    var pointerMoveHandler = function (evt) {
        if (evt.dragging) {
            return;
        }

        var helpMsg = "Click to Start drawing";
        if (sketch) {
            var geom = sketch.getGeometry();
        }
    };
    map.on("pointermove", pointerMoveHandler);

    //var listener
    draw.on("drawstart", function (evt) {
        sketch = evt.feature;

        var tooltipCoord = evt.coordinate;

        sketch.getGeometry().on("change", function (evt) {
            var geom = evt.target;
            var output;

            if (geom instanceof Polygon) {
                output = formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof LineString) {
                output = formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
            }
            measureTooltipElement.innerHTML = output;
            measureTooltip.setPosition(tooltipCoord);
        });
    });

    draw.on("drawend", function () {
        measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
        measureTooltip.setOffset([0, -7]);

        sketch = null;
        measureTooltipElement = null;
        createMeasureTooltip();
    });
}

var helpTooltipElement;
var helpTooltip;

function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }

    helpTooltipElement = document.createElement("div");
    helpTooltipElement.className = "ol-tooltip hidden";
    helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: "center-left",
    });

    map.addOverlay(helpTooltip);
}

$(map.getViewport()).on("mouseout", function () {
    $(helpTooltipElement).addClass("hidden");
});

var measureTooltipElement;
var measureTooltip;

function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }

    measureTooltipElement = document.createElement("div");
    measureTooltipElement.className = "ol-tooltip  ol-tooltip-measure";
    measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: "bottom-center",
    });

    map.addOverlay(measureTooltip);
}

var formatLength = function (line) {
    // Menghitung panjang dalam proyeksi metrik
    var length = getLength(line, {
        projection: "EPSG:4326",
    });
    var output;
    if (length > 1000) {
        output = Math.round((length / 1000) * 100) / 100 + " " + "km";
    } else {
        output = Math.round(length * 100) / 100 + " " + "m";
    }
    return output;
};

var formatArea = function (polygon) {
    // Menghitung luas dalam proyeksi metrik
    var area = getArea(polygon, {
        projection: "EPSG:4326",
    });

    var output;
    if (area > 1000000) {
        output =
            Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
    } else {
        output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
    }
    return output;
};
