@extends('layout.beranda')
@section('mainsection')
    <!-- ======= Hero Section ======= -->
    <section id="hero">
        <div id="heroCarousel" data-bs-interval="5000" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

            <div class="carousel-inner" role="listbox">
                <!-- Slide 1 -->
                <div class="carousel-item active"
                    style="background-image: url('{{ asset('dashboard/img/slide/slide-1.jpeg') }}')">

                    <div class="carousel-container">
                        <div class="container">
                            <h2 class="animate__animated animate__fadeInDown">
                                <span>Si Batas Pintar</span>
                            </h2>
                            <p class="animate__animated animate__fadeInUp">
                                Si Batas Pintar adalah sistem informasi berbasis peta interaktif yang menyediakan <br> data
                                batas
                                wilayah
                                dan pilar batas di wilayah Kota Yogyakarta
                            </p>
                            <a href="#services" class="btn-get-started animate__animated animate__fadeInUp scrollto">Read
                                More</a>
                        </div>
                    </div>
                </div>

                <!-- Slide 2 -->
                <div class="carousel-item" style="background-image: url('{{ asset('dashboard/img/slide/slide-2.jpeg') }}')">
                    <div class="carousel-container">
                        <div class="container">
                            <h2 class="animate__animated animate__fadeInDown">
                                Fitur Aplikasi
                            </h2>
                            <p class="animate__animated animate__fadeInUp">
                                Si Batas Pintar adalah peta interaktif yang menampilkan batas
                                administratif dan pilar batas di Kota Yogyakarta. <br> Fitur
                                utamanya termasuk pencarian lokasi, zoom, pengukuran,
                                informasi feature, dan pilihan basemap.
                            </p>
                            <a href="#services" class="btn-get-started animate__animated animate__fadeInUp scrollto">Read
                                More</a>
                        </div>
                    </div>
                </div>

                <!-- Slide 3 -->
                <div class="carousel-item" style="background-image: url('{{ asset('dashboard/img/slide/slide-3.jpeg') }}')">
                    <div class="carousel-container">
                        <div class="container">
                            <h2 class="animate__animated animate__fadeInDown">
                                Manfaat Aplikasi
                            </h2>
                            <p class="animate__animated animate__fadeInUp">
                                Aplikasi Si Batas Pintar menyediakan informasi akurat tentang
                                batas administratif dan pilar di Kota Yogyakarta. <br>Dengan fitur
                                pencarian, zoom, pengukuran, informasi, dan basemap, pengguna
                                dapat dengan mudah menemukan dan mengelola lokasi.
                            </p>
                            <a href="#services" class="btn-get-started animate__animated animate__fadeInUp scrollto">Read
                                More</a>
                        </div>
                    </div>
                </div>
            </div>

            <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
            </a>

            <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
            </a>
        </div>
    </section>
    <!-- End Hero -->

    <main id="main">
        <!-- ======= Clients Section ======= -->
        <section id="clients" class="clients section-bg">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-3 col-md-4 col-6 d-flex justify-content-center mb-4">
                        <a href="{{ route('mainmaps') }}"
                            class="client-card d-flex flex-column align-items-center text-center p-3 border rounded-lg hover:shadow-lg transition-shadow">
                            <div class="icon-container mb-3">
                                <i class="bx bx-map-alt"></i>
                            </div>
                            <h5>Peta</h5>
                            <p class="sub-title">Tematik Pilar Batas</p>
                        </a>
                    </div>
                    <div class="col-lg-3 col-md-4 col-6 d-flex justify-content-center mb-4">
                        <a href="{{ route('regulasi') }}"
                            class="client-card d-flex flex-column align-items-center text-center p-3 border rounded-lg hover:shadow-lg transition-shadow">
                            <div class="icon-container mb-3">
                                <i class="bx bx-cog"></i>
                            </div>
                            <h5>Regulasi</h5>
                            <p class="sub-title">Aturan dan Kebijakan</p>
                        </a>
                    </div>
                    <div class="col-lg-3 col-md-4 col-6 d-flex justify-content-center mb-4">
                        <a href="{{ route('kontak') }}"
                            class="client-card d-flex flex-column align-items-center text-center p-3 border rounded-lg hover:shadow-lg transition-shadow">
                            <div class="icon-container mb-3">
                                <i class="bx bx-message-dots"></i>
                            </div>
                            <h5>Kontak</h5>
                            <p class="sub-title">Hubungi Kami</p>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- End Clients Section -->

        <!-- ======= Services Section ======= -->
        <section id="services" class="services">
            <div class="container">
                <div class="section-title text-center">
                    <h2 style="font-weight: bold">Fitur Aplikasi</h2>
                    <div class="title-underline"></div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="icon-box text-center">
                            <i class="bi bi-pin-map-fill"></i>
                            <h4 style="font-family: Arial, sans-serif; font-weight: bold">
                                <a href="{{ route('mainmaps') }}" style="color: rgb(20, 106, 23)">Peta Interaktif</a>
                            </h4>
                            <p style="font-family: Arial, sans-serif">
                                Menyediakan peta interaktif yang memungkinkan pengguna untuk
                                melihat dan berinteraksi dengan data spasial secara langsung.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-6 mt-4 mt-md-0">
                        <div class="icon-box text-center">
                            <i class="bi bi-ui-checks"></i>
                            <h4 style="font-family: Arial, sans-serif; font-weight: bold">
                                <a href="{{ route('login') }}" style="color: rgb(20, 106, 23)">Input Data</a>
                            </h4>
                            <p style="font-family: Arial, sans-serif">
                                Memungkinkan pengguna untuk memasukkan data baru ke dalam
                                sistem dengan mudah dan efisien.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-6 mt-4 mt-md-0">
                        <div class="icon-box text-center">
                            <i class="bi bi-database-fill-up"></i>
                            <h4 style="font-family: Arial, sans-serif; font-weight: bold">
                                <a href="{{ route('login') }}" style="color: rgb(20, 106, 23)">Update Data</a>
                            </h4>
                            <p style="font-family: Arial, sans-serif">
                                Menyediakan fitur untuk memperbarui data yang sudah ada
                                sehingga selalu up-to-date.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-6 mt-4 mt-md-0">
                        <div class="icon-box text-center">
                            <i class="bi bi-box-seam-fill"></i>
                            <h4 style="font-family: Arial, sans-serif; font-weight: bold">
                                <a href="{{ route('login') }}" style="color: rgb(20, 106, 23)">Arsip Data</a>
                            </h4>
                            <p style="font-family: Arial, sans-serif">
                                Menyimpan data lama dan menjaga agar data tetap aman dan dapat
                                diakses kembali jika diperlukan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- End Services Section -->
    </main>
    @if ($message = Session::get('success'))
        <script>
            Swal.fire({
                icon: "success",
                title: "Good Job",
                text: "{{ $message }}",
            });
        </script>
    @endif
    <!-- End #main -->
@endsection
