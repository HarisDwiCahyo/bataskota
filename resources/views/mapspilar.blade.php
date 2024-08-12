@extends('layout.main')
@section('mainsection')
    <!-- BEGIN .main-heading -->
    <header class="main-heading">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-8">
                    <div class="page-icon">
                        <i class="icon-map6" style="color: rgb(84, 84, 84);"></i>
                    </div>
                    <div class="page-title">
                        <h5 style="color: rgb(81, 81, 81); font-weight: bold">Peta Tampilan Pilar</h5>
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
            <div class="col-sm-12">
                <div class="card lobipanel-custom">
                    <div class="card-header" style="color: rgb(85, 85, 85); font-weight: bold">Peta Pilar Batas</div>
                    <div class="card-body">
                        <div id="map">
                            {{-- <button id="btnCrosshair" title="Live Location">
                                <i class="icon-my_location"></i>
                            </button> --}}
                        </div>
                        <div id="attribute" class="card text-center lobipanel-minimize">
                            <div class="card-header" style="color: rgb(10, 84, 3); font-weight: bold">Tabel Informasi</div>
                            <div class="card-body">
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
