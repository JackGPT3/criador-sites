# Deploy — Modo Fluxo
# Conta: jack.chica01@gmail.com (modofluxo-6433)
# Gerar token em: vercel.com/account/tokens (logado na conta do Modo Fluxo)

$token = $env:VERCEL_TOKEN_MODOFLUXO

if (-not $token) {
    Write-Host "ERRO: variavel VERCEL_TOKEN_MODOFLUXO nao definida." -ForegroundColor Red
    Write-Host "Defina com: `$env:VERCEL_TOKEN_MODOFLUXO = 'seu_token'" -ForegroundColor Yellow
    exit 1
}

Write-Host "Deployando na conta do Modo Fluxo..." -ForegroundColor Cyan
vercel --token $token --prod
