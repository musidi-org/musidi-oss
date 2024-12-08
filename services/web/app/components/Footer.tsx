import { Link } from '@tanstack/react-router'

export const Footer = () => {
  return (
    <footer className="border-t flex gap-4 py-8 justify-center underline">
      <Link to="/legal/terms">Terms</Link>
      <Link to="/legal/privacy">Privacy</Link>
      <a href="https://github.com/musidi-org/musidi-oss" rel="noreferrer" target="_blank">
        Github
      </a>
    </footer>
  )
}
