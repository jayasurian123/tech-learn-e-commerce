import { NextRequest, NextResponse } from 'next/server';
import { checkPassword } from './lib/password';

export async function middleware(req: NextRequest) {
  console.log('here....');

  if ((await isAuthenticated(req)) === false) {
    return new NextResponse('Unauthorised', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    });
  }
}

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get('Authorization') || req.headers.get('authorization');

  if (authHeader === null) {
    return false;
  }

  const [userName, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
    .toString()
    .split(':');

  return (
    userName === process.env.ADMIN_USERNAME &&
    (await checkPassword(password, process.env.ADMIN_HASHED_PASSWORD as string))
  );
}

export const config = {
  matcher: '/admin/:path*',
};
