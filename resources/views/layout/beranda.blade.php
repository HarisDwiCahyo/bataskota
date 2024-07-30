<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />

    <title>{{ $title }}</title>
    <meta content="" name="description" />
    <meta content="" name="keywords" />

    <!-- Favicons -->
    <link href="{{ asset('dashboard/img/Logo kota.png') }}" rel="icon" />
    <link href="{{ asset('dashboard/img/apple-touch-icon.png') }}" rel="apple-touch-icon" />

    <!-- Google Fonts -->
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
        rel="stylesheet" />

    <!-- Vendor CSS Files -->
    <link href="{{ asset('dashboard/vendor/animate.css/animate.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('dashboard/vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('dashboard/vendor/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet" />
    <link href="{{ asset('dashboard/vendor/boxicons/css/boxicons.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('dashboard/vendor/glightbox/css/glightbox.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('dashboard/vendor/remixicon/remixicon.css') }}" rel="stylesheet" />
    <link href="{{ asset('dashboard/vendor/swiper/swiper-bundle.min.css') }}" rel="stylesheet" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/ag-grid/32.0.2/ag-grid-community.js"
        integrity="sha512-2WKG1S1aBQpJArNdA8hCI40IL+AGqAKO4kYWXBFugEKeIlbgGSDITMlmw+DoKhYY0kuTVblO/IbG7jXi8TslJg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>


    <!-- Template Main CSS File -->
    {{-- @vite(['resources/css/mainberanda.css', 'resources/js/mainberanda.js']) --}}
    <link rel="stylesheet" href="{{ asset('build/assets/mainberanda-B_GWS6gI.css') }}">
    {{-- 
    @foreach (\App\Helpers\ViterHelper::viteAssets($title) as $asset)
        @vite($asset)
    @endforeach --}}

    <!-- =======================================================
  * Template Name: Sailor
  * Template URL: https://bootstrapmade.com/sailor-free-bootstrap-theme/
  * Updated: Mar 17 2024 with Bootstrap v5.3.3
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>
    <!-- ======= Header ======= -->
    <header id="header" class="fixed-top d-flex align-items-center">
        <div class="container d-flex align-items-center">
            <h1 class="logo me-auto">
                <a href="{{ route('home') }}">
                    <img src="{{ asset('dashboard/img/logo-app.png') }}" alt="Si Batas Kota Logo" />
                </a>
            </h1>

            <nav id="navbar" class="navbar">
                <ul>
                    <li><a href="{{ route('home') }}"
                            class="{{ in_array($title, ['home']) ? 'active' : '' }}">Beranda</a></li>
                    <li><a href="{{ route('regulasi') }}"
                            class="{{ in_array($title, ['regulasi']) ? 'active' : '' }}">Regulasi</a></li>
                    <li><a href="{{ route('kontak') }}"
                            class="{{ in_array($title, ['kontak']) ? 'active' : '' }}">Kontak</a></li>
                    <li><a href="{{ route('login') }}">Login</a></li>
                    <li><a href="{{ route('mainmaps') }}" class="getstarted">Peta</a></li>
                </ul>
                <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>
            <!-- .navbar -->
        </div>
    </header>
    <!-- End Header -->

    @yield('mainsection')

    <!-- ======= Footer ======= -->
    <footer id="footer">
        <div class="footer-top">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6 footer-newsletter text-center">
                        <h4>Pelayanan</h4>
                        <a href="{{ route('home') }}">
                            <img src="{{ asset('dashboard/img/Logo kota.png') }}" alt="Si Batas Kota Logo"
                                class="img-fluid" />
                        </a>
                        <p style="margin-top: 10px">Hubungi Kami</p>
                        <div class="social-links mt-3">
                            <a href="tel:+62274515865" class="phone">
                                <i class="bx bx-phone"></i>
                            </a>
                            <a href="https://wa.me/628112735100" class="whatsapp">
                                <i class="bx bxl-whatsapp"></i>
                            </a>
                            <a href="mailto:dinpertaru@jogjakota.go.id" class="email">
                                <i class="bx bx-envelope"></i>
                            </a>
                            <a href="mailto:online.dinpertaru@gmail.com" class="email-service">
                                <i class="bx bx-envelope"></i>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 footer-links">
                        <h4>Lokasi</h4>
                        <ul style="color: rgba(242, 240, 240, 0.907)">
                            <p>
                                Dinas Pertanahan dan Tata Ruang Kota Yogyakarta<br />
                                (Kundha Niti Mandala Sarta Tata Sasana)<br />
                                Komplek Balaikota Yogyakarta, Kota Yogyakarta<br />
                                Jl. Kenari No 56, Mujamuju, Umbulharjo, Yogyakarta 55165<br /><br />
                            </p>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 footer-links">
                        <h4>Si Batas Pintar</h4>
                        <ul style="color: rgba(242, 240, 240, 0.907)">
                            <p>
                                Si Batas Pintar adalah aplikasi yang mempermudah akses
                                informasi batas wilayah di Kota Yogyakarta. Menyediakan peta
                                interaktif, data regulasi, dan fitur manajemen data untuk
                                pengelolaan batas wilayah.
                            </p>
                        </ul>
                    </div>
                    <div class="col-lg-3 col-md-6 footer-links">
                        <h4>Fitur Aplikasi</h4>
                        <ul>
                            <li>
                                <i class="bx bx-chevron-right"></i>
                                <a href="{{ route('mainmaps') }}">Peta Interaktif</a>
                            </li>
                            <li>
                                <i class="bx bx-chevron-right"></i>
                                <a href="{{ route('regulasi') }}">Regulasi</a>
                            </li>
                            <li>
                                <i class="bx bx-chevron-right"></i>
                                <a href="{{ route('kontak') }}">Kontak</a>
                            </li>
                            <li>
                                <i class="bx bx-chevron-right"></i>
                                <a href="{{ route('login') }}">Data Management</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="copyright">
                &copy; Copyright <strong><span>Sailor</span></strong>. All Rights Reserved
            </div>
            <div class="credits">
                <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/sailor-free-bootstrap-theme/ -->
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
        </div>
    </footer>
    <!-- End Footer -->

    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
            class="bi bi-arrow-up-short"></i></a>

    <!-- Vendor JS Files -->


    <script src="{{ asset('dashboard/vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('dashboard/vendor/glightbox/js/glightbox.min.js') }}"></script>
    <script src="{{ asset('dashboard/vendor/isotope-layout/isotope.pkgd.min.js') }}"></script>
    <script src="{{ asset('dashboard/vendor/swiper/swiper-bundle.min.js') }}"></script>
    <script src="{{ asset('dashboard/vendor/waypoints/noframework.waypoints.js') }}"></script>
    <script src="{{ asset('dashboard/vendor/php-email-form/validate.js') }}"></script>
    <script type="module" src=" {{ asset('build/assets/mainberanda-DqS3dzP2.js') }}"></script>
    <script>
        var title = {!! json_encode($title) !!}; // Convert PHP title to JavaScript variable
        var data = null;
        if (title === 'regulasi') {
            @isset($data)
                data = @json($data); // Safely encode $data to JSON
            @endisset
        }
    </script>
</body>

</html>
