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
// Variabel global untuk menyimpan layer filter sebelumnya
var previousFilterLayer = null;

// Mengambil data kecamatan dari endpoint dan memprosesnya
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

// Membuat VectorSource dari data GeoJSON
function createVectorSource(data) {
    return new VectorSource({
        features: new GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:4326",
        }),
    });
}

// Memproses data kemantren dan menambahkan listener filter
function processKemantren(vectorSource) {
    var features = vectorSource.getFeatures();
    var uniqueKemantrenValues = extractUniqueKemantrenValues(features);
    populateKemantrenSelect(uniqueKemantrenValues);
    addKemantrenFilterListener();
}

// Mengambil nilai unik kemantren dari fitur
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

// Mengisi dropdown kemantren dengan nilai yang unik
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

// Menambahkan listener untuk tombol filter kemantren
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

// Mengambil dan menyaring data kecamatan berdasarkan kemantren yang dipilih
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

// Menyaring fitur kemantren berdasarkan nilai yang dipilih
function filterKemantrenFeatures(vectorSource, selectedKemantren) {
    return vectorSource.getFeatures().filter(function (feature) {
        var properties = feature.getProperties();
        return properties["kemantren"] === selectedKemantren;
    });
}

// Menampilkan fitur kemantren yang telah disaring pada peta
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

// Fungsi gaya untuk menampilkan kemantren pada peta
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

// Memperbarui layer peta dengan layer baru
function updateMapLayer(layer) {
    if (previousFilterLayer) {
        map.removeLayer(previousFilterLayer);
    }
    map.addLayer(layer);
    previousFilterLayer = layer;
}

// Menyesuaikan tampilan peta ke extent data yang disaring
function fitMapToExtent(source) {
    var extent = source.getExtent();
    map.getView().fit(extent, { duration: 1000 });
}

// Menampilkan fitur kemantren yang disaring di console
function logFilteredFeatures(features) {
    features.forEach(function (feature) {
        console.log(feature.getProperties());
    });
}

//Cari Kelurahan
// Ambil data GeoJSON dari endpoint /kelurahan untuk mendapatkan nilai kemantren dan kelurahan
// Variabel global untuk menyimpan layer filter sebelumnya
var previousFilterLayer = null;

// Mengambil data kelurahan dari endpoint dan memprosesnya
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

// Membuat VectorSource dari data GeoJSON
function createKelurahanVectorSource(data) {
    return new VectorSource({
        features: new GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:4326",
        }),
    });
}

// Memproses data kelurahan dan menambahkan listener perubahan
function processKelurahan(vectorSource) {
    var features = vectorSource.getFeatures();
    var uniqueKemantrenValues = extractUniqueKemantrenValues1(features);
    populateKemantrenSelect1(uniqueKemantrenValues);
    addKemantrenChangeListener();
}

// Mengambil nilai unik kemantren untuk dropdown
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

// Mengisi dropdown kemantren dengan nilai yang unik
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

// Menambahkan listener perubahan pada dropdown kemantren
function addKemantrenChangeListener() {
    document
        .getElementById("propertikemantren1")
        .addEventListener("change", function () {
            var selectedKemantren = this.value;
            fetchFilteredKelurahanData(selectedKemantren);
        });
}

// Mengambil data kelurahan yang terfilter berdasarkan kemantren yang dipilih
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

// Menyaring data kelurahan berdasarkan kemantren yang dipilih
function filterKelurahanFeatures(vectorSource, selectedKemantren) {
    return vectorSource.getFeatures().filter(function (feature) {
        var properties = feature.getProperties();
        return properties["kemantren"] === selectedKemantren;
    });
}

// Mengisi dropdown kelurahan dengan data yang terfilter
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

// Menambahkan listener filter kelurahan
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

// Menyaring data kelurahan yang dipilih dan memperbarui peta
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

// Membuat layer vector untuk kelurahan dengan source yang diberikan
function createKelurahanVectorLayer(source) {
    return new VectorLayer({
        title: "Hasil Filter",
        source: source,
        style: kelurahanStyleFunction, // Gunakan fungsi gaya
    });
}

// Fungsi gaya untuk menampilkan kelurahan pada peta
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

// Memperbarui layer peta dengan layer baru
function updateKelurahanMapLayer(layer) {
    if (previousFilterLayer) {
        map.removeLayer(previousFilterLayer);
    }
    map.addLayer(layer);
    previousFilterLayer = layer;
}

// Menyesuaikan tampilan peta ke extent data kelurahan yang terfilter
function fitKelurahanMapToExtent(source) {
    var extent = source.getExtent();
    map.getView().fit(extent, { duration: 1000 });
}

// Menampilkan fitur kelurahan yang terfilter di console
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

//load data spasial.
var pilarLayer = null;
var pilarSource = null;
var kotaLayer = null;
var kotaSource = null;
var kecamatanLayer = null;
var kecamatanSource = null;
var kelurahanLayer = null;
var kelurahanSource = null;
var rwLayer = null;
var rwSource = null;
var highlightedFeature = null;

// Caching data untuk menghindari pengunduhan ulang
var cache = {
    pilar: null,
    kota: null,
    kecamatan: null,
    kelurahan: null,
    rw: null,
};

// Fungsi untuk memuat data GeoJSON dari URL
function loadAllLayers() {
    Promise.all([
        fetchLayerData("/bataspilar", "pilar"),
        fetchLayerData("/kota", "kota"),
        fetchLayerData("/kecamatan", "kecamatan"),
        fetchLayerData("/kelurahan", "kelurahan"),
        fetchLayerData("/rw", "rw"),
    ])
        .then(() => {
            if (cache.pilar) {
                clearPreviousPilarLayer();
                updatePilarSource(cache.pilar);
                createPilarLayer();
                addPilarLayerToMap();
                fitMapToLayerExtent(pilarSource);
            }

            if (cache.kota) {
                clearPreviousKotaLayer();
                updateKotaSource(cache.kota);
                createKotaLayer();
                addKotaLayerToMap();
                fitMapToLayerExtent(kotaSource);
            }

            if (cache.kecamatan) {
                clearPreviousKecamatanLayer();
                updateKecamatanSource(cache.kecamatan);
                createKecamatanLayer();
                addKecamatanLayerToMap();
                fitMapToLayerExtent(kecamatanSource);
            }

            if (cache.kelurahan) {
                clearPreviousKelurahanLayer();
                updateKelurahanSource(cache.kelurahan);
                createKelurahanLayer();
                addKelurahanLayerToMap();
                fitMapToLayerExtent(kelurahanSource);
            }

            if (cache.rw) {
                clearPreviousRWLayer();
                updateRWSource(cache.rw);
                createRWLayer();
                addRWLayerToMap();
                fitMapToLayerExtent(rwSource);
            }
        })
        .catch((error) => {
            console.error("Request Failed: ", error);
        });
}

function fetchLayerData(url, key) {
    if (cache[key]) {
        return Promise.resolve(); // Data sudah ada di cache
    }
    return $.getJSON(url).then((response) => {
        if (response.data) {
            cache[key] = response.data;
        } else {
            console.error(
                "Data GeoJSON tidak ditemukan dalam respons untuk: " + url
            );
        }
    });
}

function clearPreviousLayer(layer, source) {
    if (layer) {
        map.removeLayer(layer);
    }
    if (source) {
        source.clear();
    }
}

// Clear and update functions for each layer type
function clearPreviousPilarLayer() {
    clearPreviousLayer(pilarLayer, pilarSource);
    pilarSource = new VectorSource();
}
function clearPreviousKotaLayer() {
    clearPreviousLayer(kotaLayer, kotaSource);
    kotaSource = new VectorSource();
}
function clearPreviousKecamatanLayer() {
    clearPreviousLayer(kecamatanLayer, kecamatanSource);
    kecamatanSource = new VectorSource();
}
function clearPreviousKelurahanLayer() {
    clearPreviousLayer(kelurahanLayer, kelurahanSource);
    kelurahanSource = new VectorSource();
}
function clearPreviousRWLayer() {
    clearPreviousLayer(rwLayer, rwSource);
    rwSource = new VectorSource();
}

function updatePilarSource(data) {
    pilarSource.addFeatures(
        new GeoJSON().readFeatures(data, { featureProjection: "EPSG:4326" })
    );
}
function updateKotaSource(data) {
    kotaSource.addFeatures(
        new GeoJSON().readFeatures(data, { featureProjection: "EPSG:4326" })
    );
}
function updateKecamatanSource(data) {
    kecamatanSource.addFeatures(
        new GeoJSON().readFeatures(data, { featureProjection: "EPSG:4326" })
    );
}
function updateKelurahanSource(data) {
    kelurahanSource.addFeatures(
        new GeoJSON().readFeatures(data, { featureProjection: "EPSG:4326" })
    );
}
function updateRWSource(data) {
    rwSource.addFeatures(
        new GeoJSON().readFeatures(data, { featureProjection: "EPSG:4326" })
    );
}

function createPilarLayer() {
    pilarLayer = new VectorLayer({
        title: "pilar",
        source: pilarSource,
        style: new Style({
            image: new Circle({
                radius: 5,
                fill: new Fill({ color: "blue" }),
                stroke: new Stroke({ color: "white", width: 2 }),
            }),
        }),
    });
}

function createKotaLayer() {
    kotaLayer = new VectorLayer({
        title: "kota",
        source: kotaSource,
        style: new Style({
            stroke: new Stroke({ color: "purple", width: 2 }),
            fill: new Fill({ color: "rgba(0, 0, 255, 0.1)" }),
        }),
    });
}

function createKecamatanLayer() {
    kecamatanLayer = new VectorLayer({
        title: "Kecamatan",
        source: kecamatanSource,
        style: new Style({
            stroke: new Stroke({ color: "blue", width: 2 }),
            fill: new Fill({ color: "rgba(0, 0, 255, 0.1)" }),
        }),
    });
}

function createKelurahanLayer() {
    kelurahanLayer = new VectorLayer({
        title: "Kelurahan",
        source: kelurahanSource,
        style: new Style({
            stroke: new Stroke({ color: "black", width: 2 }),
            fill: new Fill({ color: "rgba(255, 0, 0, 0.1)" }),
        }),
    });
}

function createRWLayer() {
    rwLayer = new VectorLayer({
        title: "RW",
        source: rwSource,
        style: new Style({
            stroke: new Stroke({ color: "green", width: 2 }),
            fill: new Fill({ color: "rgba(0, 255, 0, 0.1)" }),
        }),
    });
}

function addLayerToMap(layer) {
    if (layer) {
        overlays.getLayers().push(layer);
    }
}

function fitMapToLayerExtent(source) {
    var extent = source.getExtent();
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

// Load initial data
loadAllLayers();

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

//end load data.

map.on("click", function (event) {
    var clickedFeature = null;
    var clickedLayer = null;

    // Fungsi untuk mendeteksi fitur yang diklik
    function detectClickedFeature(event) {
        map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
            if (
                layer === kecamatanLayer ||
                layer === rwLayer ||
                layer === kelurahanLayer ||
                layer === kotaLayer ||
                layer === pilarLayer
            ) {
                clickedFeature = feature;
                clickedLayer = layer;
                return true; // Hentikan loop setelah menemukan fitur
            }
        });
    }

    // Fungsi untuk mereset highlight sebelumnya
    function resetHighlight(feature) {
        if (feature) {
            var defaultStyle = new Style({
                stroke: new Stroke({
                    color:
                        feature.get("layer") === "kecamatan"
                            ? "blue"
                            : feature.get("layer") === "rw"
                            ? "green"
                            : feature.get("layer") === "kelurahan"
                            ? "black"
                            : feature.get("layer") === "kota"
                            ? "purple"
                            : feature.get("layer") === "pilar"
                            ? "blue"
                            : "gray",
                    width: 2,
                }),
                fill: new Fill({
                    color:
                        feature.get("layer") === "kecamatan"
                            ? "rgba(0, 0, 255, 0.1)"
                            : feature.get("layer") === "rw"
                            ? "rgba(0, 255, 0, 0.1)"
                            : feature.get("layer") === "kelurahan"
                            ? "rgba(255, 0, 0, 0.1)"
                            : feature.get("layer") === "kota"
                            ? "rgba(128, 0, 128, 0.1)"
                            : feature.get("layer") === "pilar"
                            ? "rgba(87, 116, 139, 0.1)"
                            : "rgba(128, 128, 128, 0.1)",
                }),
                image:
                    feature.get("layer") === "pilar"
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
            feature.setStyle(defaultStyle);
        }
    }

    // Fungsi untuk menyorot fitur yang diklik
    function highlightFeature(feature, layer) {
        var highlightStyle = new Style({
            stroke: new Stroke({
                color: "yellow",
                width: 3,
            }),
            fill: new Fill({
                color: "rgba(255, 255, 0, 0.3)",
            }),
            image:
                layer === pilarLayer
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
        feature.setStyle(highlightStyle);
    }

    // Fungsi untuk menampilkan informasi atribut
    function showFeatureInfo(feature) {
        var properties = feature.getProperties();
        var info =
            "<table class='table table-bordered m-0' style='background-color: #e8f5e9; border-color: #388e3c;'>" +
            "<thead style='background-color: #388e3c; color: white;'>" +
            "<tr><th>Keterangan</th><th>Detail</th></tr></thead><tbody>";

        for (var key in properties) {
            if (
                properties.hasOwnProperty(key) &&
                key !== "geometry" &&
                key !== "gid" &&
                key !== "srsid"
            ) {
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
                } else if (key === "beritaacara") {
                    value =
                        "<a href='" +
                        value +
                        "' target='_blank'>link berita acara</a>";
                }

                info +=
                    "<tr style='border-color: #388e3c;'><td style='background-color: #c8e6c9;'>" +
                    key +
                    "</td><td style='background-color: #f1f8e9;'>" +
                    value +
                    "</td></tr>";
            }
        }
        info += "</tbody></table>";

        document.querySelector("#attribute .card-body").innerHTML = info;
        document.getElementById("attribute").style.display = "block";
    }

    // Deteksi fitur yang diklik
    detectClickedFeature(event);

    if (clickedFeature) {
        resetHighlight(highlightedFeature);
        highlightFeature(clickedFeature, clickedLayer);

        // Set properti layer untuk menentukan gaya default nanti
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
        showFeatureInfo(clickedFeature);
    } else {
        document.getElementById("attribute").style.display = "none";
    }
});

// Create an overlay to anchor the popup to the map.
var container = document.getElementById("popup");
var content = document.getElementById("popup-content");
var closer = document.getElementById("popup-closer");

var overlay = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});

map.addOverlay(overlay);

closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

map.on("click", function (event) {
    var clickedFeature = null;
    var clickedLayer = null;

    // Check if a feature was clicked, and if it belongs to one of the layers
    map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
        if (
            layer === pilarLayer ||
            layer === kecamatanLayer ||
            layer === kotaLayer ||
            layer === kelurahanLayer ||
            layer === rwLayer
        ) {
            clickedFeature = feature;
            clickedLayer = layer;
            return true; // Stop iteration once the feature is found
        }
    });

    if (clickedFeature) {
        var properties = clickedFeature.getProperties();
        var coordinates = event.coordinate;

        // Initialize the HTML content for the popup
        var info = "<div style='text-align: center;'>";

        if (clickedLayer === pilarLayer) {
            // Display photo if available
            if (properties.foto) {
                var imageUrl = "/upload/foto/" + properties.foto;
                info += `
                    <div style='width: 200px; height: 150px; overflow: hidden; margin-bottom: 10px;'>
                        <a href='${imageUrl}' target='_blank'>
                            <img src='${imageUrl}' alt='Foto' style='width: 100%; height: auto;'/>
                        </a>
                    </div>`;
            }

            // Display information for pilarLayer
            info += `
                <table style='margin: 0 auto; border-collapse: collapse; width: 100%;'>
                    <tr>
                        <td style='padding: 5px; border: 1px solid #ddd;'><strong>No Pilar</strong></td>
                        <td style='padding: 5px; border: 1px solid #ddd;'>${
                            properties.nopilar || "N/A"
                        }</td>
                    </tr>
                    <tr>
                        <td style='padding: 5px; border: 1px solid #ddd;'><strong>Koordinat</strong></td>
                        <td style='padding: 5px; border: 1px solid #ddd;'>${coordinates[1].toFixed(
                            5
                        )}, ${coordinates[0].toFixed(5)}</td>
                    </tr>
                    <tr>
                        <td colspan='2' style='padding: 5px; border: 1px solid #ddd;'>
                            <a href='https://www.google.com/maps/dir/?api=1&destination=${
                                coordinates[1]
                            },${coordinates[0]}' target='_blank'>
                                Rute ke lokasi
                            </a>
                        </td>
                    </tr>
                </table>`;
        } else if (clickedLayer === kecamatanLayer) {
            // Display information for kecamatanLayer
            info += `
                <table style='margin: 0 auto; border-collapse: collapse; width: 100%;'>
                    <tr>
                        <td style='padding: 5px; border: 1px solid #ddd;'><strong>Nama Kecamatan</strong></td>
                        <td style='padding: 5px; border: 1px solid #ddd;'>${
                            properties.kemantren || "N/A"
                        }</td>
                    </tr>
                    <tr>
                        <td style='padding: 5px; border: 1px solid #ddd;'><strong>Kode Kecamatan</strong></td>
                        <td style='padding: 5px; border: 1px solid #ddd;'>${
                            properties.kodekecamatan || "N/A"
                        }</td>
                    </tr>
                </table>`;
        } else if (clickedLayer === kotaLayer) {
            // Display information for kotaLayer
            info += `
                <table style='margin: 0 auto; border-collapse: collapse; width: 100%;'>
                    <tr>
                        <td style='padding: 5px; border: 1px solid #ddd;'><strong>Nama Kota</strong></td>
                        <td style='padding: 5px; border: 1px solid #ddd;'>${
                            properties.kota || "N/A"
                        }</td>
                    </tr>
                    <tr>
                        <td style='padding: 5px; border: 1px solid #ddd;'><strong>Kode Kota</strong></td>
                        <td style='padding: 5px; border: 1px solid #ddd;'>${
                            properties.kodekota || "N/A"
                        }</td>
                    </tr>
                </table>`;
        } else if (clickedLayer === kelurahanLayer) {
            // Display information for kelurahanLayer
            info += `
                <table style='margin: 0 auto; border-collapse: collapse; width: 100%;'>
                    <tr>
                        <td style='padding: 5px; border: 1px solid #ddd;'><strong>Nama Kemantren</strong></td>
                        <td style='padding: 5px; border: 1px solid #ddd;'>${
                            properties.kemantren || "N/A"
                        }</td>
                    </tr>
                    <tr>
                        <td style='padding: 5px; border: 1px solid #ddd;'><strong>Nama Kelurahan</strong></td>
                        <td style='padding: 5px; border: 1px solid #ddd;'>${
                            properties.kelurahan || "N/A"
                        }</td>
                    </tr>
                    <tr>
                        <td style='padding: 5px; border: 1px solid #ddd;'><strong>Kode Kelurahan</strong></td>
                        <td style='padding: 5px; border: 1px solid #ddd;'>${
                            properties.kodekelurahan || "N/A"
                        }</td>
                    </tr>
                </table>`;
        } else if (clickedLayer === rwLayer) {
            // Display information for rwLayer
            info += `
                <table style='margin: 0 auto; border-collapse: collapse; width: 100%;'>
                    <tr>
                        <td style='padding: 5px; border: 1px solid #ddd;'><strong>Nama Kemantren</strong></td>
                        <td style='padding: 5px; border: 1px solid #ddd;'>${
                            properties.kemantren || "N/A"
                        }</td>
                    </tr>
                    <tr>
                        <td style='padding: 5px; border: 1px solid #ddd;'><strong>Nama Kelurahan</strong></td>
                        <td style='padding: 5px; border: 1px solid #ddd;'>${
                            properties.kelurahan || "N/A"
                        }</td>
                    </tr>
                    <tr>
                        <td style='padding: 5px; border: 1px solid #ddd;'><strong>RW</strong></td>
                        <td style='padding: 5px; border: 1px solid #ddd;'>${
                            properties.rw || "N/A"
                        }</td>
                    </tr>
                </table>`;
        }

        info += "</div>";

        // Show the info in the popup
        content.innerHTML = info;
        overlay.setPosition(event.coordinate);
    } else {
        overlay.setPosition(undefined); // Hide the popup if no feature is clicked
    }
});

//end popup

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
