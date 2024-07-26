import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
// Import ag-Grid modules
import { createGrid } from "ag-grid-community";
import { geojsonToWKT } from "@terraformer/wkt";

var gridOptions;
document.addEventListener("DOMContentLoaded", function () {
    gridOptions = {
        defaultColDef: {
            width: 200,
            resizable: true,
            filter: true,
            floatingFilter: true,
            sortable: true,
        },
        columnDefs: [
            {
                headerName: "No",
                field: "gid",
                width: 75,
                filter: false,
                sortable: false,
            },
            {
                headerName: "Kemantren",
                field: "kemantren",
            },
            {
                headerName: "Kelurahan",
                field: "kelurahan",
            },
            {
                headerName: "Kondisi",
                field: "kondisi",
            },
            {
                headerName: "Longitude",
                field: "east",
            },
            {
                headerName: "Latitude",
                field: "south",
            },
            {
                headerName: "No Pilar",
                field: "nopilar",
            },
            {
                headerName: "Northing",
                field: "northing",
            },
            {
                headerName: "Easting",
                field: "easting",
            },
            {
                headerName: "Ketinggian",
                field: "up",
            },
            {
                headerName: "Peraturan",
                field: "peraturan",
            },
            {
                headerName: "Perbatasan",
                field: "perbatasan",
            },
            {
                headerName: "Berita Acara",
                field: "beritaacara",
                cellRenderer: function (params) {
                    return `<a href="${params.value}" target="_blank">${params.value}</a>`;
                },
            },
            {
                headerName: "Alamat",
                field: "alamat",
            },
            {
                headerName: "Tahun Pembuatan",
                field: "pembuatan",
            },
            {
                headerName: "Tahun Pemeliharaan",
                field: "pemeliharaan",
            },
            {
                headerName: "Polygon",
                field: "polygon",
            },
            {
                headerName: "Foto",
                field: "foto",
                cellRenderer: function (params) {
                    // Mendapatkan nama file gambar dari field foto
                    var imageName = params.value;
                    var imageUrl = "/upload/foto/" + imageName;

                    // Membuat tautan HTML untuk menampilkan gambar
                    var linkHtml =
                        '<a href="' + imageUrl + '">' + imageName + "</a>";

                    // Mengembalikan tautan HTML sebagai konten sel
                    return linkHtml;
                },
            },
            // {
            //     headerName: "Location",
            //     field: "location", // Kolom baru tanpa field, karena nilai akan digabungkan secara manual
            //     cellRenderer: function (params) {
            //         var latitude = params.data.latitude;
            //         var longitude = params.data.longitude;
            //         var googleMapsUrl =
            //             "https://www.google.com/maps/dir/?api=1&destination=" +
            //             latitude +
            //             "," +
            //             longitude +
            //             "&travelmode=driving";
            //         return (
            //             '<a href="' +
            //             googleMapsUrl +
            //             '" target="_blank" title="Tampilkan rute">' +
            //             latitude +
            //             "," +
            //             longitude +
            //             "</a>"
            //         );
            //     },
            //     sortable: false,
            //     filter: false,
            // },
            {
                headerName: "Tanggal",
                field: "tanggal",
            },
            {
                headerName: "Operator",
                field: "operator",
            },
            {
                headerName: "Created At",
                field: "created_at",
            },
            {
                headerName: "Updated At",
                field: "updated_at",
            },
            {
                headerName: "Aksi",
                cellRenderer: function (params) {
                    var editUrl = "/admin/formeditpilar/" + params.data.gid;
                    var kirimUrl = "/admin/kirimpilar/" + params.data.gid;
                    var deleteUrl = "/admin/hapuspilar/" + params.data.gid;

                    return (
                        '<div class="d-flex justify-content-center align-items-center">' +
                        '<a href="' +
                        editUrl +
                        '" class="btn btn-edit" title="Ubah">' +
                        '<i class="icon-edit" style="color: #FFD43B; font-size: 30px;"></i>' +
                        "</a>" +
                        '<a href="' +
                        kirimUrl +
                        '" class="btn btn-upload" title="Kirim" onclick="return confirm(\'Yakin nih data ' +
                        params.data.nopilar +
                        " akan dikirim?')\">" +
                        '<i class="icon-upload-to-cloud" style="color: #2b3ac1; font-size: 30px;"></i>' +
                        "</a>" +
                        '<a href="' +
                        deleteUrl +
                        '" class="btn btn-delete" title="Hapus" onclick="return confirm(\'Yakin nih data ' +
                        params.data.nopilar +
                        " akan dihapus?')\">" +
                        '<i class="icon-bin" style="color: #e1143d; font-size: 25px;"></i>' +
                        "</a>" +
                        "</div>"
                    );
                },
                pinned: "right",
                width: 160,
                filter: false,
                sortable: false,
            },
        ],
        rowData: data,
        pagination: true,
        paginationPageSize: 10,
        rowSelection: "single",
    };

    var gridDiv = document.querySelector("#myGrid");
    const api = createGrid(gridDiv, gridOptions);

    $.getJSON("/admin/bataspilar", function (geojsonData) {
        if (geojsonData && geojsonData.data && geojsonData.data.features) {
            // Membuat objek yang memetakan gid ke polygonWKT
            var gidToPolygonMap = {};

            // Menggunakan Terraformer untuk mengonversi setiap fitur GeoJSON ke format WKT
            geojsonData.data.features.forEach(function (feature) {
                var gid = feature.properties.gid; // Sesuaikan dengan nama properti yang berisi gid
                var geojsonGeometry = feature.geometry;
                var polygonWKT = geojsonToWKT(geojsonGeometry);
                gidToPolygonMap[gid] = polygonWKT;
            });

            // Perbarui data di grid dengan menggunakan API grid yang sudah disimpan
            api.forEachNode(function (node) {
                var gid = node.data.gid; // Sesuaikan dengan nama properti yang berisi gid di grid Anda
                var polygonWKT = gidToPolygonMap[gid];
                node.setDataValue("polygon", polygonWKT);
            });

            // Perbarui grid setelah mengisi kolom "Polygon"
            api.refreshCells();
        } else {
            console.error("Invalid GeoJSON data received:", geojsonData);
        }
    });

    document
        .getElementById("excelOption")
        .addEventListener("click", function () {
            // Mendapatkan referensi ke instance grid
            var gridApi = api;

            // Menentukan format ekspor (Excel atau CSV)
            var params = {
                skipHeader: false, // Setel true jika Anda ingin melewatkan header kolom
                columnGroups: false, // Setel true jika Anda ingin menyertakan grup kolom
                fileName: "data_export", // Nama file ekspor
                sheetName: "Sheet1", // Nama sheet (hanya berlaku untuk Excel)
                customHeader: [
                    // Header kustom (jika diperlukan)
                ],
                customFooter: [
                    // Footer kustom (jika diperlukan)
                ],
            };

            // Memanggil fungsi ekspor dengan parameter yang telah ditentukan
            if (params) {
                if (params.columnGroups) {
                    gridApi.exportDataAsExcel(params);
                } else {
                    gridApi.exportDataAsCsv(params);
                }
            }
        });
    document
        .getElementById("geojsonOption")
        .addEventListener("click", function () {
            // Mengambil data GeoJSON dari endpoint '/bataspilar'
            $.getJSON("/admin/bataspilar", function (geojsonData) {
                // Mengonversi objek GeoJSON menjadi string
                var geojsonString = JSON.stringify(geojsonData, null, 2);

                // Membuat tautan untuk mengunduh GeoJSON
                var blob = new Blob([geojsonString], {
                    type: "application/json",
                });
                var url = URL.createObjectURL(blob);

                // Membuat elemen tautan dan menautkannya dengan tautan unduh
                var a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = "data_export.geojson"; // Nama file untuk diunduh
                document.body.appendChild(a);
                a.click();

                // Membersihkan objek URL yang dibuat untuk objek blob
                window.URL.revokeObjectURL(url);
            });
        });
});
