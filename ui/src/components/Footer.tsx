import { Github } from "lucide-react"

const Footer = () => {
  return (
    <footer className="py-5 text-sm">
      <section className="container flex flex-col md:flex-row gap-5 justify-between items-center">
        <span>© {new Date().getFullYear()}</span>
        <a href="https://github.com/lucasnevespereira/barecms" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 link">
          <Github size={16} />
          <span>View on GitHub</span>
        </a>
      </section>
    </footer>
  )
}

export default Footer