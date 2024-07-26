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
                field: "id",
                width: 75,
                filter: false,
                sortable: false,
            },
            {
                headerName: "Peraturan",
                field: "perwal",
            },
            {
                headerName: "Deskripsi",
                field: "deskripsi",
            },
            {
                headerName: "Link URL",
                field: "link",
                cellRenderer: function (params) {
                    return `<a href="${params.value}" target="_blank">${params.value}</a>`;
                },
            },
            {
                headerName: "Tanggal",
                field: "tanggal",
            },

            {
                headerName: "Aksi",
                cellRenderer: function (params) {
                    var editUrl = "/admin/editregulasi/" + params.data.id;
                    var deleteUrl = "/admin/hapusregulasi/" + params.data.id;

                    return (
                        '<div class="d-flex justify-content-center align-items-center">' +
                        '<a href="' +
                        editUrl +
                        '" class="btn btn-edit" title="Ubah">' +
                        '<i class="icon-edit" style="color: #FFD43B; font-size: 30px;"></i>' +
                        "</a>" +
                        '<a href="' +
                        deleteUrl +
                        '" class="btn btn-delete" title="Hapus" onclick="return confirm(\'Yakin nih data ' +
                        params.data.perwal +
                        " akan dihapus?')\">" +
                        '<i class="icon-bin" style="color: #e1143d; font-size: 25px;"></i>' +
                        "</a>" +
                        "</div>"
                    );
                },
                pinned: "right",
                width: 110,
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
});
