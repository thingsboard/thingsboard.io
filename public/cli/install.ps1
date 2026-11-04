# ThingsBoard CLI installer for Windows.
#
#   powershell -ExecutionPolicy ByPass -c "irm https://thingsboard.io/cli/install.ps1 | iex"
#
# Installs uv (if it is missing) and ThingsBoard CLI, or upgrades the CLI.
# Then, in an interactive console, starts the guided setup (`tb init --guided`).
# Without a console (CI, an AI agent), it only installs.
#
# Set $env:TB_NO_INIT = "1" to install without starting the setup.

$ErrorActionPreference = 'Stop'

# Windows PowerShell 5.1 turns each stderr line of a native command into an error record,
# and 'Stop' then ends the script, even when the output is redirected. uv writes notices
# to stderr (like "already in PATH"), so run native commands with 'Continue' and check
# $LASTEXITCODE instead.
function Invoke-Native([scriptblock]$Command) {
    $ErrorActionPreference = 'Continue'
    & $Command
}

if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
    Write-Host "Installing uv (Python package manager)..."
    Invoke-Native { powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex" }
    # The uv installer puts uv in this folder; make it usable now.
    $env:Path = "$env:USERPROFILE\.local\bin;$env:Path"
    if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
        Write-Host "uv was installed, but this console cannot find it. Open a new console and run this command again."
        exit 1
    }
}

Write-Host "Installing ThingsBoard CLI..."
Invoke-Native { uv tool install --upgrade --quiet thingsboard-cli }
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Invoke-Native { uv tool update-shell *> $null }

$tb = Join-Path ((Invoke-Native { uv tool dir --bin }) | Out-String).Trim() "tb.exe"
Write-Host "OK ThingsBoard CLI installed"

if ($env:TB_NO_INIT) {
    Write-Host "Run 'tb init' to create a project."
    exit 0
}

if ([Environment]::UserInteractive -and -not [Console]::IsInputRedirected -and -not [Console]::IsOutputRedirected) {
    Write-Host ""
    & $tb init --guided
    exit $LASTEXITCODE
}

Write-Host "Run 'tb init' in your project folder to continue."
