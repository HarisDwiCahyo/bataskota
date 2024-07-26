@extends('layout.main')
@section('mainsection')
    <!-- BEGIN .main-heading -->
    <header class="main-heading">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-8">
                    <div class="page-icon">
                        <i class="icon-browser2" style="color: rgb(89, 89, 89);"></i>
                    </div>
                    <div class="page-title">
                        <h5 style="color: rgb(85, 85, 85); font-weight: bold">Form Input RW</h5>
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
                <form id="featureForm" action="{{ route('admin.storerw') }}" method="POST">
                    @csrf
                    <div class="card lobipanel-custom">
                        <div class="card-header">
                            <div class="card-title" style="color: rgb(98, 98, 98); font-weight: bold">Input Data RW
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row gutters">
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="inputdate">Input Tanggal</label>
                                        <input type="date" class="form-control" id="inputdate" name="inputdate" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="operator">Operator</label>
                                        <input type="text" class="form-control" id="operator" name="operator"
                                            placeholder="nama" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="formFile">Input File</label>
                                        <input type="file" class="form-control" id="formFile"
                                            accept=".geojson,application/json" style="padding: 3px" />
                                    </div>
                                </div>

                                <div class="form-inline" style="margin-left: 8px">
                                    <a href="#" class="btn btn-primary my-1 btn-custom" id="checkData"
                                        style="background-color: rgb(10, 84, 3);">
                                        Cek Data
                                    </a>
                                    <button type="submit" class="btn btn-primary my-1 btn-custom"
                                        style="background-color: blue;">
                                        Simpan
                                    </button>
                                    <a href="{{ route('admin.forminputrw2') }}" class="btn btn-primary my-1 btn-custom"
                                        style="background-color: rgb(255, 70, 70);">
                                        Form Input 2
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-12">
                <div class="card lobipanel-custom">
                    <div class="card-header">
                        <div class="card-title" style="color: rgb(97, 97, 97); font-weight: bold">Tabel RW</div>
                    </div>
                    <div class="card-body" id="tableattribute">
                        <div id="myGrid" class="ag-theme-quartz"></div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="card lobipanel-custom">
                    <div class="card-header" style="color: rgb(98, 98, 98); font-weight: bold">Peta RW</div>
                    <div class="card-body">
                        <div id="map">
                            <button id="btnCrosshair" title="Live Location">
                                <i class="icon-my_location"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Row end -->
    </div>
    <!-- END: .main-content -->
    @if ($message = Session::get('success') ?? Session::get('failed'))
        <script>
            Swal.fire({
                icon: "{{ Session::has('success') ? 'success' : 'error' }}",
                title: "{{ Session::has('success') ? 'Good Job' : 'Oops...' }}",
                text: "{{ $message }}",
            });
        </script>
    @endif
@endsection
