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
import PlusOneChaptersKerala from './pages/plusone/kerala syllabus/PlusOneChapters'
import QuestionListing from './pages/common/QuestionListing'
import SubjectForm from './pages/AdminPages/SubjectForm'
import SubjectList from './pages/AdminPages/SubjectsList'
import ChapterList from './pages/AdminPages/ChaptersList'
import QuestionViewer from './pages/AdminPages/QuestionViewer'
import QuestionDetail from './pages/AdminPages/QuestionDetail'
import AddChapter from './pages/AdminPages/form/AddChapter'
import AddQuestionForm from './pages/AdminPages/form/AddQuestionForm'
 

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
        <Route path="/plusone/chapters/kerala-syllabus" element={ <ProtectedRoute> <PlusOneChaptersKerala />    </ProtectedRoute>      } />
        <Route path="/plusone/kerala-syllabus" element={ <ProtectedRoute> <PlusOneKeralaSyllabusPage />    </ProtectedRoute>      } />
        <Route path="/question-listing" element={ <ProtectedRoute> <QuestionListing />    </ProtectedRoute>      } />
        <Route path="/plusone/cbse" element={ <ProtectedRoute> <PlusOneCBSEPage />    </ProtectedRoute>      } />


        {/*  --------------- ADMIN SIDE --------------*/}
        <Route path="/admin-dashboard" element={<Layout />} >
          <Route path="dash" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="questions" element={<Questions />} />
          <Route path="sub-form" element={<SubjectForm />} />
          <Route path="sub-list" element={<SubjectList />} />
          <Route path="chapters-list/:subjectId/" element={<ChapterList />} />
          <Route path="question-view/:chapterId/" element={<QuestionViewer />} />
          <Route path="question-details/:questionId/" element={<QuestionDetail />} />
          <Route path="add-chapter/:subjectId/" element={<AddChapter />} />
          <Route path="add-question/:chapterId/" element={<AddQuestionForm />} />
        
        </Route>

        {/* ------------- END -------------- */}

      </Routes>
    </Router>
  )
}

export default App
