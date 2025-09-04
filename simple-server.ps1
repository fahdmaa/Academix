# Simple HTTP Server for OUIIPROF on port 3000
Write-Host "🚀 Starting OUIIPROF Development Server on port 3000..." -ForegroundColor Green
Write-Host "📁 Serving from: $(Get-Location)" -ForegroundColor Cyan

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:3000/")

try {
    $listener.Start()
    Write-Host "✅ Server started successfully!" -ForegroundColor Green
    Write-Host "🌐 Open your browser and navigate to:" -ForegroundColor Yellow
    Write-Host "   http://localhost:3000" -ForegroundColor White
    Write-Host "   http://localhost:3000/index.html" -ForegroundColor White
    Write-Host "" -ForegroundColor White
    Write-Host "⚡ Press Ctrl+C to stop the server" -ForegroundColor Red

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
            try {
                $content = Get-Content $filePath -Raw -Encoding UTF8

                # Set content type based on file extension
                $ext = [IO.Path]::GetExtension($filePath)
                switch ($ext) {
                    ".html" { $response.ContentType = "text/html; charset=utf-8" }
                    ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                    ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                    ".json" { $response.ContentType = "application/json; charset=utf-8" }
                    ".png"  { $response.ContentType = "image/png" }
                    ".jpg"  { $response.ContentType = "image/jpeg" }
                    ".jpeg" { $response.ContentType = "image/jpeg" }
                    ".gif"  { $response.ContentType = "image/gif" }
                    ".ico"  { $response.ContentType = "image/x-icon" }
                    ".svg"  { $response.ContentType = "image/svg+xml" }
                    default { $response.ContentType = "text/plain; charset=utf-8" }
                }

                $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
                Write-Host "Served: $localPath" -ForegroundColor Gray
            } catch {
                Write-Host "Error reading file $filePath : $($_.Exception.Message)" -ForegroundColor Red
                $response.StatusCode = 500
                $errorContent = "<h1>500 - Internal Server Error</h1><p>Error reading file.</p>"
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($errorContent)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
        } else {
            $response.StatusCode = 404
            $notFoundContent = @"
<!DOCTYPE html>
<html>
<head><title>404 - File Not Found</title></head>
<body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
    <h1 style="color: #e74c3c;">404 - File Not Found</h1>
    <p>The requested file <strong>$localPath</strong> was not found on this server.</p>
    <p><a href="/index.html">Go to homepage</a></p>
</body>
</html>
"@
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($notFoundContent)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            Write-Host "404: $localPath" -ForegroundColor Yellow
        }

        $response.OutputStream.Close()
    }
} catch {
    Write-Host "❌ Error starting server: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    $listener.Stop()
    Write-Host "Server stopped." -ForegroundColor Cyan
}
