@extends('layout.main')
@section('mainsection')
    <!-- BEGIN .main-heading -->
    <header class="main-heading">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-8">
                    <div class="page-icon">
                        <i class="icon-documents2" style="color: rgb(92, 92, 92);"></i>
                    </div>
                    <div class="page-title">
                        <h5 style="color: rgb(91, 91, 91); font-weight: bold">Form Edit Kemantren</h5>
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
                <form action="{{ route('admin.updatekemantren', ['id' => $data[0]['gid']]) }}" method="POST"
                    enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="card lobipanel-custom">
                        <div class="card-header" style="color: rgb(95, 95, 95); font-weight: bold">Edit Atribut Kemantren
                        </div>
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
                                        <label for="kota">Kota</label>
                                        <input type="text" class="form-control" id="kota" name="kota"
                                            placeholder="kota" value="{{ $data[0]['kota'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="srsid">SRSID</label>
                                        <input type="text" class="form-control" id="srsid" name="srsid"
                                            placeholder="srsid" value="{{ $data[0]['srsid'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="kodekecamatan">Kode Kecamatan</label>
                                        <input type="text" class="form-control" id="kodekecamatan" name="kodekecamatan"
                                            placeholder="kodekecamatan" value="{{ $data[0]['kodekecamatan'] }}" />
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
                                        <label for="beritaacara">Berita Acara</label>
                                        <input type="url" class="form-control" id="beritaacara" name="beritaacara"
                                            placeholder="link url" value="{{ $data[0]['beritaacara'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="batasutara">Perbatasan Utara</label>
                                        <input type="text" class="form-control" id="batasutara" name="batasutara"
                                            placeholder="Perbatasan Utara" value="{{ $data[0]['batasutara'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="batastimur">Perbatasan Timur</label>
                                        <input type="text" class="form-control" id="batastimur" name="batastimur"
                                            placeholder="Perbatasan Timur" value="{{ $data[0]['batastimur'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="batasselatan">Perbatasan Selatan</label>
                                        <input type="text" class="form-control" id="batasselatan" name="batasselatan"
                                            placeholder="Perbatasan Selatan" value="{{ $data[0]['batasselatan'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="batasbarat">Perbatasan Barat</label>
                                        <input type="text" class="form-control" id="batasbarat" name="batasbarat"
                                            placeholder="Perbatasan Barat" value="{{ $data[0]['batasbarat'] }}" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="geom">Geometry</label>
                                        <textarea class="form-control" id="geom" name="geom" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <a href="{{ route('admin.tablerecapkemantren') }}" class="btn btn-primary my-1"
                                style="background-color: rgb(10, 84, 3); border-radius:5px; border: solid 1px rgb(255, 255, 255)">Kembali</a>
                            <button type="submit" class="btn btn-primary my-1"
                                style="background-color: blue; border-radius:5px; border: solid 1px rgb(255, 255, 255)">Simpan</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-12">
                <div class="card lobipanel-custom">
                    <div class="card-header" style="color: rgb(93, 93, 93); font-weight: bold">Peta Data Kemantren</div>
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
