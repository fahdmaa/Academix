# Simple HTTP Server for OUIIPROF on port 3000
param([int]$Port = 3000)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting OUIIPROF Development Server on port $Port..." -ForegroundColor Green
Write-Host "📁 Serving from: $(Get-Location)" -ForegroundColor Cyan

try {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$Port/")
    $listener.Start()

    Write-Host "✅ Server started successfully!" -ForegroundColor Green
    Write-Host "🌐 Open your browser and navigate to:" -ForegroundColor Yellow
    Write-Host "   http://localhost:$Port" -ForegroundColor White
    Write-Host "   http://localhost:$Port/index.html" -ForegroundColor White
    Write-Host "" -ForegroundColor White
    Write-Host "📋 Available HTML files:" -ForegroundColor Cyan

    Get-ChildItem -Filter "*.html" | ForEach-Object {
        Write-Host "   - http://localhost:$Port/$($_.Name)" -ForegroundColor Gray
    }

    Write-Host "" -ForegroundColor White
    Write-Host "⚡ Press Ctrl+C to stop the server" -ForegroundColor Red

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/" -or $localPath -eq "") {
            $localPath = "/index.html"
        }

        $filePath = Join-Path (Get-Location) $localPath.TrimStart('/')

        try {
            if (Test-Path $filePath -PathType Leaf) {
                $content = Get-Content $filePath -Raw -Encoding UTF8

                # Set content type based on file extension
                $contentType = switch ([IO.Path]::GetExtension($filePath)) {
                    ".html" { "text/html; charset=utf-8" }
                    ".css"  { "text/css; charset=utf-8" }
                    ".js"   { "application/javascript; charset=utf-8" }
                    ".json" { "application/json; charset=utf-8" }
                    ".png"  { "image/png" }
                    ".jpg"  { "image/jpeg" }
                    ".jpeg" { "image/jpeg" }
                    ".gif"  { "image/gif" }
                    ".ico"  { "image/x-icon" }
                    ".svg"  { "image/svg+xml" }
                    default { "text/plain; charset=utf-8" }
                }

                $response.ContentType = $contentType
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            } else {
                $response.StatusCode = 404
                $notFound = @"
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
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($notFound)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
        } catch {
            Write-Host "Error processing request for $localPath : $($_.Exception.Message)" -ForegroundColor Red
            $response.StatusCode = 500
            $errorMsg = "<h1>500 - Internal Server Error</h1><p>$($_.Exception.Message)</p>"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($errorMsg)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }

        $response.OutputStream.Close()
    }
} catch {
    Write-Host "❌ Error starting server: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure you're running this as Administrator if port $Port is below 1024" -ForegroundColor Yellow
} finally {
    if ($listener -and $listener.IsListening) {
        $listener.Stop()
        Write-Host "Server stopped." -ForegroundColor Cyan
    }
}
