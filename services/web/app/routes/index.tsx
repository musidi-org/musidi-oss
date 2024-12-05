import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => {
    return (
      <div className="p-2">
        <h3>Hello</h3>
      </div>
    )
  },
})
