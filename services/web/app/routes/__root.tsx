import { Link, Outlet, ScrollRestoration, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Meta, Scripts } from '@tanstack/start'
import { cva } from 'class-variance-authority'
import { Menu, Moon, Sun } from 'lucide-react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import { Favicon } from '~/components/icon/Favicon'
import { ThemeProvider, useTheme } from '~/components/theme-provider'
import { Button } from '~/components/ui/button'
import { NavigationMenu, NavigationMenuList } from '~/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo({
        title: 'Musidi | Fastest, piano audio to midi transcription service',
        description: 'Musidi is the fastest, piano audio to midi transcription service.',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'favicon.svg' },
      { rel: 'icon', type: 'image/svg', sizes: '32x32', href: 'favicon.svg' },
      { rel: 'icon', type: 'image/svg', sizes: '16x16', href: 'favicon.svg' },
      { rel: 'manifest', href: 'site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: 'favicon.svg' },
    ],
  }),

  errorComponent: (props) => {
    return <DefaultCatchBoundary {...props} />
  },

  notFoundComponent: () => <NotFound />,

  component: () => (
    <html lang="ts">
      <head>
        <Meta />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider defaultTheme="light">
          <Nav />
          <Outlet />
        </ThemeProvider>
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  ),
})

const Nav = () => {
  return (
    <nav className="z-50 sticky top-0 bg-background border-b">
      <div className="mx-auto flex justify-between items-center contain p-3 gap-3">
        <HomeLink />
        <div className="items-center flex">
          <div className="hidden gap-3 md:flex">
            <NavLinks />
          </div>
        </div>
        <NavToggles />
      </div>
    </nav>
  )
}

const HomeLink = () => (
  <Link to="/" className="items-center flex gap-3 w-32">
    <Favicon className="w-6 h-6" />
    <p className="my-auto font-bold text-lg">Musidi</p>
    <div className="grow" />
  </Link>
)

const NavToggles = () => (
  <div className="flex items-center justify-end gap-3 w-32">
    <DarkMode />
    <Sheet>
      <SheetTitle hidden>Navbar</SheetTitle>
      <SheetTrigger className="md:hidden">
        <div className="aspect-square p-1">
          <Menu strokeWidth={2.4} className="size-5 m-auto" />
        </div>
      </SheetTrigger>
      <SheetContent side="top" className="p-3">
        <SheetDescription hidden>Navbar links</SheetDescription>
        <HomeLink />
        <div className="p-3 flex items-center flex-col gap-0">
          <NavLinks />
        </div>
      </SheetContent>
    </Sheet>
  </div>
)

const NavLinks = () => {
  const linkStyle = cva('inline-flex h-full items-center px-3 md:py-0 font-medium')
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-col md:flex-row gap-3">
        <a href="https://discord.gg/vV2SguBYJA" target="blank">
          <p className={linkStyle()}>Discord</p>
        </a>
        <Link to="/app/transcribe">
          <p className={linkStyle()}>Transcribe</p>
        </Link>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const DarkMode = () => {
  const { theme, setTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={() => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
      }}
      className="aspect-square p-1 hover:bg-transparent"
    >
      {theme === 'light' ? (
        <Sun strokeWidth={2.4} className="size-5" />
      ) : (
        <Moon strokeWidth={2.4} className="size-5" />
      )}
    </button>
  )
}
