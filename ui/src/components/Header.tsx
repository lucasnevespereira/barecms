import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";

const Header = () => {
  const { logout } = useAuth();
  const { user } = useUser();

  return (
    <header className="container flex justify-between items-center mx-auto">
      <a href="/" className="logo flex items-center gap-1 cursor-pointer">
        <img src="/icon.svg" alt="logo" className="w-6 h-6" />
        <span className="text-2xl font-bold">barecms.</span>
      </a>
      <div className="actions">
        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="font-bold link link-hover">Hello, {user.username}</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-3 w-40 shadow">
              <li className="text-md">
                <a href="/profile">Profile</a>
              </li>
              <li className="text-md">
                <span onClick={logout}>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
export default Header;