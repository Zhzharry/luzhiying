$ErrorActionPreference = "SilentlyContinue"

$root = Split-Path -Parent $PSScriptRoot
$runtime = Join-Path $root ".runtime"

foreach ($name in @("backend.pid", "frontend.pid")) {
  $file = Join-Path $runtime $name
  if (Test-Path $file) {
    $pid = Get-Content $file
    Stop-Process -Id $pid -Force
    Remove-Item $file -Force
  }
}

Set-Location $root
$env:COMPOSE_PROJECT_NAME = "luyingweb"
docker compose stop mysql | Out-Null
