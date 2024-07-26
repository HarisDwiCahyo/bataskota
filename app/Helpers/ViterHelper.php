<?php

namespace App\Helpers;

class ViterHelper
{
    public static function viteAssets($title)
    {
        $manifestPath = public_path('build/manifest.json');
        if (!file_exists($manifestPath)) {
            return [];
        }

        $manifest = json_decode(file_get_contents($manifestPath), true);

        // Daftar aset berdasarkan judul
        $assetsMap = [
            // Pilar
            'forminputpilar' => ['resources/css/forminputpilar.css', 'resources/js/forminputpilar.js'],
            'forminputpilar2' => ['resources/css/forminputpilar2.css', 'resources/js/forminputpilar2.js'],
            'tablerecappilar' => ['resources/css/tablerecappilar.css', 'resources/js/tablerecappilar.js'],
            'historistablerecappilar' => ['resources/css/historistablerecappilar.css', 'resources/js/historistablerecappilar.js'],
            'formeditpilar' => ['resources/css/formeditpilar.css', 'resources/js/formeditpilar.js'],
            'mapspilar' => ['resources/css/mapspilar.css', 'resources/js/mapspilar.js'],
            // Kota Jogja
            'forminputkota' => ['resources/css/forminputkota.css', 'resources/js/forminputkota.js'],
            'forminputkota2' => ['resources/css/forminputkota2.css', 'resources/js/forminputkota2.js'],
            'tablerecapkota' => ['resources/css/tablerecapkota.css', 'resources/js/tablerecapkota.js'],
            'historistablerecapkota' => ['resources/css/historistablerecapkota.css', 'resources/js/historistablerecapkota.js'],
            'formeditkota' => ['resources/css/formeditkota.css', 'resources/js/formeditkota.js'],
            'mapskota' => ['resources/css/mapskota.css', 'resources/js/mapskota.js'],
            // Kemantren
            'forminputkemantren' => ['resources/css/forminputkemantren.css', 'resources/js/forminputkemantren.js'],
            'forminputkemantren2' => ['resources/css/forminputkemantren2.css', 'resources/js/forminputkemantren2.js'],
            'tablerecapkemantren' => ['resources/css/tablerecapkemantren.css', 'resources/js/tablerecapkemantren.js'],
            'historistablerecapkemantren' => ['resources/css/historistablerecapkemantren.css', 'resources/js/historistablerecapkemantren.js'],
            'mapskemantren' => ['resources/css/mapskemantren.css', 'resources/js/mapskemantren.js'],
            'formeditkemantren' => ['resources/css/formeditkemantren.css', 'resources/js/formeditkemantren.js'],
            // Kelurahan
            'forminputkelurahan' => ['resources/css/forminputkelurahan.css', 'resources/js/forminputkelurahan.js'],
            'forminputkelurahan2' => ['resources/css/forminputkelurahan2.css', 'resources/js/forminputkelurahan2.js'],
            'tablerecapkelurahan' => ['resources/css/tablerecapkelurahan.css', 'resources/js/tablerecapkelurahan.js'],
            'historistablerecapkelurahan' => ['resources/css/historistablerecapkelurahan.css', 'resources/js/historistablerecapkelurahan.js'],
            'formeditkelurahan' => ['resources/css/formeditkelurahan.css', 'resources/js/formeditkelurahan.js'],
            'mapskelurahan' => ['resources/css/mapskelurahan.css', 'resources/js/mapskelurahan.js'],
            // RW
            'forminputrw' => ['resources/css/forminputrw.css', 'resources/js/forminputrw.js'],
            'forminputrw2' => ['resources/css/forminputrw2.css', 'resources/js/forminputrw2.js'],
            'tablerecaprw' => ['resources/css/tablerecaprw.css', 'resources/js/tablerecaprw.js'],
            'historistablerecaprw' => ['resources/css/historistablerecaprw.css', 'resources/js/historistablerecaprw.js'],
            'formeditrw' => ['resources/css/formeditrw.css', 'resources/js/formeditrw.js'],
            'mapsrw' => ['resources/css/mapsrw.css', 'resources/js/mapsrw.js'],
            // Admin
            'tableadmin' => ['resources/css/tableadmin.css', 'resources/js/tableadmin.js'],
            'dashboard' => ['resources/css/dashboard.css', 'resources/js/dashboard.js'],
            'tableregulasi' => ['resources/css/tableregulasi.css', 'resources/js/tableregulasi.js'],
        ];

        if (!isset($assetsMap[$title])) {
            return [];
        }

        $assets = [];
        foreach ($assetsMap[$title] as $asset) {
            if (isset($manifest[$asset])) {
                $assets[] = $manifest[$asset]['file'];
            }
        }
        // dd($assets);
        return $assets;
    }
}
