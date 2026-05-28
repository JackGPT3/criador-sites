import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const apiKey = process.env.MAILERLITE_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Serviço indisponível' }, { status: 500 })
  }

  const body: Record<string, unknown> = { email }

  const groupId = process.env.MAILERLITE_GROUP_ID
  if (groupId) {
    body.groups = [groupId]
  }

  const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok && res.status !== 409) {
    return NextResponse.json({ error: 'Erro ao inscrever' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
