/**
 * Template Name: Sailor
 * Template URL: https://bootstrapmade.com/sailor-free-bootstrap-theme/
 * Updated: Mar 17 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
// Import ag-Grid modules
import { createGrid } from "ag-grid-community";

(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach((e) => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    };

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener("scroll", listener);
    };

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select("#header");
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add("header-scrolled");
            } else {
                selectHeader.classList.remove("header-scrolled");
            }
        };
        window.addEventListener("load", headerScrolled);
        onscroll(document, headerScrolled);
    }

    /**
     * Back to top button
     */
    let backtotop = select(".back-to-top");
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add("active");
            } else {
                backtotop.classList.remove("active");
            }
        };
        window.addEventListener("load", toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }

    /**
     * Mobile nav toggle
     */
    on("click", ".mobile-nav-toggle", function (e) {
        select("#navbar").classList.toggle("navbar-mobile");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
    });

    /**
     * Mobile nav dropdowns activate
     */
    on(
        "click",
        ".navbar .dropdown > a",
        function (e) {
            if (select("#navbar").classList.contains("navbar-mobile")) {
                e.preventDefault();
                this.nextElementSibling.classList.toggle("dropdown-active");
            }
        },
        true
    );

    /**
     * Hero carousel indicators
     */
    let heroCarouselIndicators = select("#hero-carousel-indicators");
    let heroCarouselItems = select("#heroCarousel .carousel-item", true);

    heroCarouselItems.forEach((item, index) => {
        index === 0
            ? (heroCarouselIndicators.innerHTML +=
                  "<li data-bs-target='#heroCarousel' data-bs-slide-to='" +
                  index +
                  "' class='active'></li>")
            : (heroCarouselIndicators.innerHTML +=
                  "<li data-bs-target='#heroCarousel' data-bs-slide-to='" +
                  index +
                  "'></li>");
    });

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener("load", () => {
        let portfolioContainer = select(".portfolio-container");
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: ".portfolio-item",
            });

            let portfolioFilters = select("#portfolio-flters li", true);

            on(
                "click",
                "#portfolio-flters li",
                function (e) {
                    e.preventDefault();
                    portfolioFilters.forEach(function (el) {
                        el.classList.remove("filter-active");
                    });
                    this.classList.add("filter-active");

                    portfolioIsotope.arrange({
                        filter: this.getAttribute("data-filter"),
                    });
                },
                true
            );
        }
    });

    /**
     * Initiate portfolio lightbox
     */
    const portfolioLightbox = GLightbox({
        selector: ".portfolio-lightbox",
    });

    /**
     * Portfolio details slider
     */
    new Swiper(".portfolio-details-slider", {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
    });

    /**
     * Initiate portfolio details lightbox
     */
    const portfolioDetailsLightbox = GLightbox({
        selector: ".portfolio-details-lightbox",
        width: "90%",
        height: "90vh",
    });

    /**
     * Skills animation
     */
    let skilsContent = select(".skills-content");
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: "80%",
            handler: function (direction) {
                let progress = select(".progress .progress-bar", true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute("aria-valuenow") + "%";
                });
            },
        });
    }
})();

//Table Regulasi
var gridOptions;

document.addEventListener("DOMContentLoaded", function () {
    gridOptions = {
        defaultColDef: {
            width: 320,
            resizable: true,
            filter: true,
            floatingFilter: true,
            sortable: true,
        },
        columnDefs: [
            {
                headerName: "No",
                valueGetter: function (params) {
                    return params.node.rowIndex + 1;
                },
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
                headerName: "Tanggal diunggah",
                field: "tanggal",
            },

            {
                headerName: "Aksi",
                cellRenderer: function (params) {
                    var downloadUrl = params.data.link; // Use the URL from the "link" field

                    return (
                        '<div class="d-flex justify-content-center align-items-center">' +
                        '<a href="' +
                        downloadUrl +
                        '" class="btn btn-download" title="Unduh" target="_blank">' +
                        '<i class="bx bx-download" style="color: #007bff; font-size: 30px;"></i>' +
                        "</a>" +
                        "</div>"
                    );
                },
                pinned: "right",
                width: 80, // Adjust width as needed
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
