import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
const Nav = () => {
  const { user, dispatch } = useAuthContext();
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <>
      <header className="flex justify-between items-center py-4 border-b-2 border-slate-200 bg-white z-50">
        <div>
          <Link
            to="/"
            className="text-xl md:text-3xl font-semibold tracking-wider text-slate-900 hover:text-slate-700"
          >
            MERN-PAY
          </Link>
        </div>
        <nav>
          {!user && (
            <ul className="flex justify-between items-center gap-2 md:gap-3">
              <li>
                <Link
                  to="/login"
                  className="bg-blue-500 px-1 py-2 md:px-2 md:py-3 hover:bg-blue-400 transition-all duration-300 ease text-white border-transparent rounded-sm shadow-sm shadow-blue-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="bg-blue-500 px-1 py-2 md:px-2 md:py-3 hover:bg-blue-400 transition-all duration-300 ease text-white border-transparent rounded-sm shadow-sm shadow-blue-300"
                >
                  Signup
                </Link>
              </li>
            </ul>
          )}

          {user && (
            <div className="flex gap-2 md:gap-3 items-center">
              <span className="text-blue-800">{user.email}</span>
              <button
                type="button"
                className="bg-blue-500 px-1 py-2 md:px-2 md:py-3 hover:bg-blue-400 transition-all duration-300 ease text-white border-transparent rounded-sm shadow-sm shadow-blue-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Nav;
