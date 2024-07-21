const Footer = () => {
  return (
    <footer className="py-5 text-sm">
      <section className="container flex flex-col md:flex-row gap-5 justify-center items-center">
        <span>© {new Date().getFullYear()} made by <a className="link" href="https://lucasnp.com" target="_blank">lucasnp</a></span>
      </section>
    </footer>
  )
}

export default Footer