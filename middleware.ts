import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode, JwtPayload } from "jwt-decode";
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const nonProtectedPath = ["/sign-in", "/sign-up"];

interface Payload extends JwtPayload {
  role: string
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');

  if (sessionCookie) {
    try {
      if (process.env.SECRET_KEY) {
        const secretKey = Buffer.from(process.env.SECRET_KEY, 'base64');
        await jwtVerify(sessionCookie.value, secretKey); 

        const decoded = jwtDecode<Payload>(sessionCookie.value);

        if (!decoded || !decoded.exp) {
          throw new Error();
        }

        const currentTime = Math.floor(Date.now() / 1000); 
        if (decoded.exp < currentTime) {
          throw new Error();
        } 

        if (pathname === "/add-question") {
          if (decoded.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", request.url)); 
          }
        }
      }
    } catch {
      (await cookies()).delete("session");
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  } else {
    if (!nonProtectedPath.includes(pathname)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
