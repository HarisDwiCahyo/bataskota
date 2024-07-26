<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="Best Admin Panels" />
    <meta name="keywords"
        content="Admin, Dashboard, Bootstrap4, Sass, CSS3, HTML5, Responsive Dashboard, Responsive Admin Template, Admin Template, Best Admin Template, Bootstrap Template, Themeforest" />
    <meta name="author" content="Bootstrap Gallery" />
    <link rel="canonical" href="https://www.bootstrap.gallery/" />
    <meta property="og:url" content="https://www.bootstrap.gallery" />
    <meta property="og:title" content="Admin Templates - Dashboard Templates | Bootstrap Gallery" />
    <meta property="og:description" content="Marketplace for Bootstrap Admin Dashboards" />
    <meta property="og:type" content="Website" />
    <meta property="og:site_name" content="Bootstrap Gallery" />
    <link rel="shortcut icon" href="asset/img/favicon.svg" />
    <title>{{ $title }}</title>
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <!-- Common CSS -->
    <link rel="stylesheet" href="{{ asset('asset/css/bootstrap.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('asset/fonts/icomoon/icomoon.css') }}" />
    {{-- <link rel="stylesheet" href="{{ asset('asset/css/main.min.css') }}" /> --}}
    <link rel="stylesheet" href="{{ asset('asset/css/main.css') }}" />

    <!-- Lobipanel css -->
    <link rel="stylesheet" href="{{ asset('asset/vendor/lobipanel/lobipanel.css') }}" />

    <!-- Data Tables -->
    <link rel="stylesheet" href="{{ asset('asset/vendor/datatables/dataTables.bs4.css') }}" />
    <link rel="stylesheet" href="{{ asset('asset/vendor/datatables/dataTables.bs4-custom.css') }}" />
    {{-- Font Awesome --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    {{-- vite resource --}}
    {{-- @vite(['resources/css/mainmaps.css', 'resources/js/mainmaps.js']) --}}

    @foreach (\App\Helpers\ViterHelper::viteAssets($title) as $asset)
        @vite($asset)
    @endforeach

</head>

<body>
    <!-- Loading starts -->
    {{-- <div class="loading-wrapper">
        <div class="loading">
            <div class="img"></div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div> --}}
    <!-- Loading ends -->

    <!-- BEGIN .app-wrap -->
    <div class="app-wrap">
        <div class="app-container">
            <!-- BEGIN .app-side -->
            <aside class="app-side" id="app-side" aria-expanded="false">
                <!-- BEGIN .side-content -->
                <div class="side-content">
                    <!-- BEGIN .user-actions -->
                    <ul class="user-actions">
                        <li>
                            <a href="#" class="user-action" data-target="#side1">
                                <i class="icon-home"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="user-action" data-target="#side2">
                                <i class="icon-layers2"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="user-action" data-target="#side3">
                                <i class="icon-paint-format"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="user-action" data-target="#side4">
                                <i class="icon-map"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="user-action" data-target="#side5">
                                <i class="icon-briefcase"></i>
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('home') }}">
                                <i class="icon-redo2"></i>
                            </a>
                        </li>
                    </ul>
                    <!-- END .user-actions -->
                    <!-- BEGIN .side-nav -->
                    <nav class="side-nav active" id="side1">
                        <!-- BEGIN: side-nav-content -->
                        <ul class="unifyMenu" id="unifyMenu1">
                            <li class="active">
                                <a href="#" id="homeLink" class="has-arrow" aria-expanded="false">
                                    <span class="has-icon">
                                        <i class="icon-browser2"></i>
                                    </span>
                                    <span class="nav-title">Beranda</span>
                                </a>
                                <ul aria-expanded="false">
                                    <li style="text-align: center; margin-top: 10px">
                                        <img class="img-fluid" style="width: 60px; height: 75px;"
                                            src="{{ asset('asset/img/Logo kota.png') }}" alt="Best Admin Dashboards" />
                                        <div class="card-header"
                                            style="color: rgb(0, 0, 0);background-color:#ffffff; font-weight: bold">
                                            Si Batas Pintar
                                        </div>
                                    </li>
                                    <div style="text-align: center; font-size: 13px; margin-top:10px">
                                        <p>Dinas Pertanahan dan Tata Ruang<br>
                                            Kota Yogyakarta</p>
                                        <p>Jln. Kenari No.56, Muja Muju, Umbulharjo, Kota Yogyakarta,<br>
                                            Daerah Istimewa Yogyakarta 55165</p>
                                        <p>Telp. 0274515865, 0274515866</p>
                                        <p>No. WA Layanan Online : <a href="https://wa.me/628112735100"
                                                target="_blank">0811-2735-100</a></p>
                                    </div>
                                </ul>
                            </li>
                        </ul>
                        <!-- END: side-nav-content -->
                    </nav>
                    <nav class="side-nav" id="side2">
                        <!-- BEGIN: side-nav-content -->
                        <ul class="unifyMenu" id="unifyMenu2">
                            <li class="active">
                                <a href="#" class="has-arrow" aria-expanded="false">
                                    <span class="has-icon">
                                        <i class="icon-layers3"></i>
                                    </span>
                                    <span class="nav-title">Lapisan</span>
                                </a>
                                <ul aria-expanded="false">
                                    <li>
                                        <!-- Checkbox example -->
                                        <div class="custom-control custom-checkbox" style="margin-top: 10px; ">
                                            <input type="checkbox" class="custom-control-input" id="pilar">
                                            <label class="custom-control-label" for="pilar"> Batas
                                                Pilar</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="kota"
                                                checked>
                                            <label class="custom-control-label" for="kota">Batas
                                                Kota</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="kemantren"
                                                checked>
                                            <label class="custom-control-label" for="kemantren">Batas
                                                Kemantren</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="kelurahan">
                                            <label class="custom-control-label" for="kelurahan">Batas
                                                Kelurahan</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="rw">
                                            <label class="custom-control-label" for="rw">Batas
                                                RW</label>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" class="has-arrow" aria-expanded="false">
                                    <span class="has-icon">
                                        <i class="icon-picture"></i>
                                    </span>
                                    <span class="nav-title">Legenda</span>
                                </a>
                                <ul aria-expanded="false" class="legend-list">
                                    <li>
                                        <i class="fa-regular fa-circle fa-xl"
                                            style="color: #ffffff; background-color: rgb(108, 153, 249); border-radius: 10px"></i>
                                        <span>Pilar Batas</span>
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-square fa-xl"
                                            style="color: #48224e; background-color: rgb(241, 224, 240)"></i>
                                        <span>Batas Kota</span>
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-square fa-xl"
                                            style="color: #0589ef; background-color: rgb(203, 214, 238)"></i>
                                        <span>Batas Kemantren</span>
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-square fa-xl"
                                            style="color: #0c0b0b; background-color: rgb(244, 197, 197)"></i>
                                        <span>Batas Kelurahan</span>
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-square fa-xl"
                                            style="color: #0f9618; background-color: rgb(226, 249, 223)"></i>
                                        <span>Batas RW</span>
                                    </li>
                                </ul>

                            </li>
                        </ul>
                        <!-- END: side-nav-content -->
                    </nav>
                    <nav class="side-nav" id="side3">
                        <!-- BEGIN: side-nav-content -->
                        <ul class="unifyMenu" id="unifyMenu3">
                            <li>
                                <a href="#" class="has-arrow" aria-expanded="false">
                                    <span class="has-icon">
                                        <i class="icon-adjustments"></i>
                                    </span>
                                    <span class="nav-title">Cari Kecamatan</span>
                                </a>
                                <ul aria-expanded="false">
                                    <div class="col-sm-12 col-12">
                                        <div class="form-group">
                                            <select id="propertikemantren" class="form-control form-control-sm">
                                                <option>Pilih Kemantren</option>
                                            </select>
                                        </div>
                                        <button id="filterkemantren" class="btn btn-success btn-sm">Cari
                                            Kemantren</button>
                                    </div>
                                </ul>
                            </li>
                            <li>
                                <a href="#" class="has-arrow" aria-expanded="false">
                                    <span class="has-icon">
                                        <i class="icon-adjustments"></i>
                                    </span>
                                    <span class="nav-title">Cari Kelurahan</span>
                                </a>
                                <ul aria-expanded="false">
                                    <div class="col-sm-12 col-12">
                                        <div class="form-group">
                                            <select id="propertikemantren1" class="form-control form-control-sm">
                                                <option>Pilih Kemantren</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <select id="propertikelurahan" class="form-control form-control-sm">
                                                <option>Pilih Kelurahan</option>
                                            </select>
                                        </div>
                                        <button id="filterkelurahan" class="btn btn-success btn-sm">Kelurahan</button>
                                    </div>
                                </ul>
                            </li>
                            <li>
                                <a href="#" class="has-arrow" aria-expanded="false">
                                    <span class="has-icon">
                                        <i class="icon-adjustments"></i>
                                    </span>
                                    <span class="nav-title">Cari RW</span>
                                </a>
                                <ul aria-expanded="false">
                                    <div class="col-sm-12 col-12">
                                        <div class="form-group">
                                            <select id="propertikemantren2" class="form-control form-control-sm">
                                                <option>Pilih Kemantren</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <select id="propertikelurahan1" class="form-control form-control-sm">
                                                <option>Pilih Kelurahan</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <select id="propertirw" class="form-control form-control-sm">
                                                <option>Pilih RW</option>
                                            </select>
                                        </div>
                                        <button id="filterrw" class="btn btn-success btn-sm">Cari RW</button>
                                    </div>
                                </ul>
                            </li>
                            <li>
                                <a href="#" class="has-arrow" aria-expanded="false">
                                    <span class="has-icon">
                                        <i class="icon-adjustments"></i>
                                    </span>
                                    <span class="nav-title">Cari Pilar</span>
                                </a>
                                <ul aria-expanded="false">
                                    <div class="col-sm-12 col-12">
                                        <div class="form-group">
                                            <input id="valueInput" class="form-control form-control-sm"
                                                placeholder="Masukkan Code" type="text">
                                        </div>
                                        <button id="filterpilar" class="btn btn-success btn-sm">Cari
                                            Pilar</button>
                                    </div>
                                </ul>
                            </li>
                        </ul>
                        <!-- END: side-nav-content -->

                    </nav>
                    <nav class="side-nav" id="side4">
                        <!-- BEGIN: side-nav-content -->
                        <ul class="unifyMenu" id="unifyMenu4">
                            <li class="active">
                                <a href="#" class="has-arrow" aria-expanded="false">
                                    <span class="has-icon">
                                        <i class="icon-map6"></i>
                                    </span>
                                    <span class="nav-title">Basemap</span>
                                </a>
                                <ul aria-expanded="false">
                                    <li>
                                        <div class="custom-control custom-radio" style="margin-top: 10px">
                                            <img src="{{ asset('asset/img/worldimagery.png') }}"
                                                alt="Esri World Map">
                                            <input type="radio" id="worldimagery" name="basemapRadio"
                                                class="custom-control-input">
                                            <label class="custom-control-label" for="worldimagery">World Imagery
                                                Map</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <img src="{{ asset('asset/img/worldstreetmap.png') }}"
                                                alt="World Street Map">
                                            <input type="radio" id="streetmap" name="basemapRadio"
                                                class="custom-control-input">
                                            <label class="custom-control-label" for="streetmap">World Street
                                                Map</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <img src="{{ asset('asset/img/openstreetmap.png') }}"
                                                alt="Open Street Map">
                                            <input type="radio" id="openstreetmap" name="basemapRadio"
                                                class="custom-control-input">
                                            <label class="custom-control-label" for="openstreetmap">Open Street
                                                Map</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <img src="{{ asset('asset/img/esri.png') }}" alt="Esri World Map">
                                            <input type="radio" id="esrimaps" name="basemapRadio"
                                                class="custom-control-input" checked>
                                            <label class="custom-control-label" for="esrimaps">Esri World Map</label>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <!-- END: side-nav-content -->
                    </nav>
                    <nav class="side-nav" id="side5">
                        <!-- BEGIN: side-nav-content -->
                        <ul class="unifyMenu" id="unifyMenu5">
                            <li class="active">
                                <a href="#" class="has-arrow" aria-expanded="false">
                                    <span class="has-icon">
                                        <i class="icon-documents2"></i>
                                    </span>
                                    <span class="nav-title">Panduan</span>
                                </a>
                                <!-- List items triggering the modal -->
                                <ul>
                                    <li>
                                        <a href="#" id="openKeterangan" data-toggle="modal"
                                            data-target="#exampleModal">Panduan Lengkap</a>
                                    </li>
                                </ul>
                                <!-- Modal HTML -->
                                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Panduan</h5>
                                                <button type="button" class="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="home-tab" data-toggle="tab"
                                                            href="#home" role="tab" aria-controls="home"
                                                            aria-selected="true">Keterangan</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="layer-tab" data-toggle="tab"
                                                            href="#layer" role="tab" aria-controls="layer"
                                                            aria-selected="false">Layer</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="basemaps-tab" data-toggle="tab"
                                                            href="#basemaps" role="tab" aria-controls="basemaps"
                                                            aria-selected="false">Basemaps</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="cari-tab" data-toggle="tab"
                                                            href="#cari" role="tab" aria-controls="cari"
                                                            aria-selected="false">Pencarian</a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content" id="myTabContent">
                                                    <div class="tab-pane fade show active" id="home"
                                                        role="tabpanel" aria-labelledby="home-tab">
                                                        <p>Si Batas Pintar adalah sebuah sistem informasi yang
                                                            menyediakan informasi mengenai pilar batas dan batas wilayah
                                                            di Kota Yogyakarta. Sistem ini dibuat berdasarkan ketentuan
                                                            yang diatur dalam:</p>
                                                        <ol>
                                                            <li>
                                                                <strong>1. Peraturan Walikota Yogyakarta Nomor 48 Tahun
                                                                    2023</strong> tentang Batas Wilayah Kemantren dan
                                                                Kelurahan di Kemantren Umbulharjo, Kotagede, dan
                                                                Mergangsan Kota Yogyakarta.
                                                            </li>
                                                            <li>
                                                                <strong>2. Peraturan Walikota Yogyakarta Nomor 30 Tahun
                                                                    2024</strong> tentang Batas Wilayah Kemantren dan
                                                                Kelurahan di Kemantren Mantrijeron, Wirobrajan, Jetis,
                                                                dan Gondokusuman.
                                                            </li>
                                                        </ol>
                                                        <p>Sistem ini bertujuan untuk memberikan informasi yang akurat
                                                            dan terkini mengenai batas-batas administratif di
                                                            wilayah-wilayah tersebut.</p>
                                                    </div>
                                                    <div class="tab-pane fade" id="layer" role="tabpanel"
                                                        aria-labelledby="layer-tab">
                                                        <p>Menu layer berfungsi untuk menampilkan lapisan-lapisan yang
                                                            digunakan dalam lembar kerja, dalam hal ini adalah peta
                                                            digital. Dalam menu layer, pengguna dapat menentukan apakah
                                                            ingin memunculkan layer atau tidak dengan menggunakan
                                                            checkbox.</p>
                                                        <div class="center-img-container">
                                                            <img class="img-fluid"
                                                                src="{{ asset('asset/img/layer.png') }}"
                                                                alt="Layer Icon" style="height: 40vh;" />
                                                            <img class="img-fluid"
                                                                src="{{ asset('asset/img/legenda.png') }}"
                                                                alt="Legenda Icon" style="height: 35vh;" />
                                                        </div>
                                                        <p>Selain itu, terdapat menu legenda yang digunakan untuk
                                                            menampilkan legenda dari setiap layer data. Menu legenda ini
                                                            membantu pengguna memahami arti dari simbol-simbol yang ada
                                                            pada peta digital.</p>
                                                    </div>
                                                    <div class="tab-pane fade" id="basemaps" role="tabpanel"
                                                        aria-labelledby="basemaps-tab">
                                                        <p>Menu Basemap adalah fitur yang digunakan untuk menampilkan
                                                            dan/atau mengubah peta dasar pada peta digital di website Si
                                                            Batas Pintar. Basemap yang tersedia dalam WebGIS ini
                                                            meliputi: World Imagery Map, World Streets Map, ESRI
                                                            WorldStreetMap, OpenStreetMap
                                                        </p>
                                                        <p>Berikut adalah tampilan menu basemapnya:</p>
                                                        <div class="center-img-container">
                                                            <img class="img-fluid"
                                                                src="{{ asset('asset/img/basemaps.png') }}"
                                                                alt="Basemaps Icon" style="height: 50vh;" />
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" id="cari" role="tabpanel"
                                                        aria-labelledby="cari-tab">
                                                        <p>Menu Pencarian adalah fitur yang memungkinkan pengguna untuk
                                                            menampilkan data yang relevan berdasarkan kriteria pencarian
                                                            yang telah ditentukan. Fitur ini memberikan kemampuan untuk
                                                            menyaring dan menampilkan data spesifik sesuai kebutuhan.
                                                            Data yang dapat difilter meliputi informasi tentang
                                                            kemantren, kelurahan, RW, serta data pilar batas.
                                                        </p>
                                                        <p>
                                                            <strong>1. Pencarian Kemantren</strong>
                                                        </p>
                                                        <p> Pengguna dapat memfilter data kemantren dengan memilih nama
                                                            kemantren yang tersedia dalam opsi. Nama-nama kemantren yang
                                                            ada dalam opsi didasarkan pada data yang tersedia, sehingga
                                                            opsi ini dapat diperbarui dan ditambahkan seiring dengan
                                                            bertambahnya data kemantren.
                                                        </p>
                                                        <div class="center-img-container">
                                                            <img class="img-fluid"
                                                                src="{{ asset('asset/img/kemantren.png') }}"
                                                                alt="Kemantren Icon" style="height: 25vh;" />
                                                        </div>
                                                        <p>
                                                            <strong>2. Pencarian Kelurahan</strong>
                                                        </p>
                                                        <p> Pengguna dapat memfilter data kelurahan dengan memilih nama
                                                            kemantren yang tersedia dalam opsi dan dilanjutkan dengan
                                                            memilih nama kelurahan. Nama-nama kemantren dan kelurahan
                                                            yang ada dalam opsi didasarkan pada data yang tersedia,
                                                            sehingga
                                                            opsi ini dapat diperbarui dan ditambahkan seiring dengan
                                                            bertambahnya data kelurahan.
                                                        </p>
                                                        <div class="center-img-container">
                                                            <img class="img-fluid"
                                                                src="{{ asset('asset/img/kelurahan.png') }}"
                                                                alt="kelurahan Icon" style="height: 30vh;" />
                                                        </div>
                                                        <p>
                                                            <strong>3. Pencarian RW</strong>
                                                        </p>
                                                        <p> Pengguna dapat memfilter data RW dengan terlebih dahulu
                                                            memilih nama kemantren yang tersedia dalam opsi, kemudian
                                                            memilih nama kelurahan, dan akhirnya memilih RW. Nama-nama
                                                            kemantren, kelurahan, dan RW yang ditampilkan dalam opsi ini
                                                            didasarkan pada data yang ada, sehingga opsi tersebut dapat
                                                            diperbarui dan ditambahkan seiring dengan bertambahnya data
                                                            RW.
                                                        </p>
                                                        <div class="center-img-container">
                                                            <img class="img-fluid"
                                                                src="{{ asset('asset/img/RW.png') }}" alt="RW Icon"
                                                                style="height: 35vh;" />
                                                        </div>
                                                        <p>
                                                            <strong>4. Pencarian Pilar</strong>
                                                        </p>
                                                        <p> Pengguna dapat memfilter data pilar dengan memasukkan nomor
                                                            pilar. Data pilar akan ditampilkan berdasarkan input
                                                            pengguna dengan mencocokkan kemiripan nomor yang dimasukkan.
                                                        </p>
                                                        <div class="center-img-container">
                                                            <img class="img-fluid"
                                                                src="{{ asset('asset/img/pilar.png') }}"
                                                                alt="pilar Icon" style="height: 23vh;" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <!-- END: side-nav-content -->
                    </nav>
                    <!-- END: .side-nav -->
                </div>
                <!-- END: .side-content -->
            </aside>

            <!-- END: .app-side -->
            <!-- BEGIN .app-main -->
            <div class="app-main">

                <div id="map">
                    <div id="buttonnav">
                        <div class="col-md-2">
                            <div class="col-md-2">
                                <a href="#" id="app-side-mini-toggler" class="toggle-icon">
                                    <i class="icon-menu5"></i>
                                </a>
                                <a href="#app-side" data-toggle="onoffcanvas" class="toggle-icon"
                                    aria-expanded="true">
                                    <i class="icon-chevron-thin-left"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="attribute" class="card text-center lobipanel-minimize ">
                    <div class="card-header" style="color: rgb(10, 84, 3); font-weight: bold">Tabel Atribut</div>
                    <div class="card-body">
                    </div>
                </div>
            </div>

            <!-- END: .app-main -->
        </div>

        <!-- END: .app-container -->
    </div>

    <!-- END: .app-wrap -->

    <!-- jQuery first, then Tether, then other JS. -->
    <script src="{{ asset('asset/js/jquery.js') }}"></script>
    <script src="{{ asset('asset/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('asset/vendor/unifyMenu/unifyMenu.js') }}"></script>
    <script src="{{ asset('asset/vendor/onoffcanvas/onoffcanvas.js') }}"></script>
    <script src="{{ asset('asset/js/moment.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/js/all.min.js"
        integrity="sha512-6sSYJqDreZRZGkJ3b+YfdhB3MzmuP9R7X1QZ6g5aIXhRvR1Y/N/P47jmnkENm7YL3oqsmI6AK+V6AD99uWDnIw=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!-- Slimscroll JS -->
    <script src="{{ asset('asset/vendor/slimscroll/slimscroll.min.js') }}"></script>
    <script src="{{ asset('asset/vendor/slimscroll/custom-scrollbar.js') }}"></script>

    <!-- Common JS -->
    <script src="{{ asset('asset/js/common.js') }}"></script>
    <!-- Lobipanel -->
    <script src="{{ asset('asset/vendor/lobipanel/lobipanel.js') }}"></script>
    <script src="{{ asset('asset/vendor/lobipanel/lobipanel-custom.js') }}"></script>
    <!-- jQuery UI -->
    <script src="{{ asset('asset/js/jquery-ui.min.js') }}"></script>
</body>

</html>
