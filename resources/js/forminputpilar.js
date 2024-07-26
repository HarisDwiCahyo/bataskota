import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
// Import ag-Grid modules
import { createGrid } from "ag-grid-community";
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
import { transform } from "ol/proj";

var mapview = new View({
    center: fromLonLat([110.35385111973005, -7.791739623962835]),
    zoom: 18,
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

// Buat instance LayerSwitcher
const layerSwitcher = new LayerSwitcher({
    tipLabel: "Show Layers",
    // collapseTipLabel: "Hide Layers",
    groupSelectStyle: "children",
    collapseTipLabel: "Collapse layers",
});
map.addControl(layerSwitcher);

//Fungsi input data
$(document).ready(function () {
    let featureDataArray = []; // Define featureDataArray in a scope accessible to both handlers

    $("#formFile").on("change", function (event) {
        handleFileChange(event, featureDataArray);
    });

    $("#checkData").on("click", function () {
        displayTableData(featureDataArray);
    });
});

function handleFileChange(event, featureDataArray) {
    const files = event.target.files;
    if (files.length > 0) {
        const file = files[0];
        if (isValidGeoJSON(file)) {
            const reader = new FileReader();
            reader.onload = function (e) {
                processGeoJSONFile(e, featureDataArray);
            };
            reader.onerror = handleFileReadError;
            reader.readAsText(file);
        } else {
            alert("Please upload a valid GeoJSON file.");
        }
    }
}

function isValidGeoJSON(file) {
    return file.type === "application/json" || file.name.endsWith(".geojson");
}

function handleFileReadError(e) {
    console.error("Error reading file:", e);
}
function processGeoJSONFile(event, featureDataArray) {
    try {
        const geojsonData = JSON.parse(event.target.result);
        console.log("GeoJSON data:", geojsonData);
        const features = new GeoJSON().readFeatures(geojsonData);

        let maxFeatureCount = 0;

        features.forEach((feature) => {
            const transformedFeature = transformFeature(feature);

            // Check if transformedFeature is valid
            if (isFeatureValid(transformedFeature)) {
                // Determine the maximum count of features among all attributes
                const featureCount = Object.values(transformedFeature).reduce(
                    (max, arr) => Math.max(max, arr.length),
                    0
                );
                maxFeatureCount = Math.max(maxFeatureCount, featureCount);

                // Check if transformedFeature already exists in featureDataArray
                const isDuplicate = featureDataArray.some(
                    (existingFeature) =>
                        existingFeature.East === transformedFeature.East &&
                        existingFeature.South === transformedFeature.South &&
                        existingFeature.NoPilar ===
                            transformedFeature.NoPilar &&
                        existingFeature.Northing ===
                            transformedFeature.Northing &&
                        existingFeature.Easting ===
                            transformedFeature.Easting &&
                        existingFeature.Up === transformedFeature.Up &&
                        existingFeature.geom === transformedFeature.geom
                );

                if (!isDuplicate) {
                    featureDataArray.push(transformedFeature);
                }
            } else {
                // If transformedFeature is not valid, push an object with null values
                featureDataArray.push({
                    East: [null],
                    South: [null],
                    NoPilar: [null],
                    Easting: [null],
                    Northing: [null],
                    Up: [null],
                    geom: [null],
                });
            }
        });

        // Ensure each attribute array has the same length as maxFeatureCount
        featureDataArray.forEach((feature) => {
            for (const key in feature) {
                if (feature[key].length < maxFeatureCount) {
                    const diff = maxFeatureCount - feature[key].length;
                    for (let i = 0; i < diff; i++) {
                        feature[key].push(null); // Append null values to balance the array length
                    }
                }
            }
        });

        updateHiddenInputs(featureDataArray);
        createVectorLayer(featureDataArray);
    } catch (error) {
        console.error("Error parsing GeoJSON file:", error);
    }
}

function transformFeature(feature) {
    const format = new WKT();
    let wktNoZ = null; // Default to null if geometry is not valid or not a Point

    const spatialData = feature.getGeometry();
    if (spatialData && spatialData.getType() === "Point") {
        try {
            let wkt = format.writeGeometry(spatialData);

            wktNoZ = wkt.replace(/POINT Z\(([^)]+)\)/g, (match, p1) => {
                const coords = p1.split(" ").slice(0, 2).join(" ");
                return `POINT(${coords})`;
            });
        } catch (error) {
            console.error("Error transforming geometry:", error);
        }
    }

    const attributes = feature.getProperties();

    return {
        East: attributes.E ? [attributes.E] : [null],
        South: attributes.S ? [attributes.S] : [null],
        NoPilar: attributes.No_Pilar ? [attributes.No_Pilar] : [null],
        Easting: attributes.x ? [attributes.x] : [null],
        Northing: attributes.y ? [attributes.y] : [null],
        Up: attributes.z ? [attributes.z] : [null],
        geom: wktNoZ ? [wktNoZ] : [null],
    };
}

function isFeatureValid(feature) {
    // Define your validation logic here
    // For example, check if essential attributes like NoPilar, Northing, Easting, Up, and geom are present and valid
    return (
        feature.East !== undefined &&
        feature.South !== undefined &&
        feature.NoPilar !== undefined &&
        feature.Northing !== undefined &&
        feature.Easting !== undefined &&
        feature.Up !== undefined &&
        feature.geom !== undefined
    );
}

let gridInstance; // Variabel untuk menyimpan referensi ke instance ag-Grid

function initializeGrid(featureDataArray) {
    const rowHeight = 17; // Estimasi tinggi setiap baris dalam grid (disesuaikan dengan kebutuhan Anda)
    const headerHeight = 17; // Tinggi header grid (disesuaikan dengan kebutuhan Anda)

    const totalRows = featureDataArray.length;
    const minHeight = totalRows * rowHeight + headerHeight;

    const gridOptions = {
        defaultColDef: {
            width: 250,
            resizable: true,
            filter: true,
            floatingFilter: true,
            sortable: true,
        },
        columnDefs: [
            { headerName: "Longitude", field: "East" },
            { headerName: "Latitude", field: "South" },
            { headerName: "No Pilar", field: "NoPilar" },
            { headerName: "Northing", field: "Northing" },
            { headerName: "Easting", field: "Easting" },
            { headerName: "Up", field: "Up" },
            { headerName: "Geom", field: "geom" },
        ],
        rowData: featureDataArray,
        pagination: true,
        paginationPageSize: 10,
        rowSelection: "single",
    };

    const gridDiv = document.querySelector("#myGrid");

    // Hancurkan grid jika sudah ada
    if (gridInstance) {
        gridInstance.destroy();
    }

    // Buat instance ag-Grid baru dengan menggunakan createGrid
    gridInstance = new createGrid(gridDiv, gridOptions);

    // Set the height of the grid div
    gridDiv.style.height = Math.min(minHeight, 600) + "px";
}

// Fungsi untuk menampilkan data menggunakan ag-Grid
function displayTableData(featureDataArray) {
    console.log("Displaying data: ", featureDataArray); // Add a log to check data availability
    initializeGrid(featureDataArray);
}

function updateHiddenInputs(featureDataArray) {
    const featureForm = $("#featureForm");

    // Hapus semua input hidden yang ada
    featureForm.find("input[type='hidden']").remove();

    // Tambahkan _token
    const csrfToken = $('meta[name="csrf-token"]').attr("content");
    featureForm.append(createHiddenInput("_token", csrfToken));

    // Tambahkan inputdate dan deskripsi
    const inputDate = $("#inputdate").val();
    const operator = $("#operator").val();
    featureForm.append(createHiddenInput("inputdate", inputDate));
    featureForm.append(createHiddenInput("operator", operator));

    // Tambahkan setiap properti dari setiap feature dalam featureDataArray
    featureDataArray.forEach((feature) => {
        for (const key in feature) {
            if (Array.isArray(feature[key])) {
                feature[key].forEach((value) => {
                    featureForm.append(createHiddenInput(`${key}[]`, value));
                });
            } else {
                featureForm.append(createHiddenInput(key, feature[key]));
            }
        }
    });
}

function createHiddenInput(name, value) {
    return $("<input>")
        .attr("type", "hidden")
        .attr("name", name)
        .attr("value", value);
}

function createVectorLayer(featureDataArray) {
    const vectorSource = new VectorSource();

    featureDataArray.forEach((item) => {
        // Validate item.geom before accessing
        if (
            Array.isArray(item.geom) &&
            item.geom.length > 0 &&
            typeof item.geom[0] === "string"
        ) {
            // Process the first element assuming it's a valid geom string
            const geomString = item.geom[0];
            const coordinates = geomString
                .substring(6, geomString.length - 1)
                .split(" ")
                .map(parseFloat);
            const transformedCoordinates = transform(
                coordinates.slice(0, 2),
                "EPSG:4326",
                "EPSG:3857"
            );

            const feature = new Feature({
                geometry: new Point(transformedCoordinates),
                Name: item.Name,
                description: item.description, // Corrected typo here
            });

            vectorSource.addFeature(feature);
        } else {
            console.error("Invalid geom data:", item.geom);
        }
    });

    const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
            image: new Circle({
                radius: 6,
                fill: new Fill({ color: "blue" }),
                stroke: new Stroke({ color: "white", width: 2 }),
            }),
        }),
    });

    map.addLayer(vectorLayer);

    // Check if vectorSource has features
    const extent =
        vectorSource.getFeatures().length > 0 ? vectorSource.getExtent() : null;
    if (extent) {
        map.getView().fit(extent, {
            padding: [50, 50, 50, 50],
            duration: 1000,
        });
    } else {
        console.warn("No features found in vector source.");
    }
}

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

var homebutton = document.createElement("button");
homebutton.innerHTML = '<span class="icon"><i class="icon-home"></i></span>';
homebutton.className = "myButton";
homebutton.title = "Home";

var homeElement = document.createElement("div");
homeElement.className = "homeButtonDiv";
homeElement.appendChild(homebutton);
toolbarDivElement.appendChild(homeElement);

var homeControl = new Control({
    element: homeElement,
});
homebutton.addEventListener("click", () => {
    stopAutolocate();
    map.setView(
        new View({
            center: fromLonLat([110.35385111973005, -7.791739623962835]),
            zoom: 18,
        })
    );
});

map.addControl(homeControl);
//end homecontrol

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
        projection: "EPSG:3857",
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
        projection: "EPSG:3857",
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
