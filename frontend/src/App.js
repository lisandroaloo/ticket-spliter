import './App.css';
import { Route, Routes } from '../node_modules/react-router-dom/dist/index';
import Landing from './components/Landing';
import SignUp from './pages/SignUp';
import NavBar from './components/NavBar'
import LogIn from './pages/LogIn';

function App() {
  return (
    <div className="App ">
      {/* Nav */}
      <header className='mb-12'>
        <NavBar />
      </header>
      <main className='flex-1 bg-white'>
        <Routes>
          <Route
            path="/"
            element={<Landing />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </main>

    </div>
  )
}

export default App;
