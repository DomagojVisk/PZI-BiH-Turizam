<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
@include('head')
<body>
    <div class="login-container">
        <div class="logo">
            <img src="{{ asset('storage/logo.png') }}" alt="logo" />
        </div>
        <h1 class="mt-4 mb-4">BiH Turizam</h1>
        <form class="login-form" method="POST" action="/auth/login">
            {!! csrf_field() !!}
            <div class="mb-3">
                <label for="email" class="form-label">Email adresa</label>
                <input type="email" class="form-control" name="email" placeholder="Email adresa" />
            </div>
            <div class="mb-3">
                <label for="password" class="forrm-label">Lozinka</label>
                <input type="password" class="form-control" name="password" placeholder="Lozinka" />
            </div>
            <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-block">Prijava</button>
            </div>
        </form>
    </div>
</body>
</html>
