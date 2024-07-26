@extends('layout.main')
@section('mainsection')
    <!-- BEGIN .main-heading -->
    <header class="main-heading">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-8">
                    <div class="page-icon">
                        <i class="icon-laptop4" style="color: rgb(91, 91, 91);"></i>
                    </div>
                    <div class="page-title">
                        <h5 style="font-weight: bold">Dashboard</h5>
                        <h6 class="sub-heading">Selamat Datang Admin Si Batas Pintar</h6>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- END: .main-heading -->
    <!-- BEGIN .main-content -->
    <div class="main-content">
        <!-- Row start -->
        <div class="row gutters">
            <div class="col-md-3 col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <div class="stats-widget">
                            <div class="stats-widget-header">
                                <i class="icon-map6" style="color: rgb(74, 74, 74)"></i>
                            </div>
                            <div class="stats-widget-body">
                                <!-- Row start -->
                                <ul class="row no-gutters">
                                    <li class="col-sm-6 col">
                                        <h6 class="title">Pilar Batas</h6>
                                    </li>
                                    <li class="col-sm-6 col">
                                        <h4 class="total" id="total-pilar" style="color: rgb(4, 71, 48)">0</h4>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <div class="stats-widget">
                            <div class="stats-widget-header">
                                <i class="icon-layers3" style="color: rgb(74, 74, 74)"></i>
                            </div>
                            <div class="stats-widget-body">
                                <!-- Row start -->
                                <ul class="row no-gutters">
                                    <li class="col-sm-6 col">
                                        <h6 class="title">Batas Kemantren</h6>
                                    </li>
                                    <li class="col-sm-6 col">
                                        <h4 class="total" id="total-kemantren" style="color: rgb(4, 71, 48)">0</h4>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <div class="stats-widget">
                            <div class="stats-widget-header">
                                <i class="icon-layers3" style="color: rgb(74, 74, 74)"></i>
                            </div>
                            <div class="stats-widget-body">
                                <!-- Row start -->
                                <ul class="row no-gutters">
                                    <li class="col-sm-6 col">
                                        <h6 class="title">Batas Kelurahan</h6>
                                    </li>
                                    <li class="col-sm-6 col">
                                        <h4 class="total" id="total-kelurahan" style="color: rgb(4, 71, 48)">0</h4>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <div class="stats-widget">
                            <div class="stats-widget-header">
                                <i class="icon-layers3" style="color: rgb(74, 74, 74)"></i>
                            </div>
                            <div class="stats-widget-body">
                                <!-- Row start -->
                                <ul class="row no-gutters">
                                    <li class="col-sm-6 col">
                                        <h6 class="title">Batas RW</h6>
                                    </li>
                                    <li class="col-sm-6 col">
                                        <h4 class="total" id="total-rw" style="color: rgb(4, 71, 48)">0</h4>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Row end -->
        <!-- Row start PBA dan PBU -->
        <div class="row gutters">
            <div class="col-lg-8 col-md-7 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h6> Pilar PBA dan PBU </h6>
                    </div>
                    <div class="customScroll">
                        <div class="card-body">
                            <ul class="team-activity">
                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PBA</p>
                                        <span class="badge badge-success">Baik</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PBA Baik :</h5>
                                                <p id="total-pba-baik">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-baik" class="progress-bar progress-bar-info"
                                                        role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                                        aria-valuemax="100" style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-baik">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PBA</p>
                                        <span class="badge badge-primary">Rusak</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PBA Rusak :</h5>
                                                <p id="total-pba-rusak">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-rusak" class="progress-bar progress-bar-info"
                                                        role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                                        aria-valuemax="100" style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-rusak">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PBA</p>
                                        <span class="badge badge-warning" style="color: rgb(255, 255, 255)">Hilang</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PBA Hilang :</h5>
                                                <p id="total-pba-hilang">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-hilang" class="progress-bar progress-bar-info"
                                                        role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                                        aria-valuemax="100" style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-hilang">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PBU</p>
                                        <span class="badge badge-success">Baik</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PBU Baik :</h5>
                                                <p id="total-pbu-baik">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-baik-pbu" class="progress-bar progress-bar-info"
                                                        role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                                        aria-valuemax="100" style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-baik-pbu">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PBU</p>
                                        <span class="badge badge-primary">Rusak</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PBU Rusak :</h5>
                                                <p id="total-pbu-rusak">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-rusak-pbu"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-rusak-pbu">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PBU</p>
                                        <span class="badge badge-warning" style="color: rgb(255, 255, 255)">Hilang</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PBU Hilang :</h5>
                                                <p id="total-pbu-hilang">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-hilang-pbu"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-hilang-pbu">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-5 col-sm-12">
                <div id="total-pba-pbu-card" class="card">
                    <div class="card-header">
                        <h6> Total PBA dan PBU </h6>
                    </div>
                    <div class="card-body">
                        <div class="chartist custom-one">
                            <div class="donut-chart"></div>
                        </div>
                        <div class="row gutters">
                            <div class="col-sm-6 col">
                                <div class="info-stats">
                                    <span class="info-label"></span>
                                    <h6 class="info-title">PBA</h6>
                                    <h4 class="info-total" id="total-pba">0</h4>
                                </div>
                            </div>
                            <div class="col-sm-6 col">
                                <div class="info-stats">
                                    <span class="info-label red"></span>
                                    <h6 class="info-title">PBU</h6>
                                    <h4 class="info-total" id="total-pbu">0</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Row end -->
        <!-- Row start  PABA dan PABU-->
        <div class="row gutters">
            <div class="col-lg-8 col-md-7 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h6> Kondisi Pilar PABA dan PABU </h6>
                    </div>
                    <div class="customScroll">
                        <div class="card-body">
                            <ul class="team-activity">
                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PABA</p>
                                        <span class="badge badge-success">Baik</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PABA Baik :</h5>
                                                <p id="total-paba-baik">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-baik-paba"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-baik-paba">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PABA</p>
                                        <span class="badge badge-primary">Rusak</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PABA Rusak :</h5>
                                                <p id="total-paba-rusak">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-rusak-paba"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-rusak-paba">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PABA</p>
                                        <span class="badge badge-warning" style="color: rgb(255, 255, 255)">Hilang</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PABA Hilang :</h5>
                                                <p id="total-paba-hilang">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-hilang-paba"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-hilang-paba">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PABU</p>
                                        <span class="badge badge-success">Baik</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PABU Baik :</h5>
                                                <p id="total-pabu-baik">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-baik-pabu"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-baik-pabu">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PABU</p>
                                        <span class="badge badge-primary">Rusak</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PABU Rusak :</h5>
                                                <p id="total-pabu-rusak">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-rusak-pabu"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-rusak-pabu">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PABU</p>
                                        <span class="badge badge-warning" style="color: rgb(255, 255, 255)">Hilang</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PABU Hilang :</h5>
                                                <p id="total-pabu-hilang">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-hilang-pabu"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-hilang-pabu">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-5 col-sm-12">
                <div id="total-paba-pabu-card" class="card">
                    <div class="card-header">
                        <h6>Total PABA dan PABU </h6>
                    </div>
                    <div class="card-body">
                        <div class="chartist custom-one">
                            <div class="donut-chart"></div>
                        </div>
                        <div class="row gutters">
                            <div class="col-sm-6 col">
                                <div class="info-stats">
                                    <span class="info-label"></span>
                                    <h6 class="info-title">PABA</h6>
                                    <h4 class="info-total" id="total-paba">0</h4>
                                </div>
                            </div>
                            <div class="col-sm-6 col">
                                <div class="info-stats">
                                    <span class="info-label red"></span>
                                    <h6 class="info-title">PABU</h6>
                                    <h4 class="info-total" id="total-pabu">0</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Row end -->
        <!-- Row start  PABA dan PABU-->
        <div class="row gutters">
            <div class="col-lg-8 col-md-7 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h6> Kondisi Pilar PKBA dan PKBU </h6>
                    </div>
                    <div class="customScroll">
                        <div class="card-body">
                            <ul class="team-activity">
                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PKBA</p>
                                        <span class="badge badge-success">Baik</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PKBA Baik :</h5>
                                                <p id="total-pkba-baik">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-baik-pkba"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-baik-pkba">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PKBA</p>
                                        <span class="badge badge-primary">Rusak</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PKBA Rusak :</h5>
                                                <p id="total-pkba-rusak">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-rusak-pkba"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-rusak-pkba">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PKBA</p>
                                        <span class="badge badge-warning" style="color: rgb(255, 255, 255)">Hilang</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PKBA Hilang :</h5>
                                                <p id="total-pkba-hilang">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-hilang-pkba"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-hilang-pkba">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PKBU</p>
                                        <span class="badge badge-success">Baik</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PKBU Baik :</h5>
                                                <p id="total-pkbu-baik">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-baik-pkbu"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-baik-pkbu">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PKBU</p>
                                        <span class="badge badge-primary">Rusak</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PKBU Rusak :</h5>
                                                <p id="total-pkbu-rusak">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-rusak-pkbu"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-rusak-pkbu">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="product-list clearfix">
                                    <div class="product-time">
                                        <p class="date center-text">Kondisi PKBU</p>
                                        <span class="badge badge-warning" style="color: rgb(255, 255, 255)">Hilang</span>
                                    </div>
                                    <div class="product-info">
                                        <div class="row gutter">
                                            <div class="col-lg-8 col-md-7 col-sm-7">
                                                <h5>Total PKBU Hilang :</h5>
                                                <p id="total-pkbu-hilang">0</p>
                                            </div>
                                            <div class="col-lg-4 col-md-5 col-sm-5">
                                                <div class="progress sm no-margin">
                                                    <div id="progress-bar-hilang-pkbu"
                                                        class="progress-bar progress-bar-info" role="progressbar"
                                                        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 0%">
                                                    </div>
                                                </div>
                                                <p id="progress-text-hilang-pkbu">0% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-5 col-sm-12">
                <div id="total-pkba-pkbu-card" class="card">
                    <div class="card-header">
                        <h6>Total PKBA dan PKBU</h6>
                    </div>
                    <div class="card-body">
                        <div class="chartist custom-one">
                            <div class="donut-chart"></div>
                        </div>
                        <div class="row gutters">
                            <div class="col-sm-6 col">
                                <div class="info-stats">
                                    <span class="info-label"></span>
                                    <h6 class="info-title">PKBA</h6>
                                    <h4 class="info-total" id="total-pkba">0</h4>
                                </div>
                            </div>
                            <div class="col-sm-6 col">
                                <div class="info-stats">
                                    <span class="info-label red"></span>
                                    <h6 class="info-title">PKBU</h6>
                                    <h4 class="info-total" id="total-pkbu">0</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Row end -->
    </div>
    <!-- END: .main-content -->
@endsection
