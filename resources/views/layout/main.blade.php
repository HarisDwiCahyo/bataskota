<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="Best Admin Panels" />
    <meta name="keywords"
        content="Admin, Dashboard, Bootstrap4, Sass, CSS3, HTML5, Responsive Dashboard, Responsive Admin Template, Admin Template, Best Admin Template, Bootstrap Template, Themeforest" />
    <meta name="author" content="Bootstrap Gallery" />
    <link rel="canonical" href="https://www.bootstrap.gallery/" />
    <meta property="og:url" content="https://www.bootstrap.gallery" />
    <meta property="og:title" content="Admin Templates - Dashboard Templates | Bootstrap Gallery" />
    <meta property="og:description" content="Marketplace for Bootstrap Admin Dashboards" />
    <meta property="og:type" content="Website" />
    <meta property="og:site_name" content="Bootstrap Gallery" />
    <link rel="shortcut icon" href="{{ asset('asset/img/favicon.svg') }}" />
    <title>{{ $title }}</title>
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <!-- Common CSS -->
    <link rel="stylesheet" href="{{ asset('asset/css/bootstrap.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('asset/fonts/icomoon/icomoon.css') }}" />
    {{-- <link rel="stylesheet" href="{{ asset('asset/css/main.min.css') }}" /> --}}
    <link rel="stylesheet" href="{{ asset('asset/css/main.css') }}" />

    <!-- Other CSS includes plugins - Cleaned up unnecessary CSS -->
    <!-- Chartist css -->
    @if ($title === 'dashboard')
        <link href="{{ asset('asset/vendor/chartist/css/chartist.min.css') }}" rel="stylesheet" />
        <link href="{{ asset('asset/vendor/chartist/css/chartist-custom.css') }}" rel="stylesheet" />
    @else
    @endif

    <!-- Lobipanel css -->
    <link rel="stylesheet" href="{{ asset('asset/vendor/lobipanel/lobipanel.css') }}" />

    <!-- Data Tables -->
    <link rel="stylesheet" href="{{ asset('asset/vendor/datatables/dataTables.bs4.css') }}" />
    <link rel="stylesheet" href="{{ asset('asset/vendor/datatables/dataTables.bs4-custom.css') }}" />
    {{-- vite resource --}}
    {{-- Pilar --}}

    {{-- @if ($title === 'forminputpilar')
        @vite(['resources/css/forminputpilar.css', 'resources/js/forminputpilar.js'])
    @elseif ($title === 'forminputpilar2')
        @vite(['resources/css/forminputpilar2.css', 'resources/js/forminputpilar2.js'])
    @elseif ($title === 'tablerecappilar')
        @vite(['resources/css/tablerecappilar.css', 'resources/js/tablerecappilar.js'])
    @elseif ($title === 'historistablerecappilar')
        @vite(['resources/css/historistablerecappilar.css', 'resources/js/historistablerecappilar.js'])
    @elseif ($title === 'formeditpilar')
        @vite(['resources/css/formeditpilar.css', 'resources/js/formeditpilar.js'])
    @elseif ($title === 'mapspilar')
        @vite(['resources/css/mapspilar.css', 'resources/js/mapspilar.js']) --}}
    {{-- Kota Jogja --}}
    {{-- @elseif ($title === 'forminputkota')
        @vite(['resources/css/forminputkota.css', 'resources/js/forminputkota.js'])
    @elseif ($title === 'forminputkota2')
        @vite(['resources/css/forminputkota2.css', 'resources/js/forminputkota2.js'])
    @elseif ($title === 'tablerecapkota')
        @vite(['resources/css/tablerecapkota.css', 'resources/js/tablerecapkota.js'])
    @elseif ($title === 'historistablerecapkota')
        @vite(['resources/css/historistablerecapkota.css', 'resources/js/historistablerecapkota.js'])
    @elseif ($title === 'formeditkota')
        @vite(['resources/css/formeditkota.css', 'resources/js/formeditkota.js'])
    @elseif ($title === 'mapskota')
        @vite(['resources/css/mapskota.css', 'resources/js/mapskota.js']) --}}
    {{-- Kemantren --}}
    {{-- @elseif ($title === 'forminputkemantren')
        @vite(['resources/css/forminputkemantren.css', 'resources/js/forminputkemantren.js'])
    @elseif ($title === 'forminputkemantren2')
        @vite(['resources/css/forminputkemantren2.css', 'resources/js/forminputkemantren2.js'])
    @elseif ($title === 'tablerecapkemantren')
        @vite(['resources/css/tablerecapkemantren.css', 'resources/js/tablerecapkemantren.js'])
    @elseif ($title === 'historistablerecapkemantren')
        @vite(['resources/css/historistablerecapkemantren.css', 'resources/js/historistablerecapkemantren.js'])
    @elseif ($title === 'mapskemantren')
        @vite(['resources/css/mapskemantren.css', 'resources/js/mapskemantren.js'])
    @elseif ($title === 'formeditkemantren')
        @vite(['resources/css/formeditkemantren.css', 'resources/js/formeditkemantren.js']) --}}
    {{-- Kelurahan --}}
    {{-- @elseif ($title === 'forminputkelurahan')
        @vite(['resources/css/forminputkelurahan.css', 'resources/js/forminputkelurahan.js'])
    @elseif ($title === 'forminputkelurahan2')
        @vite(['resources/css/forminputkelurahan2.css', 'resources/js/forminputkelurahan2.js'])
    @elseif ($title === 'tablerecapkelurahan')
        @vite(['resources/css/tablerecapkelurahan.css', 'resources/js/tablerecapkelurahan.js'])
    @elseif ($title === 'historistablerecapkelurahan')
        @vite(['resources/css/historistablerecapkelurahan.css', 'resources/js/historistablerecapkelurahan.js'])
    @elseif ($title === 'formeditkelurahan')
        @vite(['resources/css/formeditkelurahan.css', 'resources/js/formeditkelurahan.js'])
    @elseif ($title === 'mapskelurahan')
        @vite(['resources/css/mapskelurahan.css', 'resources/js/mapskelurahan.js']) --}}
    {{-- RW --}}
    {{-- @elseif ($title === 'forminputrw')
        @vite(['resources/css/forminputrw.css', 'resources/js/forminputrw.js'])
    @elseif ($title === 'forminputrw2')
        @vite(['resources/css/forminputrw2.css', 'resources/js/forminputrw2.js'])
    @elseif ($title === 'tablerecaprw')
        @vite(['resources/css/tablerecaprw.css', 'resources/js/tablerecaprw.js'])
    @elseif ($title === 'historistablerecaprw')
        @vite(['resources/css/historistablerecaprw.css', 'resources/js/historistablerecaprw.js'])
    @elseif ($title === 'formeditrw')
        @vite(['resources/css/formeditrw.css', 'resources/js/formeditrw.js'])
    @elseif ($title === 'mapsrw')
        @vite(['resources/css/mapsrw.css', 'resources/js/mapsrw.js'])
    @elseif ($title === 'tableadmin')
        @vite(['resources/css/tableadmin.css', 'resources/js/tableadmin.js'])
    @elseif ($title === 'dashboard')
        @vite(['resources/css/dashboard.css', 'resources/js/dashboard.js'])
    @elseif ($title === 'tableregulasi')
        @vite(['resources/css/tableregulasi.css', 'resources/js/tableregulasi.js'])
    @else
    @endif --}}

    @foreach (\App\Helpers\ViterHelper::viteAssets($title) as $asset)
        @vite($asset)
    @endforeach

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>

    {{-- <!-- Loading starts -->
    <div class="loading-wrapper">
        <div class="loading">
            <img src="{{ asset('asset/img/loading.png') }}" alt="Loading Image"
                style="width: 300px; height: 80px; position: relative; top: -30px; left: -100px;">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div> --}}
    <!-- Loading ends -->

    <!-- BEGIN .app-wrap -->
    <div class="app-wrap">
        <!-- BEGIN .app-heading -->
        <header class="app-header">
            <div class="container-fluid">
                <div class="row gutters">
                    <div class="col-md-5 col-sm-3 col-4">
                        <a class="mini-nav-btn" href="#" id="app-side-mini-toggler">
                            <i class="icon-menu5" style="color: rgb(10, 84, 3)"></i>
                        </a>
                        <a href="#app-side" data-toggle="onoffcanvas" class="onoffcanvas-toggler" aria-expanded="true">
                            <i class="icon-chevron-thin-left" style="color: rgb(10, 84, 3)"></i>
                        </a>
                    </div>
                    <div class="col-md-2 col-sm-6 col-4">
                        <a href="index.html" class="logo">
                            <img style="font-size: 160px" src="{{ asset('asset/img/logo-app.png') }}"
                                alt="Best Admin Dashboards" />
                        </a>
                    </div>
                    <div class="col-md-5 col-sm-3 col-4">
                        <ul class="header-actions">
                            <li></li>
                            <li class="dropdown">
                                <a href="#" id="userSettings" class="user-settings" data-toggle="dropdown"
                                    aria-haspopup="true">
                                    <img class="avatar" src="{{ asset('asset/img/user1.png') }}"
                                        alt="Admin Dashboards" />
                                    <span class="user-name">{{ Auth::user()->name }}</span>
                                    <i class="icon-chevron-small-down"></i>
                                </a>
                                <div class="dropdown-menu lg dropdown-menu-right" aria-labelledby="userSettings">
                                    <ul class="user-settings-list">
                                        <li>
                                            <a href="{{ route('admin.profileuser') }}">
                                                <div class="icon">
                                                    <i class="icon-account_circle"></i>
                                                </div>
                                                <p>Profile</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="{{ route('admin.tableadmin') }}">
                                                <div class="icon red">
                                                    <i class="icon-cog3"></i>
                                                </div>
                                                <p>Tabel Admin</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="{{ route('admin.registeradmin') }}">
                                                <div class="icon yellow">
                                                    <i class="icon-user-plus"></i>
                                                </div>
                                                <p>Tambah Akun</p>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="logout-btn">
                                        <a href="{{ route('logout') }}" style="background-color: rgb(17, 83, 14)"
                                            class="btn btn-success">Logout</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <!-- END: .app-heading -->
        <!-- BEGIN .app-container -->
        <div class="app-container">
            <!-- BEGIN .app-side -->
            @include('partial.sidebar')
            <!-- END: .app-side -->

            <!-- BEGIN .app-main -->
            <div class="app-main">
                @yield('mainsection')
            </div>
            <!-- END: .app-main -->
        </div>
        <!-- END: .app-container -->
        <!-- BEGIN .main-footer -->
        <footer class="main-footer fixed-btm">
            © Bootstrap Gallery 2023
        </footer>
    </div>
    <!-- END: .app-wrap -->

    <!-- jQuery first, then Tether, then other JS. -->
    <script src="{{ asset('asset/js/jquery.js') }}"></script>
    <script src="{{ asset('asset/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('asset/vendor/unifyMenu/unifyMenu.js') }}"></script>
    <script src="{{ asset('asset/vendor/onoffcanvas/onoffcanvas.js') }}"></script>
    <script src="{{ asset('asset/js/moment.js') }}"></script>

    <!-- Slimscroll JS -->
    <script src="{{ asset('asset/vendor/slimscroll/slimscroll.min.js') }}"></script>
    <script src="{{ asset('asset/vendor/slimscroll/custom-scrollbar.js') }}"></script>

    <!-- Chartist JS -->
    @if ($title === 'dashboard')
        <script src="{{ asset('asset/vendor/chartist/js/chartist.min.js') }}"></script>
        <script src="{{ asset('asset/vendor/chartist/js/chartist-tooltip.js') }}"></script>
        {{-- <script src="{{ asset('asset/vendor/chartist/js/custom/donut-chart2.js') }}"></script> --}}
    @else
    @endif

    <!-- Common JS -->
    <script src="{{ asset('asset/js/common.js') }}"></script>
    <!-- Lobipanel -->
    <script src="{{ asset('asset/vendor/lobipanel/lobipanel.js') }}"></script>
    <script src="{{ asset('asset/vendor/lobipanel/lobipanel-custom.js') }}"></script>
    <!-- jQuery UI -->
    <script src="{{ asset('asset/js/jquery-ui.min.js') }}"></script>

    <!-- Data Tables -->
    <script src="{{ asset('asset/vendor/datatables/dataTables.min.js') }}"></script>
    <script src="{{ asset('asset/vendor/datatables/dataTables.bootstrap.min.js') }}"></script>

    <!-- Custom Data tables -->
    <script src="{{ asset('asset/vendor/datatables/custom/custom-datatables.js') }}"></script>
    <script src="{{ asset('asset/vendor/datatables/custom/fixedHeader.js') }}"></script>
    <script>
        var title = {!! json_encode($title) !!}; // Convert PHP title to JavaScript variable
        var data = null;

        if (title === 'tablerecappilar' || title === 'historistablerecappilar' || title === 'formeditpilar' || title ===
            'tablerecapkemantren' || title === 'historistablerecapkemantren' || title ===
            'formeditkemantren' || title === 'tablerecapkelurahan' || title === 'historistablerecapkelurahan' || title ===
            'formeditkelurahan' || title ===
            'tablerecaprw' || title === 'historistablerecaprw' || title === 'formeditrw' || title === 'tablerecapkota' ||
            title === 'historistablerecapkota' || title === 'formeditkota' || title === 'dashboard' || title ===
            'tableregulasi' || title ===
            'tableadmin' || title ===
            'profileuser') {
            @isset($data)
                data = @json($data); // Safely encode $data to JSON
            @endisset
        }
        if (title === 'dashboard') {
            @isset($data1)
                data1 = @json($data1); // Safely encode $data1 to JSON
            @endisset
            @isset($data2)
                data2 = @json($data2); // Safely encode $data2 to JSON
            @endisset
            @isset($data3)
                data3 = @json($data3); // Safely encode $data3 to JSON
            @endisset
        }
    </script>
</body>

</html>
