import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  
  // Check the secret and next parameters
  if (secret !== process.env.PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  // Enable Preview Mode by setting the cookies
  cookies().set('next-preview-data', 'preview-mode')

  return NextResponse.redirect(new URL('/', request.url))
}