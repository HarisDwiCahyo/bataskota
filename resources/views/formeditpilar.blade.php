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
                        <h5 style="color: rgb(81, 81, 81); font-weight: bold">Form Edit Pilar</h5>
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
                <form action="{{ route('admin.updatepilar', ['id' => $data[0]['gid']]) }}" method="POST"
                    enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="card lobipanel-custom">
                        <div class="card-header" style="color: rgb(93, 93, 93); font-weight: bold">Edit Atribut Pilar</div>
                        <div class="card-body">
                            <div class="row gutters">
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="inputdate">Input Tanggal</label>
                                        <input type="date" class="form-control" id="inputdate" name="inputdate"
                                            value="{{ $data[0]['tanggal'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="file">Input Foto
                                            @if ($data[0]['foto'])
                                                : <a
                                                    href="{{ asset('upload/foto/' . $data[0]['foto']) }}">{{ $data[0]['foto'] }}</a>
                                            @else
                                                : No image uploaded
                                            @endif
                                        </label>

                                        <input type="file" accept=".jpg, .jpeg, .png, .pdf" class="form-control"
                                            id="file" name="file" style="padding: 3px" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="operator">Operator</label>
                                        <input type="text" class="form-control" id="operator" name="operator"
                                            placeholder="operator" value="{{ $data[0]['operator'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="kemantren">Kemantren</label>
                                        <input type="text" class="form-control" id="kemantren" name="kemantren"
                                            placeholder="cth: Jetis" value="{{ $data[0]['kemantren'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="kelurahan">Kelurahan</label>
                                        <input type="text" class="form-control" id="kelurahan" name="kelurahan"
                                            placeholder="cth: Bumijo" value="{{ $data[0]['kelurahan'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="kondisi">Kondisi</label>
                                        <select class="form-control" id="kondisi" name="kondisi">
                                            <option value="Baik" {{ $data[0]['kondisi'] == 'Baik' ? 'selected' : '' }}>
                                                Baik</option>
                                            <option value="Rusak" {{ $data[0]['kondisi'] == 'Rusak' ? 'selected' : '' }}>
                                                Rusak</option>
                                            <option value="Hilang" {{ $data[0]['kondisi'] == 'Hilang' ? 'selected' : '' }}>
                                                Hilang</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="east">Longitude</label>
                                        <input type="text" class="form-control" id="east" name="east"
                                            placeholder="east" value="{{ $data[0]['east'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="south">Laitude</label>
                                        <input type="text" class="form-control" id="south" name="south"
                                            placeholder="south" value="{{ $data[0]['south'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="nopilar">No. Pilar</label>
                                        <input type="text" class="form-control" id="nopilar" name="nopilar"
                                            placeholder="nopilar" value="{{ $data[0]['nopilar'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="northing">Northing</label>
                                        <input type="numeric" class="form-control" id="northing" name="northing"
                                            placeholder="northing" value="{{ $data[0]['northing'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="easting">Easting</label>
                                        <input type="numeric" class="form-control" id="easting" name="easting"
                                            placeholder="easting" value="{{ $data[0]['easting'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="ketinggian">Ketinggian</label>
                                        <input type="numeric" class="form-control" id="ketinggian" name="ketinggian"
                                            placeholder="ketinggian" value="{{ $data[0]['up'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="peraturan">Peraturan</label>
                                        <input type="text" class="form-control" id="peraturan" name="peraturan"
                                            placeholder="peraturan" value="{{ $data[0]['peraturan'] }}" />
                                    </div>
                                </div>

                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="perbatasan">Perbatasan</label>
                                        <input type="text" class="form-control" id="perbatasan" name="perbatasan"
                                            placeholder="perbatasan" value="{{ $data[0]['perbatasan'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="beritaacara">Berita Acara</label>
                                        <input type="url" class="form-control" id="beritaacara" name="beritaacara"
                                            placeholder="link url" value="{{ $data[0]['beritaacara'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="pembuatan">Tahun Pembuatan</label>
                                        <input type="text" class="form-control" id="pembuatan" name="pembuatan"
                                            placeholder="tahun" value="{{ $data[0]['pembuatan'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="pemeliharaan">Tahun Pemeliharaan</label>
                                        <input type="text" class="form-control" id="pemeliharaan" name="pemeliharaan"
                                            placeholder="tahun" value="{{ $data[0]['pemeliharaan'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="alamat">Alamat Detail</label>
                                        <textarea class="form-control" id="alamat" name="alamat" rows="3" placeholder="alamat">{{ $data[0]['alamat'] }}</textarea>
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="geom">Geometry</label>
                                        <textarea class="form-control" id="geom" name="geom" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <a href="{{ route('admin.tablerecappilar') }}" class="btn btn-primary my-1"
                                style="background-color: rgb(10, 84, 3); border-radius:5px; border: solid 1px rgb(255, 255, 255)">Kembali</a>
                            <button type="submit" class="btn btn-primary my-1"
                                style="background-color: blue; border-radius:5px; border: solid 1px rgb(255, 255, 255)">Simpan</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-12">
                <div class="card lobipanel-custom">
                    <div class="card-header" style="color: rgb(82, 82, 82); font-weight: bold">Peta Data Pilar</div>
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
@endsection
