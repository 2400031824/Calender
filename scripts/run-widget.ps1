$ErrorActionPreference = 'Stop'

if (Test-Path Env:ELECTRON_RUN_AS_NODE) {
  Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
}

Get-Process electron -ErrorAction SilentlyContinue | Stop-Process -Force

$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

npx electron ./electron/main.js
