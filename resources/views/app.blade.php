<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" href="{{ asset('favicon.ico') }}">
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <link rel="manifest" href="{{ asset('xmemes.webmanifest') }}">

        <!-- Icons set -->
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">

        @foreach ($languageUrls as $language => $url)
            <link rel="alternate" hreflang="{{ $language }}" href="{{ url('/') }}/{{ $url }}" />
        @endforeach

        <!-- Scripts -->
        @routes
        @vite('resources/js/app.js')
        @inertiaHead

        <!-- Tarteaucitron -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tarteaucitronjs/1.16.1/tarteaucitron.min.js"></script>
        <script type="text/javascript">
            tarteaucitron.init({
                "privacyUrl": "", /* Privacy policy url */
                "bodyPosition": "bottom", /* or top to bring it as first element for accessibility */
                "hashtag": "#tarteaucitron", /* Open the panel with this hashtag */
                "cookieName": "tarteaucitron", /* Cookie name */
                "orientation": "bottom", /* Banner position (top - bottom) */
                "groupServices": false, /* Group services by category */
                "showDetailsOnClick": true, /* Click to expand the description */
                "serviceDefaultState": true, /* Default state (true - wait - false) */
                "showAlertSmall": false, /* Show the small banner on bottom right */
                "cookieslist": false, /* Show the cookie list */
                "closePopup": false, /* Show a close X on the banner */
                "showIcon": true, /* Show cookie icon to manage cookies */
                //"iconSrc": "", /* Optionnal: URL or base64 encoded image */
                "iconPosition": "BottomRight", /* BottomRight, BottomLeft, TopRight and TopLeft */
                "adblocker": false, /* Show a Warning if an adblocker is detected */
                "DenyAllCta" : true, /* Show the deny all button */
                "AcceptAllCta" : true, /* Show the accept all button when highPrivacy on */
                "highPrivacy": true, /* HIGHLY RECOMMANDED Disable auto consent */
                "handleBrowserDNTRequest": false, /* If Do Not Track == 1, disallow all */
                "removeCredit": false, /* Remove credit link */
                "moreInfoLink": true, /* Show more info link */
                "useExternalCss": false, /* If false, the tarteaucitron.css file will be loaded */
                "useExternalJs": false, /* If false, the tarteaucitron.js file will be loaded */
                "readmoreLink": "", /* Change the default readmore link */
                "mandatory": true, /* Show a message about mandatory cookies */
                "mandatoryCta": true, /* Show the disabled accept button when mandatory on */
            });
        </script>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/dracula.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

        <!-- and it's easy to individually load additional languages -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"></script>
    </head>
    <body class="font-sans antialiased !mb-0">
        @inertia

        <!-- Service worker -->
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

        <!-- Google Analytics -->
        <script type="text/javascript">
            tarteaucitron.user.gtagUa = 'G-SK1GK3DSKZ';
            tarteaucitron.user.gtagMore = function () { /* add here your optionnal gtag() */ };
            (tarteaucitron.job = tarteaucitron.job || []).push('gtag');
        </script>
    </body>
</html>
