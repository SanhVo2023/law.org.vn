import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all pathnames EXCEPT: /admin/*, /api/*, /_next/*, /_vercel/*, favicon, static files
  matcher: ['/((?!admin|api|_next|_vercel|.*\\..*).*)'],
}
