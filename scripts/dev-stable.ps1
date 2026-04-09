$ErrorActionPreference = 'SilentlyContinue'

Write-Host '[dev:stable] Stopping existing server on port 3000 (if any)...'
$portLines = netstat -ano | Select-String ':3000' | Select-String 'LISTENING'
foreach ($line in $portLines) {
  $parts = ($line.ToString() -split '\s+') | Where-Object { $_ -ne '' }
  $pid = $parts[-1]
  if ($pid -match '^\d+$') {
    Stop-Process -Id ([int]$pid) -Force
  }
}

Write-Host '[dev:stable] Stopping lingering Next.js dev processes...'
$nodeProcesses = Get-CimInstance Win32_Process -Filter "name='node.exe'"
foreach ($procInfo in $nodeProcesses) {
  $cmd = $procInfo.CommandLine
  if ($cmd -and ($cmd -match 'next dev' -or $cmd -match 'node_modules\\next')) {
    Stop-Process -Id $procInfo.ProcessId -Force
  }
}
Start-Sleep -Milliseconds 800

$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

if (Test-Path '.next') {
  Write-Host '[dev:stable] Clearing .next cache...'
  Remove-Item '.next' -Recurse -Force
}

$ErrorActionPreference = 'Stop'
$logOut = Join-Path $repo '.devserver.out.log'
$logErr = Join-Path $repo '.devserver.err.log'
if (Test-Path $logOut) { Remove-Item $logOut -Force }
if (Test-Path $logErr) { Remove-Item $logErr -Force }

Write-Host '[dev:stable] Starting Next.js on http://localhost:3000 ...'
$proc = Start-Process -FilePath 'cmd.exe' `
  -ArgumentList '/c','npm run dev -- --port 3000' `
  -WorkingDirectory $repo `
  -WindowStyle Hidden `
  -RedirectStandardOutput $logOut `
  -RedirectStandardError $logErr `
  -PassThru

$started = $false
for ($i = 0; $i -lt 50; $i++) {
  Start-Sleep -Milliseconds 300
  $port = netstat -ano | Select-String ':3000' | Select-String 'LISTENING'
  if ($port) {
    $started = $true
    break
  }
}

if ($started) {
  Write-Host "[dev:stable] Ready. PID=$($proc.Id) URL=http://localhost:3000"
  $global:LASTEXITCODE = 0
  exit 0
}

Write-Host '[dev:stable] Server did not come up. Last log lines:'
if (Test-Path $logOut) {
  Get-Content $logOut -Tail 20
}
if (Test-Path $logErr) {
  Get-Content $logErr -Tail 20
}
exit 1
