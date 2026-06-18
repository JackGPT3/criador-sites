# Deploy — Modo Fluxo
# Conta: jack.chica01@gmail.com (modofluxo-6433)

$envFile = Join-Path $PSScriptRoot "..\\_privado\\.env"

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]+)=(.+)$') {
            [System.Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), 'Process')
        }
    }
}

$token = $env:VERCEL_TOKEN_MODOFLUXO

if (-not $token) {
    Write-Host "ERRO: VERCEL_TOKEN_MODOFLUXO nao encontrado em _privado/.env" -ForegroundColor Red
    exit 1
}

Write-Host "Deployando na conta do Modo Fluxo..." -ForegroundColor Cyan
vercel --token $token --prod
