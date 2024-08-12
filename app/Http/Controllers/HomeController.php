<?php

namespace App\Http\Controllers;

use App\Http\Resources\BatasPilar;
use App\Http\Resources\Kelurahan;
use App\Http\Resources\Kemantren;
use App\Http\Resources\Kota;
use App\Http\Resources\RW;
use App\Models\HistorisKelurahanModel;
use App\Models\HistorisKemantrenModel;
use App\Models\HistorisKotaModel;
use App\Models\HistorisPilarModel;
use App\Models\HistorisRWModel;
use App\Models\KelurahanModel;
use App\Models\KemantrenModel;
use App\Models\KotaModel;
use App\Models\PilarModel;
use App\Models\RegulasiModel;
use App\Models\RwModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;

class HomeController extends Controller
{
    public function home()
    {
        return view('beranda.home', [
            "title" => "home",
        ]);
    }
    public function regulasi()
    {
        $data = RegulasiModel::get();
        return view('beranda.regulasi', [
            "title" => "regulasi",
            'data' => $data,
        ]);
    }
    public function kontak()
    {
        return view('beranda.kontak', [
            "title" => "kontak",
        ]);
    }
    public function mainmaps()
    {
        return view('mainmaps', [
            "title" => "mainmaps",
        ]);
    }

    //Batas Pilar
    public function bataspilar()
    {
        $data = null;
        DB::beginTransaction();
        try {
            // Melakukan query untuk mendapatkan data pilar batas
            $data = DB::select("SELECT gid, kemantren, kelurahan, kondisi, east, south, nopilar, northing, easting, up, peraturan, perbatasan, beritaacara, alamat, pembuatan, pemeliharaan, foto, ST_AsGeoJSON(geom) AS geom FROM pilarbatas");

            // Konversi hasil query menjadi collection
            $bataspilarCollection = collect($data);

            // Mengosongkan cache jika diperlukan
            Cache::flush();

            // Commit transaksi untuk menyimpan perubahan pada database
            DB::commit();

            // Menggunakan resource collection untuk mengubah data menjadi format GeoJSON
            return new BatasPilar($bataspilarCollection);
        } catch (\Throwable $th) {
            // Rollback transaksi jika terjadi kesalahan
            DB::rollBack();

            // Opsional: lempar kembali pengecualian untuk penanganan lebih lanjut
            // throw $th;
        }
    }
    public function historisbataspilar()
    {
        $historisbataspilar = DB::select("SELECT gid, kemantren, kelurahan, kondisi, east, south, nopilar, northing, easting, up, peraturan, perbatasan, beritaacara, alamat, pembuatan, pemeliharaan,foto, ST_AsGeoJSON(geom) AS geom FROM historispilar");

        // Konversi hasil query menjadi collection
        $historisbataspilarCollection = collect($historisbataspilar);

        // Menggunakan resource collection untuk mengubah data menjadi format GeoJSON
        return new BatasPilar($historisbataspilarCollection);
    }
    public function kota()
    {
        $data = null;
        DB::beginTransaction();
        try {
            // Melakukan query untuk mendapatkan data kota
            $data = DB::select("SELECT gid, kota, srsid, kodekota, peraturan, beritaacara, batasutara, batasbarat, batasselatan, batastimur, ST_AsGeoJSON(geom) AS geom FROM kota");

            // Konversi hasil query menjadi collection
            $kotaCollection = collect($data);

            // Mengosongkan cache jika diperlukan
            Cache::flush();

            // Commit transaksi untuk menyimpan perubahan pada database
            DB::commit();

            // Menggunakan resource collection untuk mengubah data menjadi format GeoJSON
            return new Kota($kotaCollection);
        } catch (\Throwable $th) {
            // Rollback transaksi jika terjadi kesalahan
            DB::rollBack();

            // Opsional: lempar kembali pengecualian untuk penanganan lebih lanjut
            // throw $th;
        }
    }

    public function historiskota()
    {
        $historiskota = DB::select("SELECT gid, kota, srsid, kodekota, peraturan, beritaacara, batasutara, batasbarat, batasselatan, batastimur, ST_AsGeoJSON(geom) AS geom FROM historiskota ");

        // Konversi hasil query menjadi collection
        $historiskotaCollection = collect($historiskota);

        // Menggunakan resource collection untuk mengubah data menjadi format GeoJSON
        return new Kota($historiskotaCollection);
    }
    public function kecamatan()
    {
        $data = null;
        DB::beginTransaction();
        try {
            // Melakukan query untuk mendapatkan data kemantren
            $data = DB::select("SELECT gid, kemantren, kota, srsid, kodekecamatan, peraturan, beritaacara, batasutara, batasbarat, batasselatan, batastimur, ST_AsGeoJSON(geom) AS geom FROM kemantren");

            // Konversi hasil query menjadi collection
            $kemantrenCollection = collect($data);

            // Mengosongkan cache jika diperlukan
            Cache::flush();

            // Commit transaksi untuk menyimpan perubahan pada database
            DB::commit();

            // Menggunakan resource collection untuk mengubah data menjadi format GeoJSON
            return new Kemantren($kemantrenCollection);
        } catch (\Throwable $th) {
            // Rollback transaksi jika terjadi kesalahan
            DB::rollBack();

            // Opsional: lempar kembali pengecualian untuk penanganan lebih lanjut
            // throw $th;
        }
    }
    public function historiskecamatan()
    {
        $historiskemantren = DB::select("SELECT gid, kemantren, kota, srsid, kodekecamatan, peraturan, beritaacara, batasutara, batasbarat, batasselatan, batastimur, ST_AsGeoJSON(geom) AS geom FROM historiskemantren ");

        // Konversi hasil query menjadi collection
        $historiskemantrenCollection = collect($historiskemantren);

        // Menggunakan resource collection untuk mengubah data menjadi format GeoJSON
        return new Kemantren($historiskemantrenCollection);
    }
    public function kelurahan()
    {
        $data = null;
        DB::beginTransaction();
        try {
            // Melakukan query untuk mendapatkan data kelurahan
            $data = DB::select("SELECT gid, kelurahan, kemantren, kota, srsid, kodekecamatan, kodekelurahan, peraturan, beritaacara, batasutara, batasbarat, batasselatan, batastimur, ST_AsGeoJSON(geom) AS geom FROM kelurahan");

            // Konversi hasil query menjadi collection
            $kelurahanCollection = collect($data);

            // Mengosongkan cache jika diperlukan
            Cache::flush();

            // Commit transaksi untuk menyimpan perubahan pada database
            DB::commit();

            // Menggunakan resource collection untuk mengubah data menjadi format GeoJSON
            return new Kelurahan($kelurahanCollection);
        } catch (\Throwable $th) {
            // Rollback transaksi jika terjadi kesalahan
            DB::rollBack();

            // Opsional: lempar kembali pengecualian untuk penanganan lebih lanjut
            // throw $th;
        }
    }
    public function historiskelurahan()
    {
        $historiskelurahan = DB::select("SELECT gid, kelurahan, kemantren, kota, srsid, kodekecamatan, kodekelurahan, peraturan, beritaacara, batasutara, batasbarat, batasselatan, batastimur, ST_AsGeoJSON(geom) AS geom FROM historiskelurahan ");

        // Konversi hasil query menjadi collection
        $historiskelurahanCollection = collect($historiskelurahan);

        // Menggunakan resource collection untuk mengubah data menjadi format GeoJSON
        return new Kelurahan($historiskelurahanCollection);
    }
    public function rw()
    {
        $data = Null;
        DB::beginTransaction();
        try {
            $data = DB::select("SELECT gid, kelurahan, kemantren, kota, srsid, kodekecamatan, kodekelurahan, rw, peraturan, beritaacara, batasutara, batasbarat, batasselatan, batastimur, ST_AsGeoJSON(geom) AS geom FROM rw ");
            // Konversi hasil query menjadi collection
            $rwCollection = collect($data);

            // Menggunakan resource collection untuk mengubah data menjadi format GeoJSON
            return new RW($rwCollection);
            Cache::flush();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            //throw $th;
        }
    }
    public function historisrw()
    {
        $historisrw = DB::select("SELECT gid, kelurahan, kemantren, kota, srsid, kodekecamatan, kodekelurahan, rw, peraturan, beritaacara, batasutara, batasbarat, batasselatan, batastimur, ST_AsGeoJSON(geom) AS geom FROM historisrw ");

        // Konversi hasil query menjadi collection
        $historisrwCollection = collect($historisrw);

        // Menggunakan resource collection untuk mengubah data menjadi format GeoJSON
        return new RW($historisrwCollection);
    }

    public function dashboard()
    {
        $data = PilarModel::get();
        $data1 = KemantrenModel::get();
        $data2 = KelurahanModel::get();
        $data3 = RwModel::get();
        return view('dashboard', [
            'data' => $data,
            'data1' => $data1,
            'data2' => $data2,
            'data3' => $data3,
            "title" => "dashboard",
        ]);
    }
    //Table Regulasi =============================================================================
    public function inputregulasi()
    {
        return view('inputregulasi', [
            "title" => "inputregulasi",
        ]);
    }
    public function storeregulasi(Request $request)
    {

        $data = [
            'perwal' => $request->peraturan,
            'tanggal' => $request->inputdate,
            'link' => $request->link,
            'deskripsi' => $request->deskripsi,
        ];

        RegulasiModel::create($data);
        return redirect()->route('admin.inputregulasi')->with('success', 'Regulasi Berhasil Ditambahkan.');
    }

    public function tableregulasi()
    {
        $data = RegulasiModel::get();
        return view('tableregulasi', [
            'data' => $data,
            "title" => "tableregulasi",
        ]);
    }
    public function editregulasi($id)
    {
        $data = RegulasiModel::where('id', $id)->get()->toArray();
        return view('editregulasi', [
            'data' => $data,
            "title" => "editregulasi",
        ]);
    }
    public function updateregulasi(Request $request, $id)
    {
        // dd($request->all());
        $regulasi = RegulasiModel::findOrFail($id);
        // Handle the file upload

        // Prepare the data for update
        $data = [
            'perwal' => $request->peraturan,
            'tanggal' => $request->inputdate,
            'link' => $request->link,
            'deskripsi' => $request->deskripsi,
        ];


        $regulasi->update($data);
        return redirect()->route('admin.tableregulasi')->with('success', 'Data Regulasi Berhasil Diperbarui');
    }

    public function hapusregulasi($id)
    {
        RegulasiModel::where('id', $id)->delete();
        // Mendapatkan data dari TableAssesment dengan jenis yang sesuai dengan $id
        return redirect()->route('admin.tableregulasi')->with('success', 'Data Regulasi Berhasil Dihapus');
    }
    //end regulasi =============================================================================================

    // ProfileUser ========================================================================================
    public function profileuser()
    {
        $data = auth()->user();
        return view('profileuser', [
            'data' => $data,
            "title" => "profileuser",
        ]);
    }

    public function updateprofile(Request $request, $id)
    {
        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'nullable|string|min:8',
        ]);
        $user = User::findOrFail($id);
        // Prepare the data for update
        $data = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);
        return redirect()->route('admin.profileuser', ['id' => $id])->with('success', 'Profil User Berhasil Diperbarui');
    }
    public function registeradmin()
    {
        return view('registeradmin', [
            "title" => "registeradmin",
        ]);
    }
    public function storeadmin(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ];
        $user = User::create($data);

        if ($user) {
            return redirect()->route('admin.tableadmin')->with('success', 'Berhasil Menambahkan Akun');
        } else {
            return redirect()->route('admin.tableadmin')->with('failed', 'Akun Gagal Ditambahkan');
        }
    }
    public function tableadmin()
    {
        $data = User::get();
        return view('tableadmin', [
            'data' => $data,
            "title" => "tableadmin",
        ]);
    }

    // endprofileuser======================================================================================

    //Data Pilar =======================================================================================
    public function forminputpilar()
    {
        return view('forminputpilar', [
            "title" => "forminputpilar",
        ]);
    }
    public function forminputpilar2()
    {
        return view('inputdata.forminputpilar', [
            "title" => "forminputpilar2",
        ]);
    }

    public function storepilar(Request $request)
    {
        $inputdate = $request->input('inputdate');
        $operator = $request->input('operator');
        $easts = $request->input('East');
        $souths = $request->input('South');
        $nopilars = $request->input('NoPilar');
        $northings = $request->input('Northing');
        $eastings = $request->input('Easting');
        $ups = $request->input('Up');
        $geoms = $request->input('geom');

        for ($i = 0; $i < count($easts); $i++) {
            // Buat model baru atau lakukan penyimpanan ke database
            $data = new PilarModel();
            $data->tanggal = $inputdate;
            $data->operator = $operator;
            $data->east = $easts[$i];
            $data->south = $souths[$i];
            $data->nopilar = $nopilars[$i];
            $data->northing = $northings[$i];
            $data->easting = $eastings[$i];
            $data->up = $ups[$i];
            $data->geom = $geoms[$i];
            $data->save();
        }

        // Mengarahkan pengguna kembali ke halaman tableassesment dengan menyertakan parameter id
        return redirect()->route('admin.forminputpilar')->with('success', 'Data Pilar Berhasil Ditambahkan.');
    }

    public function storepilar2(Request $request)
    {

        $inputdate = $request->input('inputdate');
        $operator = $request->input('operator');
        $kemantrens = $request->input('kemantren');
        $kelurahans = $request->input('kelurahan');
        $kondisis = $request->input('kondisi');
        $easts = $request->input('east');
        $souths = $request->input('south');
        $nopilars = $request->input('nopilar');
        $northings = $request->input('northing');
        $eastings = $request->input('easting');
        $ups = $request->input('up');
        $peraturans = $request->input('peraturan');
        $perbatasans = $request->input('perbatasan');
        $alamats = $request->input('alamat');
        $pembuatans = $request->input('pembuatan');
        $pemeliharaans = $request->input('pemeliharaan');
        $beritaacaras = $request->input('beritaacara');
        $geoms = $request->input('geom');

        for ($i = 0; $i < count($easts); $i++) {
            // Buat model baru atau lakukan penyimpanan ke database
            $data = new PilarModel();
            $data->tanggal = $inputdate;
            $data->operator = $operator;
            $data->kemantren = $kemantrens[$i];
            $data->kelurahan = $kelurahans[$i];
            $data->kondisi = $kondisis[$i];
            $data->east = $easts[$i];
            $data->south = $souths[$i];
            $data->nopilar = $nopilars[$i];
            $data->northing = $northings[$i];
            $data->easting = $eastings[$i];
            $data->up = $ups[$i];
            $data->peraturan = $peraturans[$i];
            $data->perbatasan = $perbatasans[$i];
            $data->alamat = $alamats[$i];
            $data->pembuatan = $pembuatans[$i];
            $data->pemeliharaan = $pemeliharaans[$i];
            $data->beritaacara = $beritaacaras[$i];
            $data->geom = $geoms[$i];
            $data->save();
        }

        // Mengarahkan pengguna kembali ke halaman tableassesment dengan menyertakan parameter id
        return redirect()->route('admin.forminputpilar2')->with('success', 'Data Pilar Berhasil Ditambahkan.');
    }

    public function formeditpilar($id)
    {
        $data = PilarModel::where('gid', $id)->get()->toArray();
        return view('formeditpilar', [
            'data' => $data,
            "title" => "formeditpilar",
        ]);
    }

    public function updatepilar(Request $request, $id)
    {
        // dd($request->all());
        $fotopilar = PilarModel::findOrFail($id);
        // Handle the file upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $foto_dir = 'upload/foto/';

            if (!is_dir($foto_dir)) {
                mkdir($foto_dir, 0755, true);
            }

            // Delete the old photo if it exists
            if ($fotopilar->foto) {
                $old_foto_path = $foto_dir . $fotopilar->foto;
                if (file_exists($old_foto_path)) {
                    unlink($old_foto_path);
                }
            }

            $nama_foto = 'foto_' . str_replace(' ', '_', pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();

            // Move the new file
            $file->move($foto_dir, $nama_foto);
        } else {
            $nama_foto = $fotopilar->foto; // Keep the old photo if no new one is uploaded
        }

        // Prepare the data for update
        $data = [
            'tanggal' => $request->inputdate,
            'operator' => $request->operator,
            'kemantren' => $request->kemantren,
            'kelurahan' => $request->kelurahan,
            'kondisi' => $request->kondisi,
            'east' => $request->east,
            'south' => $request->south,
            'nopilar' => $request->nopilar,
            'northing' => $request->northing,
            'easting' => $request->easting,
            'up' => $request->ketinggian,
            'peraturan' => $request->peraturan,
            'perbatasan' => $request->perbatasan,
            'alamat' => $request->alamat,
            'pembuatan' => $request->pembuatan,
            'pemeliharaan' => $request->pemeliharaan,
            'beritaacara' => $request->beritaacara,
            'foto' => $nama_foto,
        ];


        $fotopilar->update($data);
        return redirect()->route('admin.tablerecappilar')->with('success', 'Data Pilar Berhasil Diperbarui.');
    }

    public function hapuspilar($id)
    {
        // Temukan data pilar berdasarkan ID
        $fotopilar = PilarModel::where('gid', $id)->first();

        if ($fotopilar) {
            // Hapus file foto jika ada
            $foto_dir = 'upload/foto/';
            $foto_path = $foto_dir . $fotopilar->foto;

            if ($fotopilar->foto && file_exists($foto_path)) {
                unlink($foto_path);
            }

            // Hapus data pilar dari database
            PilarModel::where('gid', $id)->delete();
        }

        return redirect()->route('admin.tablerecappilar')->with('success', 'Data Pilar Berhasil Dihapus');
    }


    public function hapussemuapilar()
    {
        $foto_dir = 'upload/foto/';

        // Hapus semua file foto yang ada di folder
        $files = glob($foto_dir . '*'); // Dapatkan semua file di direktori

        foreach ($files as $file) {
            if (is_file($file)) {
                unlink($file); // Hapus file
            }
        }
        // Hapus semua data pilar dari database
        PilarModel::truncate();
        DB::statement("ALTER SEQUENCE pilarbatas_gid_seq RESTART WITH 1");

        return redirect()->route('admin.tablerecappilar')->with('success', 'Semua Data Pilar Berhasil Dihapus');
    }
    public function hapushistorispilar($id)
    {
        HistorisPilarModel::where('gid', $id)->delete();
        // Mendapatkan data dari TableAssesment dengan jenis yang sesuai dengan $id
        return redirect()->route('admin.historistablerecappilar')->with('success', 'Data Pilar Historis Berhasil Dihapus');
    }
    public function hapussemuahistorispilar()
    {
        HistorisPilarModel::truncate();
        DB::statement("ALTER SEQUENCE historispilar_gid_seq RESTART WITH 1");
        return redirect()->route('admin.historistablerecappilar')->with('success', 'Semua Data Pilar Historis Berhasil Dihapus');
    }

    public function tablerecappilar()
    {
        $data = PilarModel::get();
        return view('tablerecappilar', [
            'data' => $data,
            "title" => "tablerecappilar",
        ]);
    }
    public function historistablerecappilar()
    {
        $data = HistorisPilarModel::get();
        return view('historis.tablerecappilar', [
            'data' => $data,
            "title" => "historistablerecappilar",
        ]);
    }

    public function kirimpilar($id)
    {
        $datapilar = PilarModel::where('gid', $id)->first();

        if ($datapilar) {
            // Menetapkan ID baru dari sequence
            $newId = DB::select("SELECT nextval('historispilar_gid_seq') AS gid")[0]->gid;

            // Siapkan data untuk disimpan ke dalam HistorisPilarModel
            $data = [
                'gid' => $newId,
                'tanggal' => $datapilar->inputdate,
                'operator' => $datapilar->operator,
                'kemantren' => $datapilar->kemantren,
                'kelurahan' => $datapilar->kelurahan,
                'kondisi' => $datapilar->kondisi,
                'east' => $datapilar->east,
                'south' => $datapilar->south,
                'nopilar' => $datapilar->nopilar,
                'northing' => $datapilar->northing,
                'easting' => $datapilar->easting,
                'up' => $datapilar->ketinggian,
                'peraturan' => $datapilar->peraturan,
                'perbatasan' => $datapilar->perbatasan,
                'alamat' => $datapilar->alamat,
                'pembuatan' => $datapilar->pembuatan,
                'pemeliharaan' => $datapilar->pemeliharaan,
                'beritaacara' => $datapilar->beritaacara,
                'foto' => $datapilar->foto,
            ];

            // Simpan data ke dalam HistorisPilarModel
            HistorisPilarModel::create($data);

            // Hapus data dari PilarModel
            $datapilar->delete();

            return redirect()->route('admin.tablerecappilar')->with('success', 'Data Pilar Berhasil Terkirim');
        } else {
            return redirect()->route('admin.tablerecappilar')->with('failed', 'Data Pilar Gagal Dikirm');
        }
    }

    public function mapspilar()
    {
        return view('mapspilar', [
            "title" => "mapspilar",
        ]);
    }

    //End Pilar===============================================================

    //Controller Batas Kota Jogja ============================================
    public function forminputkota()
    {
        return view('forminputkota', [
            "title" => "forminputkota",
        ]);
    }
    public function forminputkota2()
    {
        return view('inputdata.forminputkota', [
            "title" => "forminputkota2",
        ]);
    }

    public function storekota(Request $request)
    {
        $inputdate = $request->input('inputdate');
        $operator = $request->input('operator');
        $NAMOBJ = $request->input('NAMOBJ');
        $SRSID = $request->input('SRSID');
        $KDPKAB = $request->input('KDPKAB');
        $geoms = $request->input('geom');

        for ($i = 0; $i < count($NAMOBJ); $i++) {
            // Buat model baru atau lakukan penyimpanan ke database
            $data = new KotaModel();
            $data->tanggal = $inputdate;
            $data->operator = $operator;
            $data->kota = $NAMOBJ[$i];
            $data->srsid = $SRSID[$i];
            $data->kodekota = $KDPKAB[$i];
            $data->geom = $geoms[$i];
            $data->save();
        }

        // Mengarahkan pengguna kembali ke halaman tableassesment dengan menyertakan parameter id
        return redirect()->route('admin.forminputkota')->with('success', 'Data Kota Berhasil Ditambahkan');
    }

    public function storekota2(Request $request)
    {
        $inputdate = $request->input('inputdate');
        $operator = $request->input('operator');
        $kota = $request->input('kota');
        $srsid = $request->input('srsid');
        $kodekota = $request->input('kodekota');
        $peraturan = $request->input('peraturan');
        $batasutara = $request->input('batasutara');
        $batastimur = $request->input('batastimur');
        $batasselatan = $request->input('batasselatan');
        $batasbarat = $request->input('batasbarat');
        $beritaacara = $request->input('beritaacara');
        $geoms = $request->input('geom');

        for ($i = 0; $i < count($kota); $i++) {
            // Buat model baru atau lakukan penyimpanan ke database
            $data = new KotaModel();
            $data->tanggal = $inputdate;
            $data->operator = $operator;
            $data->kota = $kota[$i];
            $data->srsid = $srsid[$i];
            $data->peraturan = $peraturan[$i];
            $data->batasutara = $batasutara[$i];
            $data->batastimur = $batastimur[$i];
            $data->batasselatan = $batasselatan[$i];
            $data->batasbarat = $batasbarat[$i];
            $data->beritaacara = $beritaacara[$i];
            $data->kodekota = $kodekota[$i];
            $data->geom = $geoms[$i];
            $data->save();
        }

        // Mengarahkan pengguna kembali ke halaman tableassesment dengan menyertakan parameter id
        return redirect()->route('admin.forminputkota2')->with('success', 'Data Kota Berhasil Ditambahkan');
    }
    public function tablerecapkota()
    {
        $data = KotaModel::get();
        return view('tablerecapkota', [
            'data' => $data,
            "title" => "tablerecapkota",
        ]);
    }
    public function historistablerecapkota()
    {
        $data = HistorisKotaModel::get();
        return view('historis.tablerecapkota', [
            'data' => $data,
            "title" => "historistablerecapkota",
        ]);
    }

    public function formeditkota($id)
    {
        $data = KotaModel::where('gid', $id)->get()->toArray();
        return view('formeditkota', [
            'data' => $data,
            "title" => "formeditkota",
        ]);
    }

    public function updatekota(Request $request, $id)
    {
        // dd($request->all());
        $kemantren = KotaModel::findOrFail($id);
        // Handle the file upload

        // Prepare the data for update
        $data = [
            'tanggal' => $request->inputdate,
            'operator' => $request->operator,
            'kota' => $request->kota,
            'srsid' => $request->srsid,
            'kodekota' => $request->kodekota,
            'peraturan' => $request->peraturan,
            'beritaacara' => $request->beritaacara,
            'batasutara' => $request->batasutara,
            'batastimur' => $request->batastimur,
            'batasselatan' => $request->batasselatan,
            'batasbarat' => $request->batasbarat,
            'geom' => $request->geom,
        ];


        $kemantren->update($data);
        return redirect()->route('admin.tablerecapkota')->with('success', 'Data Kota Berhasil Diperbarui');
    }
    public function hapuskota($id)
    {
        KotaModel::where('gid', $id)->delete();
        // Mendapatkan data dari TableAssesment dengan jenis yang sesuai dengan $id
        return redirect()->route('admin.tablerecapkota')->with('success', 'Data Kota Berhasil Dihapus');
    }
    public function hapussemuakota()
    {
        KotaModel::truncate();
        DB::statement("ALTER SEQUENCE kota_gid_seq RESTART WITH 1");
        return redirect()->route('admin.tablerecapkota')->with('success', 'Semua Data Kota Berhasil Dihapus');
    }
    public function hapushistoriskota($id)
    {
        HistorisKotaModel::where('gid', $id)->delete();
        // Mendapatkan data dari TableAssesment dengan jenis yang sesuai dengan $id
        return redirect()->route('admin.historistablerecapkota')->with('success', 'Data Historis Kota Berhasil Dihapus');
    }
    public function hapussemuahistoriskota()
    {
        HistorisKotaModel::truncate();
        DB::statement("ALTER SEQUENCE historiskota_gid_seq RESTART WITH 1");
        return redirect()->route('admin.historistablerecapkota')->with('success', 'Semua Data Historis Kota Berhasil Dihapus');
    }
    public function kirimkota($id)
    {
        $datakota = KotaModel::where('gid', $id)->first();

        if ($datakota) {
            // Menetapkan ID baru dari sequence
            $newId = DB::select("SELECT nextval('historiskota_gid_seq') AS gid")[0]->gid;

            // Siapkan data untuk disimpan ke dalam HistorisKotaModel
            $data = [
                'gid' => $newId,
                'tanggal' => $datakota->inputdate,
                'operator' => $datakota->operator,
                'kota' => $datakota->kota,
                'srsid' => $datakota->srsid,
                'kodekota' => $datakota->kodekota,
                'peraturan' => $datakota->peraturan,
                'beritaacara' => $datakota->beritaacara,
                'batasutara' => $datakota->batasutara,
                'batastimur' => $datakota->batastimur,
                'batasselatan' => $datakota->batasselatan,
                'batasbarat' => $datakota->batasbarat,
                'geom' => $datakota->geom,
            ];

            // Simpan data ke dalam HistorisKotaModel
            HistorisKotaModel::create($data);

            // Hapus data dari KotaModel
            $datakota->delete();

            return redirect()->route('admin.tablerecapkota')->with('success', 'Data Kota Berhasil Dikirim');
        } else {
            return redirect()->route('admin.tablerecapkota')->with('failed', 'Data Kota Gagal Dikirim');
        }
    }

    public function mapskota()
    {
        return view('mapskota', [
            "title" => "mapskota",
        ]);
    }

    //end batas kota ===========================================================

    //Controller Batas Kemantren ===============================================
    public function forminputkemantren()
    {
        return view('forminputkemantren', [
            "title" => "forminputkemantren",
        ]);
    }
    public function forminputkemantren2()
    {
        return view('inputdata.forminputkemantren', [
            "title" => "forminputkemantren2",
        ]);
    }

    public function storekemantren(Request $request)
    {
        $inputdate = $request->input('inputdate');
        $operator = $request->input('operator');
        $NAMOBJ = $request->input('NAMOBJ');
        $WADMKK = $request->input('WADMKK');
        $SRSID = $request->input('SRSID');
        $KDCPUM = $request->input('KDCPUM');
        $geoms = $request->input('geom');

        for ($i = 0; $i < count($NAMOBJ); $i++) {
            // Buat model baru atau lakukan penyimpanan ke database
            $data = new KemantrenModel();
            $data->tanggal = $inputdate;
            $data->operator = $operator;
            $data->kemantren = $NAMOBJ[$i];
            $data->kota = $WADMKK[$i];
            $data->srsid = $SRSID[$i];
            $data->kodekecamatan = $KDCPUM[$i];
            $data->geom = $geoms[$i];
            $data->save();
        }

        // Mengarahkan pengguna kembali ke halaman tableassesment dengan menyertakan parameter id
        return redirect()->route('admin.forminputkemantren')->with('success', 'Data Kemantren Berhasil Ditambahkan');
    }

    public function storekemantren2(Request $request)
    {
        $inputdate = $request->input('inputdate');
        $operator = $request->input('operator');
        $kemantren = $request->input('kemantren');
        $kota = $request->input('kota');
        $srsid = $request->input('srsid');
        $kodekecamatan = $request->input('kodekecamatan');
        $peraturan = $request->input('peraturan');
        $batasutara = $request->input('batasutara');
        $batastimur = $request->input('batastimur');
        $batasselatan = $request->input('batasselatan');
        $batasbarat = $request->input('batasbarat');
        $beritaacara = $request->input('beritaacara');
        $geoms = $request->input('geom');

        for ($i = 0; $i < count($kemantren); $i++) {
            // Buat model baru atau lakukan penyimpanan ke database
            $data = new KemantrenModel();
            $data->tanggal = $inputdate;
            $data->operator = $operator;
            $data->kemantren = $kemantren[$i];
            $data->kota = $kota[$i];
            $data->srsid = $srsid[$i];
            $data->kodekecamatan = $kodekecamatan[$i];
            $data->peraturan = $peraturan[$i];
            $data->batasutara = $batasutara[$i];
            $data->batastimur = $batastimur[$i];
            $data->batasselatan = $batasselatan[$i];
            $data->batasbarat = $batasbarat[$i];
            $data->beritaacara = $beritaacara[$i];
            $data->geom = $geoms[$i];
            $data->save();
        }

        // Mengarahkan pengguna kembali ke halaman tableassesment dengan menyertakan parameter id
        return redirect()->route('admin.forminputkemantren2')->with('success', 'Data Kemantren Berhasil Ditambahkan');
    }

    public function tablerecapkemantren()
    {
        $data = KemantrenModel::get();
        return view('tablerecapkemantren', [
            'data' => $data,
            "title" => "tablerecapkemantren",
        ]);
    }

    public function historistablerecapkemantren()
    {
        $data = HistorisKemantrenModel::get();
        return view('historis.tablerecapkemantren', [
            'data' => $data,
            "title" => "historistablerecapkemantren",
        ]);
    }
    public function mapskemantren()
    {
        return view('mapskemantren', [
            "title" => "mapskemantren",
        ]);
    }

    public function formeditkemantren($id)
    {
        $data = KemantrenModel::where('gid', $id)->get()->toArray();
        return view('formeditkemantren', [
            'data' => $data,
            "title" => "formeditkemantren",
        ]);
    }

    public function updatekemantren(Request $request, $id)
    {
        // dd($request->all());
        $kemantren = KemantrenModel::findOrFail($id);
        // Handle the file upload

        // Prepare the data for update
        $data = [
            'tanggal' => $request->inputdate,
            'operator' => $request->operator,
            'kemantren' => $request->kemantren,
            'kota' => $request->kota,
            'srsid' => $request->srsid,
            'kodekecamatan' => $request->kodekecamatan,
            'peraturan' => $request->peraturan,
            'beritaacara' => $request->beritaacara,
            'batasutara' => $request->batasutara,
            'batastimur' => $request->batastimur,
            'batasselatan' => $request->batasselatan,
            'batasbarat' => $request->batasbarat,
            'geom' => $request->geom,
        ];


        $kemantren->update($data);
        return redirect()->route('admin.tablerecapkemantren')->with('success', 'Data Kemantren Berhasil Diperbarui');
    }
    public function hapuskemantren($id)
    {
        KemantrenModel::where('gid', $id)->delete();
        // Mendapatkan data dari TableAssesment dengan jenis yang sesuai dengan $id
        return redirect()->route('admin.tablerecapkemantren')->with('success', 'Data Kemantren Berhasil Dihapus');
    }
    public function hapussemuakemantren()
    {
        KemantrenModel::truncate();
        DB::statement("ALTER SEQUENCE kemantren_gid_seq RESTART WITH 1");
        return redirect()->route('admin.tablerecapkemantren')->with('success', 'Semua Data Kemantren Berhasil Dihapus');
    }
    public function hapushistoriskemantren($id)
    {
        HistorisKemantrenModel::where('gid', $id)->delete();
        // Mendapatkan data dari TableAssesment dengan jenis yang sesuai dengan $id
        return redirect()->route('admin.historistablerecapkemantren')->with('success', 'Data Historis Kemantren Berhasil Dihapus');
    }
    public function hapussemuahistoriskemantren()
    {
        HistorisKemantrenModel::truncate();
        DB::statement("ALTER SEQUENCE historiskemantren_gid_seq RESTART WITH 1");
        return redirect()->route('admin.historistablerecapkemantren')->with('success', 'Semua Data Historis Kemantren Berhasil Dihapus.');
    }

    public function kirimkemantren($id)
    {
        // Ambil data dari KemantrenModel berdasarkan ID
        $datakemantren = KemantrenModel::where('gid', $id)->first();

        if ($datakemantren) {
            // Menetapkan ID baru dari sequence
            $newId = DB::select("SELECT nextval('historiskemantren_gid_seq') AS gid")[0]->gid;

            // Siapkan data untuk disimpan ke dalam HistorisKemantrenModel
            $data = [
                'gid' => $newId,
                'tanggal' => $datakemantren->inputdate,
                'operator' => $datakemantren->operator,
                'kemantren' => $datakemantren->kemantren,
                'kota' => $datakemantren->kota,
                'srsid' => $datakemantren->srsid,
                'kodekecamatan' => $datakemantren->kodekecamatan,
                'peraturan' => $datakemantren->peraturan,
                'beritaacara' => $datakemantren->beritaacara,
                'batasutara' => $datakemantren->batasutara,
                'batastimur' => $datakemantren->batastimur,
                'batasselatan' => $datakemantren->batasselatan,
                'batasbarat' => $datakemantren->batasbarat,
                'geom' => $datakemantren->geom,
            ];

            // Simpan data ke dalam HistorisKemantrenModel
            HistorisKemantrenModel::create($data);

            // Hapus data dari KemantrenModel
            $datakemantren->delete();

            return redirect()->route('admin.tablerecapkemantren')->with('success', 'Data Kemantren Berhasil Dikirim');
        } else {
            return redirect()->route('admin.tablerecapkemantren')->with('failed', 'Data Kemantren tidak ditemukan');
        }
    }
    //End Kemantren ==============================================================================

    //Controller Batas Kelurahan ==================================================================
    public function forminputkelurahan()
    {
        return view('forminputkelurahan', [
            "title" => "forminputkelurahan",
        ]);
    }
    public function forminputkelurahan2()
    {
        return view('inputdata.forminputkelurahan', [
            "title" => "forminputkelurahan2",
        ]);
    }

    public function storekelurahan(Request $request)
    {
        $inputdate = $request->input('inputdate');
        $operator = $request->input('operator');
        $NAMOBJ = $request->input('NAMOBJ');
        $WADMKC = $request->input('WADMKC');
        $WADMKK = $request->input('WADMKK');
        $SRSID = $request->input('SRSID');
        $KDCPUM = $request->input('KDCPUM');
        $KDEPUM = $request->input('KDEPUM');
        $geoms = $request->input('geom');

        for ($i = 0; $i < count($NAMOBJ); $i++) {
            // Buat model baru atau lakukan penyimpanan ke database
            $data = new KelurahanModel();
            $data->tanggal = $inputdate;
            $data->operator = $operator;
            $data->kelurahan = $NAMOBJ[$i];
            $data->kemantren = $WADMKC[$i];
            $data->kota = $WADMKK[$i];
            $data->srsid = $SRSID[$i];
            $data->kodekecamatan = $KDCPUM[$i];
            $data->kodekelurahan = $KDEPUM[$i];
            $data->geom = $geoms[$i];
            $data->save();
        }

        // Mengarahkan pengguna kembali ke halaman tableassesment dengan menyertakan parameter id
        return redirect()->route('admin.forminputkelurahan')->with('success', 'Data Kelurahan Berhasil Ditambahkan');
    }

    public function storekelurahan2(Request $request)
    {
        $inputdate = $request->input('inputdate');
        $operator = $request->input('operator');
        $kelurahan = $request->input('kelurahan');
        $kemantren = $request->input('kemantren');
        $kota = $request->input('kota');
        $srsid = $request->input('srsid');
        $kodekecamatan = $request->input('kodekecamatan');
        $kodekelurahan = $request->input('kodekelurahan');
        $peraturan = $request->input('peraturan');
        $batasutara = $request->input('batasutara');
        $batastimur = $request->input('batastimur');
        $batasselatan = $request->input('batasselatan');
        $batasbarat = $request->input('batasbarat');
        $beritaacara = $request->input('beritaacara');
        $geoms = $request->input('geom');

        for ($i = 0; $i < count($kelurahan); $i++) {
            // Buat model baru atau lakukan penyimpanan ke database
            $data = new KelurahanModel();
            $data->tanggal = $inputdate;
            $data->operator = $operator;
            $data->kelurahan = $kelurahan[$i];
            $data->kemantren = $kemantren[$i];
            $data->kota = $kota[$i];
            $data->srsid = $srsid[$i];
            $data->kodekecamatan = $kodekecamatan[$i];
            $data->kodekelurahan = $kodekelurahan[$i];
            $data->peraturan = $peraturan[$i];
            $data->batasutara = $batasutara[$i];
            $data->batastimur = $batastimur[$i];
            $data->batasselatan = $batasselatan[$i];
            $data->batasbarat = $batasbarat[$i];
            $data->beritaacara = $beritaacara[$i];
            $data->geom = $geoms[$i];
            $data->save();
        }

        // Mengarahkan pengguna kembali ke halaman tableassesment dengan menyertakan parameter id
        return redirect()->route('admin.forminputkelurahan2')->with('success', 'Data Kelurahan Berhasil Ditambahkan');
    }


    public function tablerecapkelurahan()
    {
        $data = KelurahanModel::get();
        return view('tablerecapkelurahan', [
            'data' => $data,
            "title" => "tablerecapkelurahan",
        ]);
    }
    public function historistablerecapkelurahan()
    {
        $data = HistorisKelurahanModel::get();
        return view('historis.tablerecapkelurahan', [
            'data' => $data,
            "title" => "historistablerecapkelurahan",
        ]);
    }
    public function formeditkelurahan($id)
    {
        $data = KelurahanModel::where('gid', $id)->get()->toArray();
        return view('formeditkelurahan', [
            'data' => $data,
            "title" => "formeditkelurahan",
        ]);
    }

    public function updatekelurahan(Request $request, $id)
    {
        // dd($request->all());
        $kelurahan = KelurahanModel::findOrFail($id);
        // Handle the file upload

        // Prepare the data for update
        $data = [
            'tanggal' => $request->inputdate,
            'operator' => $request->operator,
            'kelurahan' => $request->kelurahan,
            'kemantren' => $request->kemantren,
            'kota' => $request->kota,
            'srsid' => $request->srsid,
            'kodekecamatan' => $request->kodekecamatan,
            'kodekelurahan' => $request->kodekelurahan,
            'peraturan' => $request->peraturan,
            'beritaacara' => $request->beritaacara,
            'batasutara' => $request->batasutara,
            'batastimur' => $request->batastimur,
            'batasselatan' => $request->batasselatan,
            'batasbarat' => $request->batasbarat,
            'geom' => $request->geom,
        ];


        $kelurahan->update($data);
        return redirect()->route('admin.tablerecapkelurahan')->with('success', 'Data Kelurahan Perhasil Diperbarui');
    }
    public function hapuskelurahan($id)
    {
        KelurahanModel::where('gid', $id)->delete();
        // Mendapatkan data dari TableAssesment dengan jenis yang sesuai dengan $id
        return redirect()->route('admin.tablerecapkelurahan')->with('success', 'Data Kelurahan Berhasil Dihapus');
    }
    public function hapussemuakelurahan()
    {
        KelurahanModel::truncate();
        DB::statement("ALTER SEQUENCE kelurahan_gid_seq RESTART WITH 1");
        return redirect()->route('admin.tablerecapkelurahan')->with('success', 'Semua Data Kelurahan Berhasil Dihapus');
    }
    public function hapushistoriskelurahan($id)
    {
        HistorisKelurahanModel::where('gid', $id)->delete();
        // Mendapatkan data dari TableAssesment dengan jenis yang sesuai dengan $id
        return redirect()->route('admin.historistablerecapkelurahan')->with('success', 'Data Historis Kelurahan Berhasil Dihapus');
    }
    public function hapussemuahistoriskelurahan()
    {
        HistorisKelurahanModel::truncate();
        DB::statement("ALTER SEQUENCE historiskelurahan_gid_seq RESTART WITH 1");
        return redirect()->route('admin.historistablerecapkelurahan')->with('success', 'Semua Data Historis Kelurahan Berhasil Dihapus');
    }
    public function mapskelurahan()
    {
        return view('mapskelurahan', [
            "title" => "mapskelurahan",
        ]);
    }

    public function kirimkelurahan($id)
    {
        // Ambil data dari KelurahanModel berdasarkan ID
        $datakelurahan = KelurahanModel::where('gid', $id)->first();

        if ($datakelurahan) {
            // Menetapkan ID baru dari sequence
            $newId = DB::select("SELECT nextval('historiskelurahan_gid_seq') AS gid")[0]->gid;

            // Siapkan data untuk disimpan ke dalam HistorisKelurahanModel
            $data = [
                'gid' => $newId,
                'tanggal' => $datakelurahan->inputdate,
                'operator' => $datakelurahan->operator,
                'kelurahan' => $datakelurahan->kelurahan,
                'kemantren' => $datakelurahan->kemantren,
                'kota' => $datakelurahan->kota,
                'srsid' => $datakelurahan->srsid,
                'kodekecamatan' => $datakelurahan->kodekecamatan,
                'kodekelurahan' => $datakelurahan->kodekelurahan,
                'peraturan' => $datakelurahan->peraturan,
                'beritaacara' => $datakelurahan->beritaacara,
                'batasutara' => $datakelurahan->batasutara,
                'batastimur' => $datakelurahan->batastimur,
                'batasselatan' => $datakelurahan->batasselatan,
                'batasbarat' => $datakelurahan->batasbarat,
                'geom' => $datakelurahan->geom,
            ];

            // Simpan data ke dalam HistorisKelurahanModel
            HistorisKelurahanModel::create($data);

            // Hapus data dari KelurahanModel
            $datakelurahan->delete();

            return redirect()->route('admin.tablerecapkelurahan')->with('success', 'Data Kelurahan Berhasil Dikirim');
        } else {
            return redirect()->route('admin.tablerecapkelurahan')->with('failed', 'Data Kelurahan tidak ditemukan');
        }
    }

    //end kelurahan =======================================================================================

    //Controller Batas RW =============================================================================
    public function forminputrw()
    {
        return view('forminputrw', [
            "title" => "forminputrw",
        ]);
    }
    public function forminputrw2()
    {
        return view('inputdata.forminputrw', [
            "title" => "forminputrw2",
        ]);
    }

    public function storerw(Request $request)
    {
        $inputdate = $request->input('inputdate');
        $operator = $request->input('operator');
        $NAMOBJ = $request->input('NAMOBJ');
        $WADMKC = $request->input('WADMKC');
        $WADMKK = $request->input('WADMKK');
        $SRSID = $request->input('SRSID');
        $KDCPUM = $request->input('KDCPUM');
        $KDEPUM = $request->input('KDEPUM');
        $WADRW = $request->input('WADRW');
        $geoms = $request->input('geom');

        for ($i = 0; $i < count($NAMOBJ); $i++) {
            // Buat model baru atau lakukan penyimpanan ke database
            $data = new RwModel();
            $data->tanggal = $inputdate;
            $data->operator = $operator;
            $data->kelurahan = $NAMOBJ[$i];
            $data->kemantren = $WADMKC[$i];
            $data->kota = $WADMKK[$i];
            $data->srsid = $SRSID[$i];
            $data->kodekecamatan = $KDCPUM[$i];
            $data->kodekelurahan = $KDEPUM[$i];
            $data->rw = $WADRW[$i];
            $data->geom = $geoms[$i];
            $data->save();
        }

        // Mengarahkan pengguna kembali ke halaman tableassesment dengan menyertakan parameter id
        return redirect()->route('admin.forminputrw')->with('success', 'Data RW Berhasil Ditambahkan');
    }
    public function storerw2(Request $request)
    {
        $inputdate = $request->input('inputdate');
        $operator = $request->input('operator');
        $kelurahan = $request->input('kelurahan');
        $kemantren = $request->input('kemantren');
        $kota = $request->input('kota');
        $srsid = $request->input('srsid');
        $kodekecamatan = $request->input('kodekecamatan');
        $kodekelurahan = $request->input('kodekelurahan');
        $rw = $request->input('rw');
        $peraturan = $request->input('peraturan');
        $batasutara = $request->input('batasutara');
        $batastimur = $request->input('batastimur');
        $batasselatan = $request->input('batasselatan');
        $batasbarat = $request->input('batasbarat');
        $beritaacara = $request->input('beritaacara');
        $geoms = $request->input('geom');

        for ($i = 0; $i < count($kelurahan); $i++) {
            // Buat model baru atau lakukan penyimpanan ke database
            $data = new RwModel();
            $data->tanggal = $inputdate;
            $data->operator = $operator;
            $data->kelurahan = $kelurahan[$i];
            $data->kemantren = $kemantren[$i];
            $data->kota = $kota[$i];
            $data->srsid = $srsid[$i];
            $data->kodekecamatan = $kodekecamatan[$i];
            $data->kodekelurahan = $kodekelurahan[$i];
            $data->rw = $rw[$i];
            $data->peraturan = $peraturan[$i];
            $data->batasutara = $batasutara[$i];
            $data->batastimur = $batastimur[$i];
            $data->batasselatan = $batasselatan[$i];
            $data->batasbarat = $batasbarat[$i];
            $data->beritaacara = $beritaacara[$i];
            $data->geom = $geoms[$i];
            $data->save();
        }

        // Mengarahkan pengguna kembali ke halaman tableassesment dengan menyertakan parameter id
        return redirect()->route('admin.forminputrw2')->with('success', 'Data RW Berhasil Ditambahkan');
    }

    public function tablerecaprw()
    {
        $data = RwModel::get();
        return view('tablerecaprw', [
            'data' => $data,
            "title" => "tablerecaprw",
        ]);
    }
    public function historistablerecaprw()
    {
        $data = HistorisRWModel::get();
        return view('historis.tablerecaprw', [
            'data' => $data,
            "title" => "historistablerecaprw",
        ]);
    }
    public function formeditrw($id)
    {
        $data = RwModel::where('gid', $id)->get()->toArray();
        return view('formeditrw', [
            'data' => $data,
            "title" => "formeditrw",
        ]);
    }

    public function updaterw(Request $request, $id)
    {
        // dd($request->all());
        $kelurahan = RwModel::findOrFail($id);
        // Handle the file upload

        // Prepare the data for update
        $data = [
            'tanggal' => $request->inputdate,
            'operator' => $request->operator,
            'kelurahan' => $request->kelurahan,
            'kemantren' => $request->kemantren,
            'kota' => $request->kota,
            'srsid' => $request->srsid,
            'kodekecamatan' => $request->kodekecamatan,
            'kodekelurahan' => $request->kodekelurahan,
            'rw' => $request->rw,
            'peraturan' => $request->peraturan,
            'beritaacara' => $request->beritaacara,
            'batasutara' => $request->batasutara,
            'batastimur' => $request->batastimur,
            'batasselatan' => $request->batasselatan,
            'batasbarat' => $request->batasbarat,
            'geom' => $request->geom,
        ];


        $kelurahan->update($data);
        return redirect()->route('admin.tablerecaprw')->with('success', 'Data RW Berhasil Diperbarui');
    }
    public function hapusrw($id)
    {
        RwModel::where('gid', $id)->delete();
        // Mendapatkan data dari TableAssesment dengan jenis yang sesuai dengan $id
        return redirect()->route('admin.tablerecaprw')->with('success', 'Data RW Berhasil Dihapus');
    }
    public function hapussemuarw()
    {
        RwModel::truncate();
        DB::statement("ALTER SEQUENCE rw_gid_seq RESTART WITH 1");
        return redirect()->route('admin.tablerecaprw')->with('success', 'Semua Data RW Berhasil Dihapus');
    }

    public function hapushistorisrw($id)
    {
        HistorisRWModel::where('gid', $id)->delete();
        // Mendapatkan data dari TableAssesment dengan jenis yang sesuai dengan $id
        return redirect()->route('admin.historistablerecaprw')->with('success', 'Data Historis RW Berhasil Dihapus');
    }
    public function hapussemuahistorisrw()
    {
        HistorisRWModel::truncate();
        DB::statement("ALTER SEQUENCE historisrw_gid_seq RESTART WITH 1");
        return redirect()->route('admin.historistablerecaprw')->with('success', 'Semua Data Historis RW Berhasil Dihapus');
    }

    public function mapsrw()
    {
        return view('mapsrw', [
            "title" => "mapsrw",
        ]);
    }

    public function kirimrw($id)
    {
        // Ambil data dari RwModel berdasarkan ID
        $datarw = RwModel::where('gid', $id)->first();

        if ($datarw) {
            // Menetapkan ID baru dari sequence
            $newId = DB::select("SELECT nextval('historisrw_gid_seq') AS gid")[0]->gid;

            // Siapkan data untuk disimpan ke dalam HistorisRWModel
            $data = [
                'gid' => $newId,
                'tanggal' => $datarw->inputdate,
                'operator' => $datarw->operator,
                'kelurahan' => $datarw->kelurahan,
                'kemantren' => $datarw->kemantren,
                'kota' => $datarw->kota,
                'srsid' => $datarw->srsid,
                'kodekecamatan' => $datarw->kodekecamatan,
                'kodekelurahan' => $datarw->kodekelurahan,
                'rw' => $datarw->rw,
                'peraturan' => $datarw->peraturan,
                'beritaacara' => $datarw->beritaacara,
                'batasutara' => $datarw->batasutara,
                'batastimur' => $datarw->batastimur,
                'batasselatan' => $datarw->batasselatan,
                'batasbarat' => $datarw->batasbarat,
                'geom' => $datarw->geom,
            ];

            // Simpan data ke dalam HistorisRWModel
            HistorisRWModel::create($data);

            // Hapus data dari RwModel
            $datarw->delete();

            return redirect()->route('admin.tablerecaprw')->with('success', 'Data RW Berhasil Dikirim');
        } else {
            return redirect()->route('admin.tablerecaprw')->with('failed', 'Data RW tidak ditemukan');
        }
    }
    //end RW =========================================================================================
}
