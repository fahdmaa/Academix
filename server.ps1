# Simple HTTP Server for OUIIPROF on port 3000
Write-Host "Starting OUIIPROF Development Server on port 3000..." -ForegroundColor Green
Write-Host "Serving from: $(Get-Location)" -ForegroundColor Cyan

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:3000/")

$listener.Start()
Write-Host "Server started successfully!" -ForegroundColor Green
Write-Host "Open your browser and navigate to: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red

while ($true) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $localPath = $request.Url.LocalPath
    if ($localPath -eq "/" -or $localPath -eq "") {
        $localPath = "/index.html"
    }

    $filePath = Join-Path (Get-Location) $localPath.TrimStart('/')

    if (Test-Path $filePath -PathType Leaf) {
        $content = Get-Content $filePath -Raw -Encoding UTF8

        # Set content type based on file extension
        $ext = [IO.Path]::GetExtension($filePath)
        if ($ext -eq ".html") { $response.ContentType = "text/html" }
        elseif ($ext -eq ".css") { $response.ContentType = "text/css" }
        elseif ($ext -eq ".js") { $response.ContentType = "application/javascript" }
        elseif ($ext -eq ".json") { $response.ContentType = "application/json" }
        elseif ($ext -eq ".png") { $response.ContentType = "image/png" }
        elseif ($ext -eq ".jpg") { $response.ContentType = "image/jpeg" }
        elseif ($ext -eq ".jpeg") { $response.ContentType = "image/jpeg" }
        elseif ($ext -eq ".gif") { $response.ContentType = "image/gif" }
        elseif ($ext -eq ".ico") { $response.ContentType = "image/x-icon" }
        elseif ($ext -eq ".svg") { $response.ContentType = "image/svg+xml" }
        else { $response.ContentType = "text/plain" }

        $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } else {
        $response.StatusCode = 404
        $notFound = "404 - File Not Found: $localPath"
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($notFound)
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    }

    $response.OutputStream.Close()
}

$listener.Stop()
