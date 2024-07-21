const Header = () => {

  return (
    <header className="container flex justify-between items-center mx-auto">
      <a href="/" className="logo text-primary text-2xl cursor-pointer">barecms.</a>
      <div className="actions">
        <div>
          {/*<button className="btn btn-dark btn-ghost">*/}
          {/*  User*/}
          {/*</button>*/}
        </div>
      </div>
    </header>
  )
}
export default Header;