import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Sample from './Sample'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './Protections/ProtectedRoute'
import PlusOnePage from './pages/PlusOnePage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sample" element={<Sample />} />

        <Route path="/" element={ <ProtectedRoute> <Home />    </ProtectedRoute>      } />
        <Route path="/plusone" element={ <ProtectedRoute> <PlusOnePage />    </ProtectedRoute>      } />
      </Routes>
    </Router>
  )
}

export default App
