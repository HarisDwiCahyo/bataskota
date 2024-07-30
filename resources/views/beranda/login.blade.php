<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href="{{ asset('dashboard/img/Logo kota.png') }}" rel="icon" />

    @foreach (\App\Helpers\ViterHelper::viteAssets($title) as $asset)
        @vite($asset)
    @endforeach
    <title>{{ $title }}</title>
</head>

<body>

    <div class="wrapper"
        style="background-image: url('{{ asset('dashboard/img/background1.jpg') }}'); background-size: cover; background-position: center; background-repeat: no-repeat;">
        <form action="{{ route('loginproses') }}" method="POST">
            @csrf
            <!----------------------------- Form box ----------------------------------->
            <div class="form-box">
                <!------------------- login form -------------------------->
                <div class="login-container" id="login">
                    <div class="top">
                        <span>Don't have an account? <a href="{{ route('home') }}">Dashboard</a></span>
                        <header>Login</header>
                    </div>
                    <div class="input-box">
                        <input type="email" class="input-field" placeholder="Email" name="email">
                        <i class="bx bx-user"></i>
                        @error('email')
                            <small style="color: rgb(255, 255, 255)">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="input-box">
                        <input type="password" class="input-field" placeholder="Password" name="password">
                        <i class="bx bx-lock-alt"></i>
                        @error('password')
                            <small style="color: rgb(255, 255, 255)">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="input-box">
                        <input type="submit" class="submit" value="Sign In">
                    </div>
                    <div class="two-col">
                        <div class="one">
                            <input type="checkbox" id="login-check">
                            <label for="login-check"> Remember Me</label>
                        </div>
                        <div class="two">
                            <label><a href="{{ route('home') }}">Dashboard?</a></label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    @if ($message = Session::get('failed'))
        <script>
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "{{ $message }}",
            });
        </script>
    @endif
</body>

</html>
