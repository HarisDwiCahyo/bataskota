@extends('layout.main')
@section('mainsection')
    <!-- BEGIN .main-heading -->
    <header class="main-heading">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-8">
                    <div class="page-icon">
                        <i class="icon-documents2" style="color: rgb(82, 82, 82);"></i>
                    </div>
                    <div class="page-title">
                        <h5 style="color: rgb(81, 81, 81); font-weight: bold">Input Regulasi</h5>
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

                <form action="{{ route('admin.storeregulasi') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="card lobipanel-custom">
                        <div class="card-header" style="color: rgb(93, 93, 93); font-weight: bold">Tambah Regulasi</div>
                        <div class="card-body">
                            <div class="row gutters">
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="peraturan">Peraturan</label>
                                        <input type="text" class="form-control" id="peraturan" name="peraturan"
                                            placeholder="peraturan" required />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="inputdate">Input Tanggal</label>
                                        <input type="date" class="form-control" id="inputdate" name="inputdate"
                                            required />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="link">Link Peraturan</label>
                                        <input type="url" class="form-control" id="link" name="link"
                                            placeholder="link url" required />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="deskripsi">Deskripsi</label>
                                        <textarea class="form-control" id="deskripsi" name="deskripsi" rows="3" required></textarea>
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">

                                </div>
                                <div class="col-sm-4 col-12">

                                </div>
                                <!-- Button Row -->
                                <div class="row">
                                    <div class="col-12 text-center">
                                        <a href="{{ route('admin.dashboard') }}" class="btn btn-primary my-1"
                                            style="background-color: rgb(10, 84, 3); width: 149px; border-radius: 5px; border: solid 1px rgb(255, 255, 255); margin-right: 5px; margin-left: 5px;">Kembali</a>
                                        <button type="submit" class="btn btn-primary my-1"
                                            style="background-color: blue; width: 149px; border-radius: 5px; border: solid 1px rgb(255, 255, 255);">Simpan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </form>
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
