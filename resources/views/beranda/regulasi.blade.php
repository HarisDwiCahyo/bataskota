@extends('layout.beranda')
@section('css')
    <style>
        #myGrid {
            height: 400px;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .ag-theme-quartz {
            --ag-foreground-color: rgb(22, 68, 11) !important;
            --ag-background-color: rgb(255, 255, 255) !important;
            --ag-header-background-color: rgb(255, 255, 255) !important;
            --ag-odd-row-background-color: rgba(211, 204, 202, 0.03) !important;
            --ag-font-size: 14px !important;
        }
    </style>
@endsection
@section('mainsection')
    <main id="main">
        <!-- ======= Breadcrumbs ======= -->
        <section id="breadcrumbs" class="breadcrumbs">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                    <h4 style="font-weight: bold; margin-top: 10px">Regulasi</h4>
                    <ol>
                        <li><a href="{{ route('home') }}">Beranda</a></li>
                        <li>Regulasi</li>
                    </ol>
                </div>
            </div>
        </section>
        <!-- End Breadcrumbs -->

        <!-- ======= Services Section ======= -->
        <section id="services" class="services">
            <div class="container">
                {{-- <div class="row">
                    <div class="col-md-6">
                        <div class="icon-box">
                            <i class="bx bx-file"></i>
                            <h4>
                                <a href="#">Perwal 48 tahun 2023</a>
                            </h4>
                            <p style="text-align: justify;">
                                Peraturan Walikota Yogyakarta Nomor 48 Tahun 2023 mengatur mengenai batas wilayah kemantren
                                dan kelurahan di Kemantren Umbulharjo, Kotagede, dan Mergangsan. Tujuan dari peraturan ini
                                adalah untuk memperjelas dan menetapkan batas-batas administratif di wilayah-wilayah
                                tersebut secara resmi dan akurat.
                            </p>
                            <div class="btn-group">
                                <a style="
                    background-color: rgb(16, 80, 58);
                    border: rgb(255, 255, 255) solid 1px;
                  "
                                    href="https://drive.google.com/file/d/1dgoMal3PXoUqo4avPi5HFCb75g4gmAXK/view?usp=sharing"
                                    class="btn btn-primary download-btn" download>Unduh</a>
                                <a href="https://drive.google.com/file/d/1dgoMal3PXoUqo4avPi5HFCb75g4gmAXK/view?usp=sharing"
                                    class="btn btn-secondary view-btn" target="_blank">Lihat</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mt-4 mt-md-0">
                        <div class="icon-box">
                            <i class="bx bx-file"></i>
                            <h4><a href="#">Perwal 30 tahun 2024</a></h4>
                            <p style="text-align: justify;">
                                Peraturan Wali Kota Yogyakarta Nomor 30 Tahun 2024 mengatur mengenai batas wilayah kemantren
                                dan kelurahan di Kemantren Mantrijeron, Wirobrajan, Jetis, dan Gondokusuman. Tujuan dari
                                peraturan ini adalah untuk memperjelas dan menetapkan batas-batas administratif di
                                wilayah-wilayah tersebut secara resmi dan akurat.
                            </p>
                            <div class="btn-group">
                                <a style="
                    background-color: rgb(16, 80, 58);
                    border: solid 1px rgb(255, 255, 255);
                  "
                                    href="https://drive.google.com/file/d/1Jq_Gdr884dOlu1G5CMhjLTczWWIslabk/view?usp=sharing"
                                    class="btn btn-primary download-btn" download>Unduh</a>
                                <a href="https://drive.google.com/file/d/1Jq_Gdr884dOlu1G5CMhjLTczWWIslabk/view?usp=sharing"
                                    class="btn btn-secondary view-btn" target="_blank">Lihat</a>
                            </div>
                        </div>
                    </div>
                </div> --}}
                <div class="card-body">
                    <div id="myGrid" style="height: 300px" class="ag-theme-quartz"></div>
                </div>
            </div>
        </section>
        <!-- End Services Section -->
    </main>
@endsection
