import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '~/components/Footer'

export const Route = createFileRoute('/legal/privacy')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <main>
        <div>Hello "/legal/privacy"!</div>
      </main>
      <Footer />
    </>
  )
}
