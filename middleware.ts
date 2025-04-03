import NextAuth from "next-auth"
import authConfig from "./auth.config"

import {
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT
} from '@/routes'

export const { auth } = NextAuth(authConfig)



export default auth((req) => {

    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return null
    }
    if (isAuthRoute) {
        if (isLoggedIn && !publicRoutes) {
            return Response.redirect(DEFAULT_LOGIN_REDIRECT, nextUrl)
        }
    }


    return null

})



export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
    ]
}