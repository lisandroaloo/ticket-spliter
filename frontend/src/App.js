import "./App.css";
import {
  Navigate,
  Route,
  Routes,
} from "../node_modules/react-router-dom/dist/index";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";

import NavBar from "./components/NavBar";
import LogIn from "./pages/LogIn";
import { useAuthContext } from "./context/AuthContext";
import Footer from "./components/Footer";
import Proyects from "./pages/Proyects";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="">
        <NavBar />
      </header>
      <main className="flex-1 bg-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <LogIn />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/proyects"
            element={authUser ? <Proyects /> : <LogIn />}
          />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
