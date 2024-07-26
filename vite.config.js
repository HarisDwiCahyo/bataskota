import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                //pilar
                "resources/css/app.css",
                "resources/css/forminputpilar.css",
                "resources/css/forminputpilar2.css",
                "resources/css/formeditpilar.css",
                "resources/css/tablerecappilar.css",
                "resources/css/historistablerecappilar.css",
                "resources/css/mapspilar.css",
                //Kota Jogja
                "resources/css/forminputkota.css",
                "resources/css/forminputkota2.css",
                "resources/css/tablerecapkota.css",
                "resources/css/historistablerecapkota.css",
                "resources/css/formeditkota.css",
                "resources/css/mapskota.css",
                //kemantren
                "resources/css/forminputkemantren.css",
                "resources/css/forminputkemantren2.css",
                "resources/css/tablerecapkemantren.css",
                "resources/css/historistablerecapkemantren.css",
                "resources/css/formeditkemantren.css",
                "resources/css/mapskemantren.css",
                //kelurahan
                "resources/css/forminputkelurahan.css",
                "resources/css/forminputkelurahan2.css",
                "resources/css/tablerecapkelurahan.css",
                "resources/css/historistablerecapkelurahan.css",
                "resources/css/formeditkelurahan.css",
                "resources/css/mapskelurahan.css",
                //RW
                "resources/css/forminputrw.css",
                "resources/css/forminputrw2.css",
                "resources/css/tablerecaprw.css",
                "resources/css/historistablerecaprw.css",
                "resources/css/formeditrw.css",
                "resources/css/mapsrw.css",

                "resources/css/mainmaps.css",
                "resources/css/login.css",
                "resources/css/tableadmin.css",
                "resources/css/mainberanda.css",
                "resources/css/dashboard.css",
                "resources/css/tableregulasi.css",
                "resources/js/app.js",
                //pilar
                "resources/js/forminputpilar.js",
                "resources/js/forminputpilar2.js",
                "resources/js/formeditpilar.js",
                "resources/js/tablerecappilar.js",
                "resources/js/historistablerecappilar.js",
                "resources/js/mapspilar.js",
                //Kota Jogja
                "resources/js/forminputkota.js",
                "resources/js/forminputkota2.js",
                "resources/js/tablerecapkota.js",
                "resources/js/historistablerecapkota.js",
                "resources/js/formeditkota.js",
                "resources/js/mapskota.js",
                //kemantren
                "resources/js/forminputkemantren.js",
                "resources/js/forminputkemantren2.js",
                "resources/js/tablerecapkemantren.js",
                "resources/js/historistablerecapkemantren.js",
                "resources/js/formeditkemantren.js",
                "resources/js/mapskemantren.js",
                //Kelurahan
                "resources/js/forminputkelurahan.js",
                "resources/js/forminputkelurahan2.js",
                "resources/js/tablerecapkelurahan.js",
                "resources/js/historistablerecapkelurahan.js",
                "resources/js/formeditkelurahan.js",
                "resources/js/mapskelurahan.js",
                //RW
                "resources/js/forminputrw.js",
                "resources/js/forminputrw2.js",
                "resources/js/tablerecaprw.js",
                "resources/js/historistablerecaprw.js",
                "resources/js/formeditrw.js",
                "resources/js/mapsrw.js",

                "resources/js/mainmaps.js",
                "resources/js/tableadmin.js",
                "resources/js/mainberanda.js",
                "resources/js/dashboard.js",
                "resources/js/tableregulasi.js",
            ],
            refresh: true,
        }),
    ],
    // build: {
    //     outDir: "public/build",
    //     rollupOptions: {
    //         output: {
    //             manualChunks: {
    //                 vendor: ["vue", "axios"],
    //             },
    //         },
    //     },
    // },
});
