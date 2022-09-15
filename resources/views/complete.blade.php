<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <title>Rimcal</title>
    <script>
        window.opener.postMessage({!! $json !!}, '*');
        window.close();
    </script>
</head>
<body>Processing Login</body>
</html>
