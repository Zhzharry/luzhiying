$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$runtime = Join-Path $root ".runtime"
New-Item -ItemType Directory -Force -Path $runtime | Out-Null

Set-Location $root

$env:COMPOSE_PROJECT_NAME = "luyingweb"
docker compose up -d mysql | Out-Null

for ($i = 0; $i -lt 90; $i++) {
  $status = docker inspect --format "{{.State.Health.Status}}" luying-mysql
  if ($status -eq "healthy") {
    break
  }
  Start-Sleep -Seconds 2
}

& "D:\programming\Environment\apache-maven-3.9.11\bin\mvn.cmd" -q -DskipTests package -f (Join-Path $root "backend\pom.xml")

$env:SPRING_DATASOURCE_URL = "jdbc:mysql://localhost:13306/luying?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
$env:SPRING_DATASOURCE_USERNAME = "root"
$env:SPRING_DATASOURCE_PASSWORD = "root"

$backend = Start-Process -FilePath "C:\Program Files\Common Files\Oracle\Java\javapath\java.exe" `
  -ArgumentList "-jar", "target/luying-web-backend-0.0.1-SNAPSHOT.jar" `
  -WorkingDirectory (Join-Path $root "backend") `
  -WindowStyle Hidden `
  -RedirectStandardOutput (Join-Path $runtime "backend.out.log") `
  -RedirectStandardError (Join-Path $runtime "backend.err.log") `
  -PassThru

$frontend = Start-Process -FilePath "C:\Program Files\nodejs\node.exe" `
  -ArgumentList ".\\node_modules\\vite\\bin\\vite.js", "--host", "0.0.0.0", "--port", "5173" `
  -WorkingDirectory (Join-Path $root "frontend") `
  -WindowStyle Hidden `
  -RedirectStandardOutput (Join-Path $runtime "frontend.out.log") `
  -RedirectStandardError (Join-Path $runtime "frontend.err.log") `
  -PassThru

Set-Content -Path (Join-Path $runtime "backend.pid") -Value $backend.Id
Set-Content -Path (Join-Path $runtime "frontend.pid") -Value $frontend.Id

Write-Output "MySQL: http://localhost:13306"
Write-Output "Backend: http://localhost:8080/api/camps"
Write-Output "Frontend: http://localhost:5173"
