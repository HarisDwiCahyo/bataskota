@extends('layout.main')
@section('mainsection')
    <!-- BEGIN .main-heading -->
    <header class="main-heading">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-8">
                    <div class="page-icon">
                        <i class="icon-camera5" style="color: rgb(82, 82, 82);"></i>
                    </div>
                    <div class="page-title">
                        <h5 style="color: rgb(81, 81, 81); font-weight: bold">Register Admin</h5>
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

                <form action="{{ route('admin.storeadmin') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="card lobipanel-custom">
                        <div class="card-header" style="color: rgb(93, 93, 93); font-weight: bold">Tambah Akun</div>
                        <div class="card-body">
                            <div class="row gutters">
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="name">Username</label>
                                        <input type="text" class="form-control" id="name" name="name"
                                            placeholder="name" required />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="text" class="form-control" id="email" name="email"
                                            placeholder="email" required />
                                        @if ($errors->has('email'))
                                            <div class="error" style="color: rgb(207, 22, 22)">
                                                {{ $errors->first('email') }}</div>
                                            <br>
                                        @endif
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" class="form-control" id="password" name="password" />
                                        @if ($errors->has('password'))
                                            <div class="error" style="color: rgb(207, 22, 22)">
                                                {{ $errors->first('password') }}</div><br>
                                        @endif
                                    </div>
                                </div>
                                <a href="{{ route('admin.dashboard') }}" class="btn btn-primary my-1"
                                    style="background-color: rgb(10, 84, 3); width: 149px; border-radius:5px; border: solid 1px rgb(255, 255, 255); margin-right: 5px; margin-left:5px">Kembali</a>
                                <button type="submit" class="btn btn-primary my-1"
                                    style="background-color: blue;width: 149px; border-radius:5px; border: solid 1px rgb(255, 255, 255)">Simpan</button>
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
