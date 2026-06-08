# Deploy — Professor Alfredo
# Conta: oprofessoralfredo@gmail.com
# Gerar token em: vercel.com/account/tokens (logado na conta do professor)

$token = $env:VERCEL_TOKEN_PROFESSORALFREDO

if (-not $token) {
    Write-Host "ERRO: variavel VERCEL_TOKEN_PROFESSORALFREDO nao definida." -ForegroundColor Red
    Write-Host "Defina com: `$env:VERCEL_TOKEN_PROFESSORALFREDO = 'seu_token'" -ForegroundColor Yellow
    exit 1
}

Write-Host "Deployando na conta do Professor Alfredo..." -ForegroundColor Cyan
vercel --token $token --prod
