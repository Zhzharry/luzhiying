$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$env:COMPOSE_PROJECT_NAME = "luyingweb"
docker compose up -d --build
docker compose ps
