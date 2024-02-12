<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="{{ asset('favicon.ico') }}">
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <link rel="manifest" href="{{ asset('xmemes.webmanifest') }}">

        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SK1GK3DSKZ"></script>
        <script>
            if (typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-SK1GK3DSKZ');
            }
        </script>

        <!-- Icons set -->
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">

        @foreach ($languageUrls as $language => $url)
            <link rel="alternate" hreflang="{{ $language }}" href="{{ url('/') }}/{{ $url }}" />
        @endforeach

        <!-- Scripts -->
        @routes
        @vite('resources/js/app.js')
        @inertiaHead
    </head>
    <body class="font-sans antialiased !mb-0">
        @inertia
        <script>
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
                    // console.log('Service worker registration succeeded:', registration);
                }, function(error) {
                    // console.log('Service worker registration failed:', error);
                });
            } else {
                // console.log('Service workers are not supported.');
            }
        </script>
    </body>
</html>
