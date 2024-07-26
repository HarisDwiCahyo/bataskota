@extends('layout.main')
@section('mainsection')
    <!-- BEGIN .main-heading -->
    <header class="main-heading">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-8">
                    <div class="page-icon">
                        <i class="icon-calendar3" style="color: rgb(87, 87, 87);"></i>
                    </div>
                    <div class="page-title">
                        <h5 style="color: rgb(93, 93, 93); font-weight: bold">Tabel Admin</h5>
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
                    <div class="card-header" style="color: rgb(96, 96, 96); font-weight: bold">Data Admin</div>
                    <div class="card-body">
                        <div id="myGrid" class="ag-theme-quartz"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Row ends -->
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
