
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    @include('head')
    <body>
        <nav class="navbar navbar-light bg-light px-4">
            <a class="navbar-brand" href="#">
                <img src="{{ asset('storage/logo.png') }}" width="30" height="30" class="d-inline-block align-top" alt="">
                BiH Turizam
            </a>
            <div>
            <span>Hello, {{auth()->user()->name()}}</span>
            <button class="btn btn-outline-primary my2 my-sm-0">Logout</button>
            </div>
        </nav>
        <div class="container">

        </div>
    </body>
</html>

<script>

</script>
