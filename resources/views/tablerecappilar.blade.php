@extends('layout.main')
@section('mainsection')
    <!-- BEGIN .main-heading -->
    <header class="main-heading">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-8">
                    <div class="page-icon">
                        <i class="icon-calendar3" style="color: rgb(94, 97, 94);"></i>
                    </div>
                    <div class="page-title">
                        <h5 style="color: rgb(90, 90, 90); font-weight: bold">Tabel Recap Pilar</h5>
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
                    <div class="card-header" style="color: rgb(86, 86, 86); font-weight: bold">Data Pilar Batas</div>
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
