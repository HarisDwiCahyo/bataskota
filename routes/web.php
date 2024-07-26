<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('beranda.home');
// });

//View Luar
Route::get('/', [HomeController::class, 'home'])->name('home');
Route::get('/regulasi', [HomeController::class, 'regulasi'])->name('regulasi');
Route::get('/kontak', [HomeController::class, 'kontak'])->name('kontak');
Route::get('/login', [LoginController::class, 'login'])->name('login');
Route::post('/loginproses', [LoginController::class, 'loginproses'])->name('loginproses');
Route::get('/logout', [LoginController::class, 'logout'])->name('logout');
Route::get('/mainmaps', [HomeController::class, 'mainmaps'])->name('mainmaps');

Route::group(['prefix' => 'admin', 'middleware' => ['auth'], 'as' => 'admin.'], function () {
    Route::get('/homepage', [HomeController::class, 'dashboard'])->name('dashboard');
    Route::get('/profileuser', [HomeController::class, 'profileuser'])->name('profileuser');
    Route::put('/updateprofile/{id}', [HomeController::class, 'updateprofile'])->name('updateprofile');
    Route::get('/registeradmin', [HomeController::class, 'registeradmin'])->name('registeradmin');
    Route::post('/storeadmin', [HomeController::class, 'storeadmin'])->name('storeadmin');
    Route::get('/tableadmin', [HomeController::class, 'tableadmin'])->name('tableadmin');

    Route::get('/inputregulasi', [HomeController::class, 'inputregulasi'])->name('inputregulasi');
    Route::post('/storeregulasi', [HomeController::class, 'storeregulasi'])->name('storeregulasi');
    Route::get('/tableregulasi', [HomeController::class, 'tableregulasi'])->name('tableregulasi');
    Route::get('/editregulasi/{id}', [HomeController::class, 'editregulasi'])->name('editregulasi');
    Route::put('/updateregulasi/{id}', [HomeController::class, 'updateregulasi'])->name('updateregulasi');
    Route::get('/hapusregulasi/{id}', [HomeController::class, 'hapusregulasi'])->name('hapusregulasi');

    Route::get('/forminputpilar', [HomeController::class, 'forminputpilar'])->name('forminputpilar');
    Route::get('/forminputpilar2', [HomeController::class, 'forminputpilar2'])->name('forminputpilar2');
    Route::post('/storepilar', [HomeController::class, 'storepilar'])->name('storepilar');
    Route::post('/storepilar2', [HomeController::class, 'storepilar2'])->name('storepilar2');
    Route::get('/formeditpilar/{id}', [HomeController::class, 'formeditpilar'])->name('formeditpilar');
    Route::put('/updatepilar/{id}', [HomeController::class, 'updatepilar'])->name('updatepilar');
    Route::get('/hapuspilar/{id}', [HomeController::class, 'hapuspilar'])->name('hapuspilar');
    Route::get('/hapussemuapilar', [HomeController::class, 'hapussemuapilar'])->name('hapussemuapilar');
    Route::get('/hapushistorispilar/{id}', [HomeController::class, 'hapushistorispilar'])->name('hapushistorispilar');
    Route::get('/hapussemuahistorispilar', [HomeController::class, 'hapussemuahistorispilar'])->name('hapussemuahistorispilar');
    Route::get('/tablerecappilar', [HomeController::class, 'tablerecappilar'])->name('tablerecappilar');
    Route::get('/historistablerecappilar', [HomeController::class, 'historistablerecappilar'])->name('historistablerecappilar');
    Route::match(['get', 'post'], '/kirimpilar/{id}', [HomeController::class, 'kirimpilar'])->name('kirimpilar');
    Route::get('/mapspilar', [HomeController::class, 'mapspilar'])->name('mapspilar');

    //route batas kota jogja
    Route::get('/forminputkota', [HomeController::class, 'forminputkota'])->name('forminputkota');
    Route::get('/forminputkota2', [HomeController::class, 'forminputkota2'])->name('forminputkota2');
    Route::post('/storekota', [HomeController::class, 'storekota'])->name('storekota');
    Route::post('/storekota2', [HomeController::class, 'storekota2'])->name('storekota2');
    Route::get('/tablerecapkota', [HomeController::class, 'tablerecapkota'])->name('tablerecapkota');
    Route::get('/historistablerecapkota', [HomeController::class, 'historistablerecapkota'])->name('historistablerecapkota');
    Route::get('/formeditkota/{id}', [HomeController::class, 'formeditkota'])->name('formeditkota');
    Route::put('/updatekota/{id}', [HomeController::class, 'updatekota'])->name('updatekota');
    Route::get('/hapuskota/{id}', [HomeController::class, 'hapuskota'])->name('hapuskota');
    Route::get('/hapussemuakota', [HomeController::class, 'hapussemuakota'])->name('hapussemuakota');
    Route::get('/hapushistoriskota/{id}', [HomeController::class, 'hapushistoriskota'])->name('hapushistoriskota');
    Route::get('/hapussemuahistoriskota', [HomeController::class, 'hapussemuahistoriskota'])->name('hapussemuahistoriskota');
    Route::match(['get', 'post'], '/kirimkota/{id}', [HomeController::class, 'kirimkota'])->name('kirimkota');
    Route::get('/mapskota', [HomeController::class, 'mapskota'])->name('mapskota');

    //route batas kemantren
    Route::get('/forminputkemantren', [HomeController::class, 'forminputkemantren'])->name('forminputkemantren');
    Route::get('/forminputkemantren2', [HomeController::class, 'forminputkemantren2'])->name('forminputkemantren2');
    Route::post('/storekemantren', [HomeController::class, 'storekemantren'])->name('storekemantren');
    Route::post('/storekemantren2', [HomeController::class, 'storekemantren2'])->name('storekemantren2');
    Route::get('/formeditkemantren/{id}', [HomeController::class, 'formeditkemantren'])->name('formeditkemantren');
    Route::put('/updatekemantren/{id}', [HomeController::class, 'updatekemantren'])->name('updatekemantren');
    Route::get('/tablerecapkemantren', [HomeController::class, 'tablerecapkemantren'])->name('tablerecapkemantren');
    Route::get('/historistablerecapkemantren', [HomeController::class, 'historistablerecapkemantren'])->name('historistablerecapkemantren');
    Route::get('/hapuskemantren/{id}', [HomeController::class, 'hapuskemantren'])->name('hapuskemantren');
    Route::get('/hapussemuakemantren', [HomeController::class, 'hapussemuakemantren'])->name('hapussemuakemantren');
    Route::get('/hapushistoriskemantren/{id}', [HomeController::class, 'hapushistoriskemantren'])->name('hapushistoriskemantren');
    Route::get('/hapussemuahistoriskemantren', [HomeController::class, 'hapussemuahistoriskemantren'])->name('hapussemuahistoriskemantren');
    Route::match(['get', 'post'], '/kirimkemantren/{id}', [HomeController::class, 'kirimkemantren'])->name('kirimkemantren');
    Route::get('/mapskemantren', [HomeController::class, 'mapskemantren'])->name('mapskemantren');

    //route batas kelurahan
    Route::get('/forminputkelurahan', [HomeController::class, 'forminputkelurahan'])->name('forminputkelurahan');
    Route::get('/forminputkelurahan2', [HomeController::class, 'forminputkelurahan2'])->name('forminputkelurahan2');
    Route::post('/storekelurahan', [HomeController::class, 'storekelurahan'])->name('storekelurahan');
    Route::post('/storekelurahan2', [HomeController::class, 'storekelurahan2'])->name('storekelurahan2');
    Route::get('/tablerecapkelurahan', [HomeController::class, 'tablerecapkelurahan'])->name('tablerecapkelurahan');
    Route::get('/historistablerecapkelurahan', [HomeController::class, 'historistablerecapkelurahan'])->name('historistablerecapkelurahan');
    Route::get('/formeditkelurahan/{id}', [HomeController::class, 'formeditkelurahan'])->name('formeditkelurahan');
    Route::put('/updatekelurahan/{id}', [HomeController::class, 'updatekelurahan'])->name('updatekelurahan');
    Route::get('/hapuskelurahan/{id}', [HomeController::class, 'hapuskelurahan'])->name('hapuskelurahan');
    Route::get('/hapussemuakelurahan', [HomeController::class, 'hapussemuakelurahan'])->name('hapussemuakelurahan');
    Route::get('/hapushistoriskelurahan/{id}', [HomeController::class, 'hapushistoriskelurahan'])->name('hapushistoriskelurahan');
    Route::get('/hapussemuahistoriskelurahan', [HomeController::class, 'hapussemuahistoriskelurahan'])->name('hapussemuahistoriskelurahan');
    Route::match(['get', 'post'], '/kirimkelurahan/{id}', [HomeController::class, 'kirimkelurahan'])->name('kirimkelurahan');
    Route::get('/mapskelurahan', [HomeController::class, 'mapskelurahan'])->name('mapskelurahan');

    //route batas rw
    Route::get('/forminputrw', [HomeController::class, 'forminputrw'])->name('forminputrw');
    Route::get('/forminputrw2', [HomeController::class, 'forminputrw2'])->name('forminputrw2');
    Route::post('/storerw', [HomeController::class, 'storerw'])->name('storerw');
    Route::post('/storerw2', [HomeController::class, 'storerw2'])->name('storerw2');
    Route::get('/tablerecaprw', [HomeController::class, 'tablerecaprw'])->name('tablerecaprw');
    Route::get('/historistablerecaprw', [HomeController::class, 'historistablerecaprw'])->name('historistablerecaprw');
    Route::get('/formeditrw/{id}', [HomeController::class, 'formeditrw'])->name('formeditrw');
    Route::put('/updaterw/{id}', [HomeController::class, 'updaterw'])->name('updaterw');
    Route::get('/hapusrw/{id}', [HomeController::class, 'hapusrw'])->name('hapusrw');
    Route::get('/hapussemuarw', [HomeController::class, 'hapussemuarw'])->name('hapussemuarw');
    Route::get('/hapushistorisrw/{id}', [HomeController::class, 'hapushistorisrw'])->name('hapushistorisrw');
    Route::get('/hapussemuahistorisrw', [HomeController::class, 'hapussemuahistorisrw'])->name('hapussemuahistorisrw');
    Route::match(['get', 'post'], '/kirimrw/{id}', [HomeController::class, 'kirimrw'])->name('kirimrw');
    Route::get('/mapsrw', [HomeController::class, 'mapsrw'])->name('mapsrw');

    //route geojson titik pilar batas
    Route::get('/bataspilar', [HomeController::class, 'bataspilar']);
    Route::get('/historisbataspilar', [HomeController::class, 'historisbataspilar']);
    Route::get('/kota', [HomeController::class, 'kota']);
    Route::get('/historiskota', [HomeController::class, 'historiskota']);
    Route::get('/kecamatan', [HomeController::class, 'kecamatan']);
    Route::get('/historiskecamatan', [HomeController::class, 'historiskecamatan']);
    Route::get('/kelurahan', [HomeController::class, 'kelurahan']);
    Route::get('/historiskelurahan', [HomeController::class, 'historiskelurahan']);
    Route::get('/rw', [HomeController::class, 'rw']);
    Route::get('/historisrw', [HomeController::class, 'historisrw']);
});

Route::get('/bataspilar', [HomeController::class, 'bataspilar']);
Route::get('/kota', [HomeController::class, 'kota']);
Route::get('/kecamatan', [HomeController::class, 'kecamatan']);
Route::get('/kelurahan', [HomeController::class, 'kelurahan']);
Route::get('/rw', [HomeController::class, 'rw']);
