import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Nếu URL bắt đầu bằng /en hoặc /vi thì bỏ prefix
  if (pathname.startsWith('/en/') || pathname.startsWith('/vi/')) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = pathname.replace(/^\/(en|vi)/, '');
    return NextResponse.redirect(newUrl);
  }
}
