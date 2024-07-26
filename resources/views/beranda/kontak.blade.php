@extends('layout.beranda')
@section('mainsection')
    <main id="main">
        <!-- ======= Breadcrumbs ======= -->
        <section id="breadcrumbs" class="breadcrumbs">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                    <h4 style="font-weight: bold; margin-top: 10px">Pusat Bantuan</h4>
                    <ol>
                        <li><a href="{{ route('home') }}">Beranda</a></li>
                        <li>Kontak</li>
                    </ol>
                </div>
            </div>
        </section>
        <!-- End Breadcrumbs -->

        <!-- ======= Contact Section ======= -->
        <section id="contact" class="contact">
            <div class="container">
                <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1976.449625553972!2d110.3905562352463!3d-7.8004902855157505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57f27388b60d%3A0xbff2e6188e98bdb6!2sYogyakarta%20City%20Hall!5e0!3m2!1sen!2sid!4v1721715803180!5m2!1sen!2sid"
                        width="100%" height="300" style="border: 0" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <div class="row mt-5">
                    <div class="col-12">
                        <div class="info d-flex justify-content-between align-items-center">
                            <div class="address text-center"
                                style="
                  border: 1px solid rgb(21, 140, 21);
                  margin: 5px;
                  padding: 5px;
                  border-radius: 5px;
                ">
                                <i class="bi bi-geo-alt" style="margin-top: 8px"></i>
                                <h4>Lokasi</h4>
                                <p>Komplek Balaikota Yogyakarta</p>
                            </div>
                            <div class="email text-center"
                                style="
                  border: 1px solid rgb(21, 140, 21);
                  margin: 5px;
                  padding: 5px;
                  border-radius: 5px;
                ">
                                <i class="bi bi-envelope" style="margin-top: 8px"></i>
                                <h4>Email</h4>
                                <p>pertanahan.tataruang@gmail.com</p>
                            </div>
                            <div class="phone text-center"
                                style="
                  border: 1px solid rgb(21, 140, 21);
                  margin: 5px;
                  padding: 5px;
                  border-radius: 5px;
                ">
                                <i class="bi bi-phone" style="margin-top: 8px"></i>
                                <h4>Whatsapp</h4>
                                <p>
                                    <a href="https://wa.me/628112735100" target="_blank"
                                        style="color: rgb(21, 140, 21); text-decoration: none">
                                        +62 811 273 5100
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- End Contact Section -->
    </main>
    <!-- End #main -->
@endsection
