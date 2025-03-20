import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Sample from './Sample'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './Protections/ProtectedRoute'
import PlusOnePage from './pages/PlusOnePage'
import PlusOneKeralaSyllabusPage from './pages/plusone/PlusOneKeralaSyllabusPage'
import PlusOneCBSEPage from './pages/plusone/PlusOneCBSEPage'
import Dashboard from './pages/AdminPages/Dashboard'
import Layout from './components/Admin side/Layout'
import Users from './pages/AdminPages/Users'
import Questions from './pages/AdminPages/Questions'
import PlusOneChapters from './pages/plusone/CBSE/PlusOneChapters'
import SubjectForm from './pages/AdminPages/SubjectForm'
 

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sample" element={<Sample />} />

        <Route path="/" element={ <ProtectedRoute> <Home />    </ProtectedRoute>      } />
        <Route path="/plusone" element={ <ProtectedRoute> <PlusOnePage />    </ProtectedRoute>      } />
        <Route path="/plusone/chapters" element={ <ProtectedRoute> <PlusOneChapters />    </ProtectedRoute>      } />
        <Route path="/plusone/kerala-syllabus" element={ <ProtectedRoute> <PlusOneKeralaSyllabusPage />    </ProtectedRoute>      } />
        <Route path="/plusone/cbse" element={ <ProtectedRoute> <PlusOneCBSEPage />    </ProtectedRoute>      } />


        <Route path="/admin-dashboard" element={<Layout />} >
          <Route path="dash" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="questions" element={<Questions />} />
          <Route path="sub-form" element={<SubjectForm />} />
        
        </Route>

      </Routes>
    </Router>
  )
}

export default App
