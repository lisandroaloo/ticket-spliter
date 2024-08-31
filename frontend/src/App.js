import './App.css';
import { Route, Routes } from '../node_modules/react-router-dom/dist/index';
import Landing from './components/Landing';
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      {/* Nav */}
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Landing />}
        />
      </Routes>
    </div>
  )
}

export default App;
