import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
// Import ag-Grid modules
import { createGrid } from "ag-grid-community";
import { geojsonToWKT } from "@terraformer/wkt";

var gridOptions;

document.addEventListener("DOMContentLoaded", function () {
    gridOptions = {
        defaultColDef: {
            width: 280,
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
                headerName: "Username",
                field: "name",
            },
            {
                headerName: "Email",
                field: "email",
            },
            {
                headerName: "Tanggal Dibuat",
                field: "created_at",
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
