import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/transcribe')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/transcribe"!</div>
}
