# Simple HTTP Server for OUIIPROF on port 3000
$port = 3000
$path = Get-Location

Write-Host "Starting OUIIPROF Development Server on port $port..."
Write-Host "Serving from: $path"
Write-Host "Open your browser and navigate to: http://localhost:$port"
Write-Host "Main page: http://localhost:$port/index.html"
Write-Host ""
Write-Host "Press Ctrl+C to stop the server"
Write-Host ""

try {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/" -or $localPath -eq "") {
            $localPath = "/index.html"
        }

        $filePath = Join-Path $path $localPath.TrimStart('/')

        if (Test-Path $filePath -PathType Leaf) {
            try {
                $isImage = $filePath.EndsWith('.png') -or $filePath.EndsWith('.jpg') -or $filePath.EndsWith('.jpeg') -or $filePath.EndsWith('.gif') -or $filePath.EndsWith('.ico') -or $filePath.EndsWith('.svg') -or $filePath.EndsWith('.webp')

                if ($isImage) {
                    # Handle binary files (images)
                    $buffer = [System.IO.File]::ReadAllBytes($filePath)
                } else {
                    # Handle text files
                    $content = Get-Content $filePath -Raw -Encoding UTF8
                    $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
                }

                $response.ContentType = if ($filePath.EndsWith('.html')) { 'text/html' }
                                      elseif ($filePath.EndsWith('.css')) { 'text/css' }
                                      elseif ($filePath.EndsWith('.js')) { 'application/javascript' }
                                      elseif ($filePath.EndsWith('.png')) { 'image/png' }
                                      elseif ($filePath.EndsWith('.jpg') -or $filePath.EndsWith('.jpeg')) { 'image/jpeg' }
                                      elseif ($filePath.EndsWith('.gif')) { 'image/gif' }
                                      elseif ($filePath.EndsWith('.ico')) { 'image/x-icon' }
                                      elseif ($filePath.EndsWith('.svg')) { 'image/svg+xml' }
                                      elseif ($filePath.EndsWith('.webp')) { 'image/webp' }
                                      else { 'text/plain' }

                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
            catch {
                $response.StatusCode = 500
                $errorMsg = "<h1>500 - Internal Server Error</h1><p>Could not read file: $filePath</p>"
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($errorMsg)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
        }
        else {
            $response.StatusCode = 404
            $notFound = "<h1>404 - File Not Found</h1><p>The requested file was not found: $localPath</p>"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($notFound)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }

        $response.OutputStream.Close()
    }
}
catch {
    Write-Host "Error starting server: $_"
}
finally {
    if ($listener -and $listener.IsListening) {
        $listener.Stop()
    }
}
