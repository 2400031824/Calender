$ErrorActionPreference = 'SilentlyContinue'

Write-Host '[dev:stop] Stopping server on port 3000...'
$portLines = netstat -ano | Select-String ':3000' | Select-String 'LISTENING'
foreach ($line in $portLines) {
  $parts = ($line.ToString() -split '\s+') | Where-Object { $_ -ne '' }
  $pid = $parts[-1]
  if ($pid -match '^\d+$') {
    Stop-Process -Id ([int]$pid) -Force
  }
}

Write-Host '[dev:stop] Stopping lingering Next.js node processes...'
$nodeProcesses = Get-CimInstance Win32_Process -Filter "name='node.exe'"
foreach ($procInfo in $nodeProcesses) {
  $cmd = $procInfo.CommandLine
  if ($cmd -and ($cmd -match 'next dev' -or $cmd -match 'node_modules\\next')) {
    Stop-Process -Id $procInfo.ProcessId -Force
  }
}

$repo = Split-Path -Parent $PSScriptRoot
$logOut = Join-Path $repo '.devserver.out.log'
$logErr = Join-Path $repo '.devserver.err.log'
if (Test-Path $logOut) { Remove-Item $logOut -Force }
if (Test-Path $logErr) { Remove-Item $logErr -Force }

Write-Host '[dev:stop] Done.'
$global:LASTEXITCODE = 0
exit 0
