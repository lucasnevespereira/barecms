const Header = () => {

  return (
    <header className="container flex justify-between items-center mx-auto">
      <a href="/" className="logo text-primary text-2xl cursor-pointer">barecms.</a>
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