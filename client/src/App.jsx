import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./assets/pages/Home";
import Signup from "./assets/pages/Signup";
import Login from "./assets/pages/Login";
import Nav from "./assets/components/Nav";
import Footer from "./assets/components/Footer";
import { useAuthContext } from "../hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className="relative px-5 sm:px-14 md:px-24">
      <Nav />
      <div className="grid grid-cols-7 h-screen grid-rows-2">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
