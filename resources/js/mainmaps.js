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

//Memunculakn modal ===========================================================
$(document).ready(function () {
    // Ensure modal works when triggered
    $('[data-toggle="modal"]').click(function () {
        $("#exampleModal").modal("show");
    });
});

document
    .getElementById("app-side-mini-toggler")
    .addEventListener("click", function (event) {
        event.preventDefault();
        // Fungsi untuk menampilkan atau menyembunyikan sidebar
    });

document
    .querySelector('[data-toggle="onoffcanvas"]')
    .addEventListener("click", function (event) {
        event.preventDefault();
        // Fungsi untuk menampilkan atau menyembunyikan sidebar
    });

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
            var target = document.querySelector(
                action.getAttribute("data-target")
            );
            if (target) {
                target.classList.add("active");
            }
        });
    });
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

// Variabel untuk menyimpan referensi ke grup basemap
var baseGroup = new Group({
    title: "BaseMaps",
    layers: [osmTile, WorldStreet, World_Imagery, Esri],
});

// Tambahkan grup basemap ke dalam layers peta
map.addLayer(baseGroup);

// Event listener untuk radio button basemap
$("input[name='basemapRadio']").change(function () {
    var selectedBasemap = $(this).attr("id");

    // Matikan semua layer basemap terlebih dahulu
    baseGroup.getLayers().forEach(function (layer) {
        layer.setVisible(false);
    });

    // Hidupkan layer basemap yang dipilih
    if (selectedBasemap === "worldimagery") {
        World_Imagery.setVisible(true);
    } else if (selectedBasemap === "streetmap") {
        WorldStreet.setVisible(true);
    } else if (selectedBasemap === "openstreetmap") {
        osmTile.setVisible(true);
    } else if (selectedBasemap === "esrimaps") {
        Esri.setVisible(true);
    }
});

// Asumsikan `overlays` sudah didefinisikan dan ditambahkan ke peta
var overlays = new Group({
    title: "Group",
    layers: [],
});
map.addLayer(overlays);

//Cari Kemantren
// Ambil data GeoJSON dari endpoint /kecamatan
$.getJSON("/kecamatan", function (response) {
    if (response.data) {
        var vectorSource = createVectorSource(response.data);
        processKemantren(vectorSource);
    } else {
        console.error("Data GeoJSON tidak ditemukan dalam respons");
    }
}).fail(function (jqxhr, textStatus, error) {
    console.error("Request Failed: " + textStatus + ", " + error);
});

var previousFilterLayer = null;

function createVectorSource(data) {
    return new VectorSource({
        features: new GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:4326",
        }),
    });
}

function processKemantren(vectorSource) {
    var features = vectorSource.getFeatures();
    var uniqueKemantrenValues = extractUniqueKemantrenValues(features);
    populateKemantrenSelect(uniqueKemantrenValues);
    addKemantrenFilterListener();
}

function extractUniqueKemantrenValues(features) {
    var uniqueKemantrenValues = new Set();
    features.forEach(function (feature) {
        var properties = feature.getProperties();
        if (properties.hasOwnProperty("kemantren")) {
            uniqueKemantrenValues.add(properties["kemantren"]);
        }
    });
    return uniqueKemantrenValues;
}

function populateKemantrenSelect(values) {
    var propertiKemantrenSelect = document.getElementById("propertikemantren");
    propertiKemantrenSelect.innerHTML = "";
    values.forEach(function (value) {
        var option = document.createElement("option");
        option.value = value;
        option.text = value;
        propertiKemantrenSelect.appendChild(option);
    });
}

function addKemantrenFilterListener() {
    document
        .getElementById("filterkemantren")
        .addEventListener("click", function () {
            var selectedKemantren =
                document.getElementById("propertikemantren").value;

            if (selectedKemantren) {
                fetchAndFilterKemantrenData(selectedKemantren);
            } else {
                alert("Silakan pilih nilai Kemantren terlebih dahulu.");
            }
        });
}

function fetchAndFilterKemantrenData(selectedKemantren) {
    $.getJSON("/kecamatan", function (response) {
        if (response.data) {
            var vectorSource = createVectorSource(response.data);
            var filteredFeatures = filterKemantrenFeatures(
                vectorSource,
                selectedKemantren
            );
            displayFilteredKemantrenFeatures(filteredFeatures);
        } else {
            console.error("Data GeoJSON tidak ditemukan dalam respons");
        }
    }).fail(function (jqxhr, textStatus, error) {
        console.error("Request Failed: " + textStatus + ", " + error);
    });
}

function filterKemantrenFeatures(vectorSource, selectedKemantren) {
    return vectorSource.getFeatures().filter(function (feature) {
        var properties = feature.getProperties();
        return properties["kemantren"] === selectedKemantren;
    });
}

function displayFilteredKemantrenFeatures(features) {
    var filteredSource = new VectorSource({
        features: features,
    });

    var vectorLayer = new VectorLayer({
        title: "Hasil Filter",
        source: filteredSource,
        style: kemantrenStyleFunction,
    });

    updateMapLayer(vectorLayer);
    fitMapToExtent(filteredSource);
    logFilteredFeatures(features);
}

function kemantrenStyleFunction(feature) {
    return new Style({
        stroke: new Stroke({
            color: "red",
            width: 2,
        }),
        fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
        }),
    });
}

function updateMapLayer(layer) {
    if (previousFilterLayer) {
        map.removeLayer(previousFilterLayer);
    }
    map.addLayer(layer);
    previousFilterLayer = layer;
}

function fitMapToExtent(source) {
    var extent = source.getExtent();
    map.getView().fit(extent, { duration: 1000 });
}

function logFilteredFeatures(features) {
    features.forEach(function (feature) {
        console.log(feature.getProperties());
    });
}

//Cari Kelurahan
// Ambil data GeoJSON dari endpoint /kelurahan untuk mendapatkan nilai kemantren dan kelurahan
$.getJSON("/kelurahan", function (response) {
    if (response.data) {
        var vectorSource = createKelurahanVectorSource(response.data);
        processKelurahan(vectorSource);
    } else {
        console.error("Data GeoJSON tidak ditemukan dalam respons");
    }
}).fail(function (jqxhr, textStatus, error) {
    console.error("Request Failed: " + textStatus + ", " + error);
});

function createKelurahanVectorSource(data) {
    return new VectorSource({
        features: new GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:4326",
        }),
    });
}

function processKelurahan(vectorSource) {
    var features = vectorSource.getFeatures();
    var uniqueKemantrenValues = extractUniqueKemantrenValues1(features);
    populateKemantrenSelect1(uniqueKemantrenValues);
    addKemantrenChangeListener();
}

function extractUniqueKemantrenValues1(features) {
    var uniqueKemantrenValues = new Set();
    features.forEach(function (feature) {
        var properties = feature.getProperties();
        if (properties.hasOwnProperty("kemantren")) {
            uniqueKemantrenValues.add(properties["kemantren"]);
        }
    });
    return uniqueKemantrenValues;
}

function populateKemantrenSelect1(values) {
    var propertiKemantrenSelect = document.getElementById("propertikemantren1");
    propertiKemantrenSelect.innerHTML = "";
    values.forEach(function (value) {
        var option = document.createElement("option");
        option.value = value;
        option.text = value;
        propertiKemantrenSelect.appendChild(option);
    });
}

function addKemantrenChangeListener() {
    document
        .getElementById("propertikemantren1")
        .addEventListener("change", function () {
            var selectedKemantren = this.value;
            fetchFilteredKelurahanData(selectedKemantren);
        });
}

function fetchFilteredKelurahanData(selectedKemantren) {
    $.getJSON("/kelurahan", function (response) {
        if (response.data) {
            var vectorSource = createKelurahanVectorSource(response.data);
            var filteredFeatures = filterKelurahanFeatures(
                vectorSource,
                selectedKemantren
            );
            populateKelurahanSelect(filteredFeatures);
            addKelurahanFilterListener(filteredFeatures);
        } else {
            console.error("Data GeoJSON tidak ditemukan dalam respons");
        }
    }).fail(function (jqxhr, textStatus, error) {
        console.error("Request Failed: " + textStatus + ", " + error);
    });
}

function filterKelurahanFeatures(vectorSource, selectedKemantren) {
    return vectorSource.getFeatures().filter(function (feature) {
        var properties = feature.getProperties();
        return properties["kemantren"] === selectedKemantren;
    });
}

function populateKelurahanSelect(features) {
    var propertiKelurahanSelect = document.getElementById("propertikelurahan");
    propertiKelurahanSelect.innerHTML = "";
    features.forEach(function (feature) {
        var properties = feature.getProperties();
        var kelurahanValue = properties["kelurahan"];
        var option = document.createElement("option");
        option.value = kelurahanValue;
        option.text = kelurahanValue;
        propertiKelurahanSelect.appendChild(option);
    });
}

function addKelurahanFilterListener(features) {
    document
        .getElementById("filterkelurahan")
        .addEventListener("click", function () {
            var selectedKelurahan =
                document.getElementById("propertikelurahan").value;
            if (selectedKelurahan) {
                filterKelurahanData(selectedKelurahan, features);
            } else {
                alert("Silakan pilih nilai Kelurahan terlebih dahulu.");
            }
        });
}

function filterKelurahanData(selectedKelurahan, features) {
    var filteredFeatures = features.filter(function (feature) {
        var properties = feature.getProperties();
        return properties["kelurahan"] === selectedKelurahan;
    });

    var filteredSource = new VectorSource({
        features: filteredFeatures,
    });

    var vectorLayer = createKelurahanVectorLayer(filteredSource);

    updateKelurahanMapLayer(vectorLayer);

    fitKelurahanMapToExtent(filteredSource);

    displayFilteredKelurahanFeatures(filteredFeatures);
}

function createKelurahanVectorLayer(source) {
    return new VectorLayer({
        title: "Hasil Filter",
        source: source,
        style: kelurahanStyleFunction, // Gunakan fungsi gaya
    });
}

function kelurahanStyleFunction(feature) {
    return new Style({
        stroke: new Stroke({
            color: "red",
            width: 2,
        }),
        fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
        }),
    });
}

function updateKelurahanMapLayer(layer) {
    if (previousFilterLayer) {
        map.removeLayer(previousFilterLayer);
    }
    map.addLayer(layer);
    previousFilterLayer = layer;
}

function fitKelurahanMapToExtent(source) {
    var extent = source.getExtent();
    map.getView().fit(extent, { duration: 1000 });
}

function displayFilteredKelurahanFeatures(features) {
    features.forEach(function (feature) {
        console.log(feature.getProperties());
    });
}

//Cari RW
var previousFilterLayer = null;
var rwVectorSource = null;

// Ambil data GeoJSON dari endpoint /rw
$.getJSON("/rw", function (response) {
    if (response.data) {
        // Buat objek VectorSource dari data GeoJSON
        rwVectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(response.data, {
                featureProjection: "EPSG:4326",
            }),
        });

        // Proses data yang diambil
        processKemantren1(rwVectorSource);
    } else {
        console.error("Data GeoJSON tidak ditemukan dalam respons");
    }
}).fail(function (jqxhr, textStatus, error) {
    console.error("Request Failed: " + textStatus + ", " + error);
});

function processKemantren1(vectorSource) {
    // Proses data dari vectorSource
    var features = vectorSource.getFeatures();
    var uniqueKemantrenValues = new Set();

    // Ekstrak nilai dari atribut 'kemantren' dari setiap fitur
    features.forEach(function (feature) {
        var properties = feature.getProperties();
        if (properties.hasOwnProperty("kemantren")) {
            var kemantrenValue = properties["kemantren"];
            uniqueKemantrenValues.add(kemantrenValue);
        }
    });

    // Dapatkan elemen select untuk properti kemantren
    var propertiKemantrenSelect = document.getElementById("propertikemantren2");
    propertiKemantrenSelect.innerHTML = ""; // Kosongkan opsi sebelumnya

    // Tambahkan nilai kemantren ke elemen select sebagai opsi
    uniqueKemantrenValues.forEach(function (value) {
        var option = document.createElement("option");
        option.value = value;
        option.text = value;
        propertiKemantrenSelect.appendChild(option);
    });

    // Tambahkan event listener untuk perubahan opsi kemantren
    propertiKemantrenSelect.addEventListener("change", function () {
        var selectedKemantren = this.value;
        processKelurahan1(vectorSource, selectedKemantren);
    });
}

function processKelurahan1(vectorSource, selectedKemantren) {
    // Proses data dari vectorSource
    var features = vectorSource.getFeatures();
    var uniqueKelurahanValues = new Set();

    // Ekstrak nilai dari atribut 'kelurahan' dari setiap fitur yang memiliki nilai kemantren yang dipilih
    features.forEach(function (feature) {
        var properties = feature.getProperties();
        if (
            properties["kemantren"] === selectedKemantren &&
            properties.hasOwnProperty("kelurahan")
        ) {
            var kelurahanValue = properties["kelurahan"];
            uniqueKelurahanValues.add(kelurahanValue);
        }
    });

    // Dapatkan elemen select untuk properti kelurahan
    var propertiKelurahanSelect = document.getElementById("propertikelurahan1");
    propertiKelurahanSelect.innerHTML = ""; // Kosongkan opsi sebelumnya

    // Tambahkan nilai kelurahan ke elemen select sebagai opsi
    uniqueKelurahanValues.forEach(function (value) {
        var option = document.createElement("option");
        option.value = value;
        option.text = value;
        propertiKelurahanSelect.appendChild(option);
    });

    // Tambahkan event listener untuk perubahan opsi kelurahan
    propertiKelurahanSelect.addEventListener("change", function () {
        var selectedKelurahan = this.value;
        processRW(vectorSource, selectedKemantren, selectedKelurahan);
    });
}

function processRW(vectorSource, selectedKemantren, selectedKelurahan) {
    var features = vectorSource.getFeatures();
    var uniqueRWValues = new Set();

    features.forEach(function (feature) {
        var properties = feature.getProperties();
        if (
            properties["kemantren"] === selectedKemantren &&
            properties["kelurahan"] === selectedKelurahan &&
            properties.hasOwnProperty("rw")
        ) {
            var rwValue = properties["rw"];
            uniqueRWValues.add(rwValue);
        }
    });

    var propertiRWSelect = document.getElementById("propertirw");
    propertiRWSelect.innerHTML = ""; // Kosongkan opsi sebelumnya

    uniqueRWValues.forEach(function (value) {
        var option = document.createElement("option");
        option.value = value;
        option.text = value;
        propertiRWSelect.appendChild(option);
    });
}

function createFilteredLayer(filteredFeatures) {
    var filteredSource = new VectorSource({
        features: filteredFeatures,
    });

    function styleFunction(feature) {
        return new Style({
            stroke: new Stroke({
                color: "red",
                width: 2,
            }),
            fill: new Fill({
                color: "rgba(0, 0, 255, 0.1)",
            }),
        });
    }

    var vectorLayer = new VectorLayer({
        title: "Hasil Filter",
        source: filteredSource,
        style: styleFunction,
    });

    if (previousFilterLayer) {
        map.removeLayer(previousFilterLayer);
    }

    map.addLayer(vectorLayer);
    previousFilterLayer = vectorLayer;

    return filteredSource;
}

function zoomToFilteredExtent(filteredSource) {
    var extent = filteredSource.getExtent();
    if (
        extent &&
        extent[0] !== Infinity &&
        extent[1] !== Infinity &&
        extent[2] !== -Infinity &&
        extent[3] !== -Infinity
    ) {
        map.getView().fit(extent, { duration: 1000 });
    } else {
        console.warn("Extent tidak valid");
    }
}

document.getElementById("filterrw").addEventListener("click", function () {
    var selectedKemantren = document.getElementById("propertikemantren2").value;
    var selectedKelurahan = document.getElementById("propertikelurahan1").value;
    var selectedRW = document.getElementById("propertirw").value;

    if (selectedRW) {
        var filteredFeatures = rwVectorSource
            .getFeatures()
            .filter(function (feature) {
                var properties = feature.getProperties();
                return (
                    properties["kemantren"] === selectedKemantren &&
                    properties["kelurahan"] === selectedKelurahan &&
                    properties["rw"] === selectedRW
                );
            });

        var filteredSource = createFilteredLayer(filteredFeatures);
        zoomToFilteredExtent(filteredSource);

        filteredFeatures.forEach(function (feature) {
            console.log(feature.getProperties());
        });
    } else {
        alert("Silakan pilih nilai RW terlebih dahulu.");
    }
});

// Cari Pilar
document.getElementById("filterpilar").addEventListener("click", function () {
    var inputValue = document.getElementById("valueInput").value;

    if (inputValue) {
        var url = "/bataspilar"; // URL untuk data bataspilar
        fetchPilarGeoJSONData(url, inputValue);
    } else {
        alert("Masukkan nilai untuk mencari pilar.");
    }
});

function fetchPilarGeoJSONData(url, inputValue) {
    $.getJSON(url, function (response) {
        if (response.data) {
            processPilarGeoJSONData(response.data, inputValue);
        } else {
            console.error("Data GeoJSON tidak ditemukan dalam respons");
        }
    }).fail(function (jqxhr, textStatus, error) {
        console.error("Request Failed: " + textStatus + ", " + error);
    });
}

function processPilarGeoJSONData(data, inputValue) {
    var vectorSource = createPilarVectorSource(data);
    var filteredFeatures = filterPilarFeatures(vectorSource, inputValue);

    if (filteredFeatures.length > 0) {
        var filteredSource = new VectorSource({
            features: filteredFeatures,
        });

        var vectorLayer = createPilarVectorLayer(filteredSource);

        updatePilarMapLayer(vectorLayer);

        fitPilarMapToExtent(filteredSource);

        displayFilteredPilarFeatures(filteredFeatures);
    } else {
        console.log("Tidak ada fitur yang cocok dengan nilai input.");
    }
}

function createPilarVectorSource(data) {
    return new VectorSource({
        features: new GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:4326",
        }),
    });
}

function filterPilarFeatures(vectorSource, inputValue) {
    return vectorSource.getFeatures().filter(function (feature) {
        var properties = feature.getProperties();
        var nopilarValue = properties["nopilar"];
        return nopilarValue.toLowerCase().includes(inputValue.toLowerCase());
    });
}

function createPilarVectorLayer(source) {
    return new VectorLayer({
        title: "Hasil Filter",
        source: source,
        style: pilarStyleFunction, // Gunakan fungsi gaya
    });
}

function pilarStyleFunction(feature) {
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
}

function updatePilarMapLayer(layer) {
    if (previousFilterLayer) {
        map.removeLayer(previousFilterLayer);
    }
    map.addLayer(layer);
    previousFilterLayer = layer;
}

function fitPilarMapToExtent(source) {
    var extent = source.getExtent();
    map.getView().fit(extent, { duration: 1000 });
}

function displayFilteredPilarFeatures(features) {
    features.forEach(function (feature) {
        console.log(feature.getProperties());
    });
}

// Variabel untuk menyimpan referensi ke layer vektor dan fitur yang di-highlight
var pilarLayer = null;
var pilarSource = null; // Variabel untuk menyimpan referensi ke VectorSourc
var kotaLayer = null;
var kotaSource = null; // Variabel untuk menyimpan referensi ke VectorSource
var kecamatanLayer = null;
var kecamatanSource = null; // Variabel untuk menyimpan referensi ke VectorSource
var kelurahanLayer = null;
var kelurahanSource = null; // Variabel untuk menyimpan referensi ke VectorSource
var rwLayer = null;
var rwSource = null; // Variabel untuk menyimpan referensi ke VectorSource untuk RW
var highlightedFeature = null; // Variabel untuk menyimpan referensi ke fitur yang sedang di-highlight

// Fungsi untuk memuat data GeoJSON dari URL
//load data pilar
function loadPilarLayer() {
    fetchPilarData()
        .then((response) => {
            if (response.data) {
                clearPreviousPilarLayer();
                updatePilarSource(response.data);
                createPilarLayer();
                addPilarLayerToMap();
                fitMapToPilarExtent();
            } else {
                console.error("Data GeoJSON tidak ditemukan dalam respons");
            }
        })
        .catch((error) => {
            console.error("Request Failed: ", error);
        });
}

function fetchPilarData() {
    return $.getJSON("/bataspilar");
}

function clearPreviousPilarLayer() {
    if (pilarLayer) {
        map.removeLayer(pilarLayer);
        pilarLayer = null;
    }
    if (pilarSource) {
        pilarSource.clear();
    } else {
        pilarSource = new VectorSource();
    }
}

function updatePilarSource(data) {
    pilarSource.addFeatures(
        new GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:4326",
        })
    );
}

function createPilarLayer() {
    pilarLayer = new VectorLayer({
        title: "pilar",
        source: pilarSource,
        style: new Style({
            image: new Circle({
                radius: 5,
                fill: new Fill({
                    color: "blue",
                }),
                stroke: new Stroke({
                    color: "white",
                    width: 2,
                }),
            }),
        }),
    });
}

function addPilarLayerToMap() {
    overlays.getLayers().push(pilarLayer);
}

function fitMapToPilarExtent() {
    var extent = pilarSource.getExtent();
    if (isValidExtent(extent)) {
        map.getView().fit(extent, { duration: 1000 });
    } else {
        console.warn("Extent tidak valid");
    }
}

function isValidExtent(extent) {
    return (
        extent &&
        extent[0] !== Infinity &&
        extent[1] !== Infinity &&
        extent[2] !== -Infinity &&
        extent[3] !== -Infinity
    );
}

//load data kota
function loadKotaLayer() {
    fetchKotaData()
        .then((response) => {
            if (response.data) {
                clearPreviousKotaLayer();
                updateKotaSource(response.data);
                createKotaLayer();
                addKotaLayerToMap();
                fitMapToKotaExtent();
            } else {
                console.error("Data GeoJSON tidak ditemukan dalam respons");
            }
        })
        .catch((error) => {
            console.error("Request Failed: ", error);
        });
}

function fetchKotaData() {
    return $.getJSON("/kota");
}

function clearPreviousKotaLayer() {
    if (kotaLayer) {
        map.removeLayer(kotaLayer);
        kotaLayer = null;
    }
    if (kotaSource) {
        kotaSource.clear();
    } else {
        kotaSource = new VectorSource();
    }
}

function updateKotaSource(data) {
    kotaSource.addFeatures(
        new GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:4326",
        })
    );
}

function createKotaLayer() {
    kotaLayer = new VectorLayer({
        title: "kota",
        source: kotaSource,
        style: new Style({
            stroke: new Stroke({
                color: "purple",
                width: 2,
            }),
            fill: new Fill({
                color: "rgba(0, 0, 255, 0.1)",
            }),
        }),
    });
}

function addKotaLayerToMap() {
    overlays.getLayers().push(kotaLayer);
}

function fitMapToKotaExtent() {
    var extent = kotaSource.getExtent();
    if (isValidKotaExtent(extent)) {
        map.getView().fit(extent, { duration: 1000 });
    } else {
        console.warn("Extent tidak valid");
    }
}

function isValidKotaExtent(extent) {
    return (
        extent &&
        extent[0] !== Infinity &&
        extent[1] !== Infinity &&
        extent[2] !== -Infinity &&
        extent[3] !== -Infinity
    );
}
//load data kecamatan
function loadKecamatanLayer() {
    fetchKecamatanData()
        .then((response) => {
            if (response.data) {
                clearPreviousKecamatanLayer();
                updateKecamatanSource(response.data);
                createKecamatanLayer();
                addKecamatanLayerToMap();
                fitMapToKecamatanExtent();
            } else {
                console.error("Data GeoJSON tidak ditemukan dalam respons");
            }
        })
        .catch((error) => {
            console.error("Request Failed: ", error);
        });
}

function fetchKecamatanData() {
    return $.getJSON("/kecamatan");
}

function clearPreviousKecamatanLayer() {
    if (kecamatanLayer) {
        map.removeLayer(kecamatanLayer);
        kecamatanLayer = null;
    }
    if (kecamatanSource) {
        kecamatanSource.clear();
    } else {
        kecamatanSource = new VectorSource();
    }
}

function updateKecamatanSource(data) {
    kecamatanSource.addFeatures(
        new GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:4326",
        })
    );
}

function createKecamatanLayer() {
    kecamatanLayer = new VectorLayer({
        title: "Kecamatan",
        source: kecamatanSource,
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
}

function addKecamatanLayerToMap() {
    overlays.getLayers().push(kecamatanLayer);
}

function fitMapToKecamatanExtent() {
    var extent = kecamatanSource.getExtent();
    if (isValidKecamatanExtent(extent)) {
        map.getView().fit(extent, { duration: 1000 });
    } else {
        console.warn("Extent tidak valid");
    }
}

function isValidKecamatanExtent(extent) {
    return (
        extent &&
        extent[0] !== Infinity &&
        extent[1] !== Infinity &&
        extent[2] !== -Infinity &&
        extent[3] !== -Infinity
    );
}
//load kelurahan
function loadKelurahanLayer() {
    fetchKelurahanData()
        .then((response) => {
            if (response.data) {
                clearPreviousKelurahanLayer();
                updateKelurahanSource(response.data);
                createKelurahanLayer();
                addKelurahanLayerToMap();
                fitMapToKelurahanExtent();
            } else {
                console.error("Data GeoJSON tidak ditemukan dalam respons");
            }
        })
        .catch((error) => {
            console.error("Request Failed: ", error);
        });
}

function fetchKelurahanData() {
    return $.getJSON("/kelurahan");
}

function clearPreviousKelurahanLayer() {
    if (kelurahanLayer) {
        map.removeLayer(kelurahanLayer);
        kelurahanLayer = null;
    }
    if (kelurahanSource) {
        kelurahanSource.clear();
    } else {
        kelurahanSource = new VectorSource();
    }
}

function updateKelurahanSource(data) {
    kelurahanSource.addFeatures(
        new GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:4326",
        })
    );
}

function createKelurahanLayer() {
    kelurahanLayer = new VectorLayer({
        title: "Kelurahan",
        source: kelurahanSource,
        style: new Style({
            stroke: new Stroke({
                color: "black",
                width: 2,
            }),
            fill: new Fill({
                color: "rgba(255, 0, 0, 0.1)",
            }),
        }),
    });
}

function addKelurahanLayerToMap() {
    overlays.getLayers().push(kelurahanLayer);
}

function fitMapToKelurahanExtent() {
    var extent = kelurahanSource.getExtent();
    if (isValidKelurahanExtent(extent)) {
        map.getView().fit(extent, { duration: 1000 });
    } else {
        console.warn("Extent tidak valid");
    }
}

function isValidKelurahanExtent(extent) {
    return (
        extent &&
        extent[0] !== Infinity &&
        extent[1] !== Infinity &&
        extent[2] !== -Infinity &&
        extent[3] !== -Infinity
    );
}
//load data rw

function loadRWLayer() {
    fetchRWData()
        .then((response) => {
            if (response.data) {
                clearPreviousRWLayer();
                updateRWSource(response.data);
                createRWLayer();
                addRWLayerToMap();
                fitMapToRWExtent();
            } else {
                console.error("Data GeoJSON tidak ditemukan dalam respons");
            }
        })
        .catch((error) => {
            console.error("Request Failed: ", error);
        });
}

function fetchRWData() {
    return $.getJSON("/rw");
}

function clearPreviousRWLayer() {
    if (rwLayer) {
        map.removeLayer(rwLayer);
        rwLayer = null;
    }
    if (rwSource) {
        rwSource.clear();
    } else {
        rwSource = new VectorSource();
    }
}

function updateRWSource(data) {
    rwSource.addFeatures(
        new GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:4326",
        })
    );
}

function createRWLayer() {
    rwLayer = new VectorLayer({
        title: "RW",
        source: rwSource,
        style: new Style({
            stroke: new Stroke({
                color: "green",
                width: 2,
            }),
            fill: new Fill({
                color: "rgba(0, 255, 0, 0.1)",
            }),
        }),
    });
}

function addRWLayerToMap() {
    overlays.getLayers().push(rwLayer);
}

function fitMapToRWExtent() {
    var extent = rwSource.getExtent();
    if (isValidRWExtent(extent)) {
        map.getView().fit(extent, { duration: 1000 });
    } else {
        console.warn("Extent tidak valid");
    }
}

function isValidRWExtent(extent) {
    return (
        extent &&
        extent[0] !== Infinity &&
        extent[1] !== Infinity &&
        extent[2] !== -Infinity &&
        extent[3] !== -Infinity
    );
}

// Load data Kecamatan saat halaman pertama kali dimuat
loadKotaLayer();
loadKecamatanLayer();

// Event listener untuk checkbox
$("input[type='checkbox']").change(function () {
    var layerId = $(this).attr("id");

    // Toggle visibilitas layer berdasarkan status checkbox
    if ($(this).is(":checked")) {
        showLayer(layerId);
    } else {
        hideLayer(layerId);
        // Sembunyikan tabel atribut jika tidak ada fitur yang diklik
        document.getElementById("attribute").style.display = "none";
    }
});

function showLayer(layerId) {
    if (layerId === "kemantren") {
        loadKecamatanLayer();
    } else if (layerId === "rw") {
        loadRWLayer();
    } else if (layerId === "kelurahan") {
        loadKelurahanLayer();
    } else if (layerId === "kota") {
        loadKotaLayer();
    } else if (layerId === "pilar") {
        loadPilarLayer();
    }
}

function hideLayer(layerId) {
    if (layerId === "kemantren") {
        removeLayer(kecamatanLayer, kecamatanSource);
        kecamatanLayer = null;
        kecamatanSource = null;
    } else if (layerId === "rw") {
        removeLayer(rwLayer, rwSource);
        rwLayer = null;
        rwSource = null;
    } else if (layerId === "kelurahan") {
        removeLayer(kelurahanLayer, kelurahanSource);
        kelurahanLayer = null;
        kelurahanSource = null;
    } else if (layerId === "kota") {
        removeLayer(kotaLayer, kotaSource);
        kotaLayer = null;
        kotaSource = null;
    } else if (layerId === "pilar") {
        removeLayer(pilarLayer, pilarSource);
        pilarLayer = null;
        pilarSource = null;
    }
}

function removeLayer(layer, source) {
    if (layer) {
        map.removeLayer(layer);
    }
    if (source) {
        source.clear();
    }
}

map.on("click", function (event) {
    var clickedFeature = null;
    var clickedLayer = null;

    // Detect feature under click
    map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
        // Jika fitur ada di layer kecamatanLayer, rwLayer, kelurahanLayer, kotaLayer, atau pilarLayer
        if (
            layer === kecamatanLayer ||
            layer === rwLayer ||
            layer === kelurahanLayer ||
            layer === kotaLayer ||
            layer === pilarLayer
        ) {
            clickedFeature = feature;
            clickedLayer = layer;
            return true; // Break the loop after finding the feature
        }
    });

    if (clickedFeature) {
        // Reset previous highlight
        if (highlightedFeature) {
            var defaultStyle = new Style({
                stroke: new Stroke({
                    color:
                        highlightedFeature.get("layer") === "kecamatan"
                            ? "blue"
                            : highlightedFeature.get("layer") === "rw"
                            ? "green"
                            : highlightedFeature.get("layer") === "kelurahan"
                            ? "black"
                            : highlightedFeature.get("layer") === "kota"
                            ? "purple"
                            : highlightedFeature.get("layer") === "pilar"
                            ? "blue"
                            : "gray", // Color for other layers
                    width: 2,
                }),
                fill: new Fill({
                    color:
                        highlightedFeature.get("layer") === "kecamatan"
                            ? "rgba(0, 0, 255, 0.1)"
                            : highlightedFeature.get("layer") === "rw"
                            ? "rgba(0, 255, 0, 0.1)"
                            : highlightedFeature.get("layer") === "kelurahan"
                            ? "rgba(255, 0, 0, 0.1)"
                            : highlightedFeature.get("layer") === "kota"
                            ? "rgba(128, 0, 128, 0.1)"
                            : highlightedFeature.get("layer") === "pilar"
                            ? "rgba(87, 116, 139, 0.1)"
                            : "rgba(128, 128, 128, 0.1)", // Fill color for other layers
                }),
                image:
                    highlightedFeature.get("layer") === "pilar"
                        ? new Circle({
                              radius: 5,
                              fill: new Fill({
                                  color: "blue",
                              }),
                              stroke: new Stroke({
                                  color: "white",
                                  width: 2,
                              }),
                          })
                        : undefined,
            });
            highlightedFeature.setStyle(defaultStyle);
        }

        // Highlight the clicked feature
        var highlightStyle = new Style({
            stroke: new Stroke({
                color: "yellow",
                width: 3,
            }),
            fill: new Fill({
                color: "rgba(255, 255, 0, 0.3)",
            }),
            image:
                clickedLayer === pilarLayer
                    ? new Circle({
                          radius: 7,
                          fill: new Fill({
                              color: "rgba(255, 255, 0, 0.1)",
                          }),
                          stroke: new Stroke({
                              color: "yellow",
                              width: 3,
                          }),
                      })
                    : undefined,
        });
        clickedFeature.setStyle(highlightStyle);

        // Set layer property to determine default style later
        if (clickedLayer === kecamatanLayer) {
            clickedFeature.set("layer", "kecamatan");
        } else if (clickedLayer === rwLayer) {
            clickedFeature.set("layer", "rw");
        } else if (clickedLayer === kelurahanLayer) {
            clickedFeature.set("layer", "kelurahan");
        } else if (clickedLayer === kotaLayer) {
            clickedFeature.set("layer", "kota");
        } else if (clickedLayer === pilarLayer) {
            clickedFeature.set("layer", "pilar");
        }

        highlightedFeature = clickedFeature;

        // Ekstrak properti dari fitur yang diklik
        var properties = clickedFeature.getProperties();

        // Buat string untuk menampilkan properti
        var info =
            "<table class='table table-bordered m-0'><thead><tr><th>Property</th><th>Value</th></tr></thead><tbody>";
        for (var key in properties) {
            if (properties.hasOwnProperty(key) && key !== "geometry") {
                var value = properties[key];

                // Tangani atribut foto
                if (key === "foto") {
                    var imageUrl = "/upload/foto/" + value;
                    value =
                        "<a href='" +
                        imageUrl +
                        "' target='_blank'><img src='" +
                        imageUrl +
                        "' alt='Foto' style='width: 100px; height: auto;'/></a>";
                }

                // Tangani atribut beritaacara
                else if (key === "beritaacara") {
                    value =
                        "<a href='" +
                        value +
                        "' target='_blank'>link berita acara</a>";
                }

                info += "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
            }
        }
        info += "</tbody></table>";

        // Tampilkan informasi properti di dalam card body
        document.querySelector("#attribute .card-body").innerHTML = info;

        // Tampilkan tabel atribut
        document.getElementById("attribute").style.display = "block";
    } else {
        // Sembunyikan tabel atribut jika tidak ada fitur yang diklik
        document.getElementById("attribute").style.display = "none";
    }
});

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
$("#btnCrosshair").on("click", function (event) {
    $("#btnCrosshair").toggleClass("clicked");
    if ($("#btnCrosshair").hasClass("clicked")) {
        startAutolocate();
    } else {
        stopAutolocate();
    }
});

var intervalAutolocate;
var posCurrent;

var geolocation = new Geolocation({
    trackingOptions: {
        enableHighAccuracy: true,
    },
    tracking: true,
    projection: mapview.getProjection(),
});

var positionFeature = new Feature();
positionFeature.setStyle(
    new Style({
        image: new Circle({
            radius: 6,
            fill: new Fill({
                color: "#3399cc",
            }),
            stroke: new Stroke({
                color: "#fff",
                width: 2,
            }),
        }),
    })
);

var accuracyFeature = new Feature();
var currentPositionLayer = new VectorLayer({
    map: map,
    source: new VectorSource({
        features: [accuracyFeature, positionFeature],
    }),
});

function startAutolocate() {
    var coordinates = geolocation.getPosition();
    positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());

    // Zoom ke posisi geolokasi
    if (coordinates) {
        map.getView().animate({
            center: coordinates,
            zoom: 16,
            duration: 1000, // Durasi animasi dalam milidetik
        });
    }

    intervalAutolocate = setInterval(function () {
        var coordinates = geolocation.getPosition();
        var accuracy = geolocation.getAccuracyGeometry();

        positionFeature.setGeometry(
            coordinates ? new Point(coordinates) : null
        );
        accuracyFeature.setGeometry(accuracy);

        // Update posisi peta saat geolokasi berubah
        if (coordinates) {
            map.getView().animate({
                center: coordinates,
                duration: 1000, // Durasi animasi dalam milidetik
            });
        }
    }, 10000);
}

function stopAutolocate() {
    clearInterval(intervalAutolocate);
    positionFeature.setGeometry(null);
    accuracyFeature.setGeometry(null);
}
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
