import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server'

export async function middleware(request) {

    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup" || path === "verifyemail"

    const token = request.cookies.get("token")?.value || "";

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

    const isApiRoute = path.startsWith('/api/');
    if (isApiRoute) {
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        try {
            const { payload } = await jwtVerify(token, secret);
            const response = NextResponse.next();
            response.headers.set('X-User-ID', payload.id);
            return response;
        } catch (error) {
            console.error('Token verification failed:', error);
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*', '/login/:path*', "/api/book/:path*",]
}