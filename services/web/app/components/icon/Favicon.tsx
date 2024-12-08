import type { JSX } from 'react'

export function Favicon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" {...props}>
      <title>Musidi logo</title>
      <rect
        x="5.95456"
        y="0.5"
        width="1.28565"
        height="7.71391"
        rx="0.642825"
        fill="currentColor"
        transform="rotate(45 5.95456 0.5)"
      />
      <rect
        x="9.59091"
        y="0.5"
        width="1.28565"
        height="5.1426"
        rx="0.642825"
        fill="currentColor"
        transform="rotate(45 9.59091 0.5)"
      />
      <rect
        x="9.59091"
        y="4.13638"
        width="1.28565"
        height="2.5713"
        rx="0.642825"
        fill="currentColor"
        transform="rotate(45 9.59091 4.13638)"
      />
    </svg>
  )
}
