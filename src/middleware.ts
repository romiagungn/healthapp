// src/middleware.ts
export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        /*
         * Cocokkan semua path request KECUALI yang dimulai dengan:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - login (halaman login itu sendiri) <-- Pengecualian paling penting
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    ],
}