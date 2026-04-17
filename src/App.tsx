import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation, Footer, ScrollToTop } from './components/common'
import './styles/globals.css'

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Mentors = lazy(() => import('./pages/Mentors'))
const LeadershipMessages = lazy(() => import('./pages/LeadershipMessages'))
const Programs = lazy(() => import('./pages/Programs'))
const BharatYuva2026 = lazy(() => import('./pages/BharatYuva2026'))
const UdayanCareInitiative = lazy(() => import('./pages/UdayanCareInitiative'))
const ChennaiSummit180dc = lazy(() => import('./pages/ChennaiSummit180dc'))
const DholpurDrive = lazy(() => import('./pages/DholpurDrive'))
const Media = lazy(() => import('./pages/Media'))
const Publications = lazy(() => import('./pages/Publications'))
const CaseStudyEditor = lazy(() => import('./pages/CaseStudyEditor'))
const CaseStudyArticle = lazy(() => import('./pages/CaseStudyArticle'))
const Contact = lazy(() => import('./pages/Contact'))
const Partner = lazy(() => import('./pages/Partner'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
)

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App min-h-screen flex flex-col">
        {/* Skip to main content link for keyboard navigation */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        
        <Navigation />
        
        <main id="main-content" className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/mentors" element={<Mentors />} />
              <Route path="/about/messages" element={<LeadershipMessages />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/dholpur-drive" element={<DholpurDrive />} />
              <Route path="/programs/bharat-yuva-2026" element={<BharatYuva2026 />} />
              <Route path="/programs/udayan-care-initiative" element={<UdayanCareInitiative />} />
              <Route path="/programs/180dc-chennai-summit" element={<ChennaiSummit180dc />} />
              <Route path="/media" element={<Media />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/publications/editor" element={<CaseStudyEditor />} />
              <Route path="/publications/:id" element={<CaseStudyArticle />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
