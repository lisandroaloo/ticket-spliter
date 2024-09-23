import './App.css'
import { Navigate, Route, Routes } from '../node_modules/react-router-dom/dist/index'
import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import { useAuthContext } from './context/AuthContext'
import NavBarLogged from './components/navbars/NavBarLogged'
import NavBarNotLogged from './components/navbars/NavBarNotLogged'
import UserProfile from './pages/UserProfile'
import ProjectsList from './pages/ProjectsList'
import ProjectDetail from './pages/ProjectDetail'

function App() {
  const { authUser } = useAuthContext()

  return (
    <>
      <header className="">{authUser ? <NavBarLogged /> : <NavBarNotLogged />}</header>
      <div className="h-100%">
        {/* Nav */}
        <main className="">
          <Routes>
            <Route
              path="/"
              element={<Landing />}
            />
            <Route
              path="/login"
              element={authUser ? <Navigate to="/" /> : <LogIn />}
            />
            <Route
              path="/signup"
              element={authUser ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
              path="/projects"
              element={authUser ? <ProjectsList /> : <LogIn />}
            />
            <Route
              path="/userprofile"
              element={authUser ? <UserProfile /> : <LogIn />}
            />

            <Route
              path="/projects/:id"
              element={authUser ? <ProjectDetail /> : <LogIn />}
            />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
