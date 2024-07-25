const Header = () => {

  return (
    <header className="container flex justify-between items-center mx-auto">
      <a href="/" className="logo flex items-center gap-1 cursor-pointer">
        <img src="/icon.svg" alt="logo" className="w-6 h-6" />
        <span className="text-2xl font-bold">barecms.</span>
      </a>
      <div className="actions">
        <div>
          <a href="/" className="btn btn-dark">
            My Sites
          </a>
        </div>
      </div>
    </header>
  )
}
export default Header;