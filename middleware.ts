import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Xử lý request ở đây
  return NextResponse.next();
}

// (tuỳ chọn) Config matcher
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
