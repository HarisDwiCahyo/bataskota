<aside class="app-side" id="app-side">
    <!-- BEGIN .side-content -->
    <div class="side-content">
        <?php if (in_array($title, ['mapspilar', 'mapskota', 'mapskemantren' , 'mapskelurahan', 'mapsrw'])): ?>
        <!-- BEGIN .user-actions -->
        <ul class="user-actions">

            <li style="background-color: rgb(10, 84, 3); border-radius: 5px">
                <a href="#" class="user-action" data-target="#side1">
                    <i class="icon-th-large-outline" style="color: rgb(255, 255, 255);"></i>
                </a>
            </li>
            <li style="background-color: rgb(10, 84, 3); border-radius: 5px">
                <a href="#" class="user-action " data-target="#side2">
                    <i class="icon-database" style="color: rgb(255, 255, 255);"></i>
                </a>
            </li>

        </ul>
        <!-- END .user-actions -->
        <?php endif; ?>
        <?php if (in_array($title, ['tablerecappilar', 'tablerecapkota', 'tablerecapkemantren' , 'tablerecapkelurahan', 'tablerecaprw' ,
        'historistablerecappilar', 'historistablerecapkota', 'historistablerecapkemantren' , 'historistablerecapkelurahan', 'historistablerecaprw' ])): ?>
        <!-- BEGIN .user-actions -->
        <ul class="user-actions">
            <li style="background-color: rgb(10, 84, 3); border-radius: 5px">
                <a href="#" class="user-action" id="geojsonOption">
                    <i class="icon-sphere" style="color: rgb(255, 255, 255);"></i>
                </a>
            </li>
            <li style="background-color: rgb(10, 84, 3); border-radius: 5px">
                <a href="#" class="user-action" id="excelOption">
                    <i class="icon-paste" style="color: rgb(255, 255, 255);"></i>
                </a>
            </li>
            @php
                $routes = [
                    'tablerecappilar' => 'hapussemuapilar',
                    'tablerecapkota' => 'hapussemuakota',
                    'tablerecapkemantren' => 'hapussemuakemantren',
                    'tablerecapkelurahan' => 'hapussemuakelurahan',
                    'tablerecaprw' => 'hapussemuarw',
                    'historistablerecappilar' => 'hapussemuahistorispilar',
                    'historistablerecapkota' => 'hapussemuahistoriskota',
                    'historistablerecapkemantren' => 'hapussemuahistoriskemantren',
                    'historistablerecapkelurahan' => 'hapussemuahistoriskelurahan',
                    'historistablerecaprw' => 'hapussemuahistorisrw',
                ];

                $routes = array_map(function ($route) {
                    return 'admin.' . $route;
                }, $routes);

                $routeName = isset($routes[$title]) ? route($routes[$title]) : '#';
            @endphp
            <li style="background-color: rgb(10, 84, 3);border-radius: 5px">
                <a href="{{ $routeName }}" class="user-action"
                    onclick="return confirm('Apakah kamu yakin menghapus semua data?');">
                    <i class="icon-bin" style="color: rgb(255, 255, 255);"></i>
                </a>
            </li>
        </ul>
        <!-- END .user-actions -->
        <?php endif; ?>

        <!-- END .user-actions -->
        <!-- BEGIN .side-nav -->
        <nav class="side-nav active" id="side1">
            <!-- BEGIN: side-nav-content -->
            <ul class="unifyMenu" id="unifyMenu">
                <li class="{{ in_array($title, ['dashboard']) ? 'active selected' : '' }}">
                    <a href="{{ route('admin.dashboard') }}">
                        <span class="has-icon">
                            <i class="icon-laptop4"></i>
                        </span>
                        <span class="nav-title">Dashboard</span>
                    </a>
                </li>
                <li
                    class="{{ in_array($title, ['forminputpilar', 'forminputpilar2', 'formeditpilar', 'tablerecappilar', 'mapspilar']) ? 'active selected' : '' }}">

                    <a href="#" class="has-arrow" aria-expanded="false">
                        <span class="has-icon">
                            <i class="icon-map6"></i>
                        </span>
                        <span class="nav-title">Data Batas Pilar</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="{{ route('admin.forminputpilar') }}"
                                class="{{ in_array($title, ['forminputpilar', 'forminputpilar2']) ? 'current-page' : '' }}">
                                Form
                                Masukan</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.tablerecappilar') }}"
                                class="{{ in_array($title, ['formeditpilar', 'tablerecappilar']) ? 'current-page' : '' }}">Tabel
                                Recap</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.mapspilar') }}"
                                class="{{ in_array($title, ['mapspilar']) ? 'current-page' : '' }}">Peta
                                Pilar</a>
                        </li>
                    </ul>
                </li>
                <li
                    class="{{ in_array($title, ['forminputkota', 'forminputkota2', 'formeditkota', 'tablerecapkota', 'mapskota']) ? 'active selected' : '' }}">
                    <a href="#" class="has-arrow" aria-expanded="false">
                        <span class="has-icon">
                            <i class="icon-layers3"></i>
                        </span>
                        <span class="nav-title">Data Batas Kota </span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="{{ route('admin.forminputkota') }}"
                                class="{{ in_array($title, ['forminputkota', 'forminputkota2']) ? 'current-page' : '' }}">
                                Form
                                Masukan</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.tablerecapkota') }}"
                                class="{{ in_array($title, ['formeditkota', 'tablerecapkota']) ? 'current-page' : '' }}">Tabel
                                Recap</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.mapskota') }}"
                                class="{{ in_array($title, ['mapskota']) ? 'current-page' : '' }}">Peta
                                Kota</a>
                        </li>
                    </ul>
                </li>
                <li
                    class="{{ in_array($title, ['forminputkemantren', 'forminputkemantren2', 'formeditkemantren', 'tablerecapkemantren', 'mapskemantren']) ? 'active selected' : '' }}">
                    <a href="#" class="has-arrow" aria-expanded="false">
                        <span class="has-icon">
                            <i class="icon-layers3"></i>
                        </span>
                        <span class="nav-title">Data Kemantren</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="{{ route('admin.forminputkemantren') }}"
                                class="{{ in_array($title, ['forminputkemantren', 'forminputkemantren2']) ? 'current-page' : '' }}">
                                Form
                                Masukan</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.tablerecapkemantren') }}"
                                class="{{ in_array($title, ['formeditkemantren', 'tablerecapkemantren']) ? 'current-page' : '' }}">Tabel
                                Recap</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.mapskemantren') }}"
                                class="{{ in_array($title, ['mapskemantren']) ? 'current-page' : '' }}">Peta
                                Kemantren</a>
                        </li>
                    </ul>
                </li>
                <li
                    class="{{ in_array($title, ['forminputkelurahan', 'forminputkelurahan2', 'formeditkelurahan', 'tablerecapkelurahan', 'mapskelurahan']) ? 'active selected' : '' }}">
                    <a href="#" class="has-arrow" aria-expanded="false">
                        <span class="has-icon">
                            <i class="icon-layers3"></i>
                        </span>
                        <span class="nav-title">Data Kelurahan</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="{{ route('admin.forminputkelurahan') }}"
                                class="{{ in_array($title, ['forminputkelurahan', 'forminputkelurahan2']) ? 'current-page' : '' }}">
                                Form
                                Masukan</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.tablerecapkelurahan') }}"
                                class="{{ in_array($title, ['formeditkelurahan', 'tablerecapkelurahan']) ? 'current-page' : '' }}">Tabel
                                Recap</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.mapskelurahan') }}"
                                class="{{ in_array($title, ['mapskelurahan']) ? 'current-page' : '' }}">Peta
                                Kelurahan</a>
                        </li>
                    </ul>
                </li>
                <li
                    class="{{ in_array($title, ['forminputrw', 'forminputrw2', 'formeditrw', 'tablerecaprw', 'mapsrw']) ? 'active selected' : '' }}">
                    <a href="#" class="has-arrow" aria-expanded="false">
                        <span class="has-icon">
                            <i class="icon-layers3"></i>
                        </span>
                        <span class="nav-title">Data RW</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="{{ route('admin.forminputrw') }}"
                                class="{{ in_array($title, ['forminputrw', 'forminputrw2']) ? 'current-page' : '' }}">
                                Form
                                Masukan</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.tablerecaprw') }}"
                                class="{{ in_array($title, ['formeditrw', 'tablerecaprw']) ? 'current-page' : '' }}">Tabel
                                Recap</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.mapsrw') }}"
                                class="{{ in_array($title, ['mapsrw']) ? 'current-page' : '' }}">Peta RW</a>
                        </li>
                    </ul>
                </li>
                <li
                    class="{{ in_array($title, ['inputregulasi', 'tableregulasi', 'editregulasi']) ? 'active selected' : '' }}">
                    <a href="#" class="has-arrow" aria-expanded="false">
                        <span class="has-icon">
                            <i class="icon-layers3"></i>
                        </span>
                        <span class="nav-title">Data Regulasi</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="{{ route('admin.inputregulasi') }}"
                                class="{{ in_array($title, ['inputregulasi']) ? 'current-page' : '' }}">
                                Form
                                Masukan</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.tableregulasi') }}"
                                class="{{ in_array($title, ['editregulasi', 'tableregulasi']) ? 'current-page' : '' }}">Tabel
                                Regulasi</a>
                        </li>
                    </ul>
                </li>
                <li
                    class="{{ in_array($title, ['historistablerecappilar', 'historistablerecapkota', 'historistablerecapkemantren', 'historistablerecapkelurahan', 'historistablerecaprw']) ? 'active selected' : '' }}">
                    <a href="#" class="has-arrow" aria-expanded="false">
                        <span class="has-icon">
                            <i class="icon-wallet"></i>
                        </span>
                        <span class="nav-title">Data Historis</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="{{ route('admin.historistablerecappilar') }}"
                                class="{{ in_array($title, ['historistablerecappilar']) ? 'current-page' : '' }}">
                                Data
                                Pilar</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.historistablerecapkota') }}"
                                class="{{ in_array($title, ['historistablerecapkota']) ? 'current-page' : '' }}">Data
                                Kota</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.historistablerecapkemantren') }}"
                                class="{{ in_array($title, ['historistablerecapkemantren']) ? 'current-page' : '' }}">Data
                                Kemantren</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.historistablerecapkelurahan') }}"
                                class="{{ in_array($title, ['historistablerecapkelurahan']) ? 'current-page' : '' }}">Data
                                Kelurahan</a>
                        </li>
                        <li>
                            <a href="{{ route('admin.historistablerecaprw') }}"
                                class="{{ in_array($title, ['historistablerecaprw']) ? 'current-page' : '' }}">Data
                                RW</a>
                        </li>
                    </ul>
                </li>

            </ul>
            <!-- END: side-nav-content -->
        </nav>
        <?php if (in_array($title, ['mapspilar', 'mapskota', 'mapskemantren' , 'mapskelurahan', 'mapsrw'])): ?>
        <nav class="side-nav" id="side2">
            <!-- BEGIN: side-nav-content -->
            <ul class="unifyMenu" id="unifyMenu2">
                <li>
                    <a href="#" class="has-arrow" aria-expanded="false">
                        <span class="has-icon">
                            <i class="icon-paint-format"></i>
                        </span>
                        <span class="nav-title">Filter Feature</span>
                    </a>
                    <ul aria-expanded="false">
                        <div class="col-sm-12 col-12" style="margin-top: 10px">
                            <div class="form-group">
                                <select id="layerSelect" class="form-control form-control-sm">
                                    <option>Pilih Layer</option>
                                    <?php if ($title == 'mapspilar'): ?>
                                    <option value="bataspilar">Batas Pilar</option>
                                    <?php endif; ?>
                                    <?php if ($title == 'mapskota'): ?>
                                    <option value="bataskota">Batas Kota</option>
                                    <?php endif; ?>
                                    <?php if ($title == 'mapskemantren'): ?>
                                    <option value="bataskemantren">Batas Kemantren</option>
                                    <?php endif; ?>
                                    <?php if ($title == 'mapskelurahan'): ?>
                                    <option value="bataskelurahan">Batas Kelurahan</option>
                                    <?php endif; ?>
                                    <?php if ($title == 'mapsrw'): ?>
                                    <option value="batasrw">Batas RW</option>
                                    <?php endif; ?>
                                </select>
                            </div>
                            <div class="form-group">
                                <select id="propertySelect" class="form-control form-control-sm">
                                    <option>Pilih Properti</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select id="operatorSelect" class="form-control form-control-sm">
                                    <option>Pilih Operator</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input id="valueInput" class="form-control form-control-sm"
                                    placeholder="Masukkan Nilai" type="text">
                            </div>
                            <button id="getFilterButton" class="btn btn-primary btn-sm"
                                style="width: 100%; border-radius: 5px; background-color:rgb(10, 84, 3);">Cari
                                Data</button>
                        </div>
                    </ul>
                </li>
            </ul>
            <!-- END: side-nav-content -->
        </nav>
        <?php endif; ?>
        <!-- END: .side-nav -->
    </div>
    <!-- END: .side-content -->
</aside>
