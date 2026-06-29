import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Pricing from '@/pages/Pricing'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Dashboard from '@/pages/Dashboard'
import RiskAssessmentPage from '@/pages/generators/RiskAssessmentPage'
import ToolboxTalkPage from '@/pages/generators/ToolboxTalkPage'
import MethodStatementPage from '@/pages/generators/MethodStatementPage'
import HIRAPage from '@/pages/generators/HIRAPage'
import PolicyPage from '@/pages/generators/PolicyPage'
import PTWPage from '@/pages/generators/PTWPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/pricing"             element={<Pricing />} />
          <Route path="/login"               element={<Login />} />
          <Route path="/signup"              element={<Signup />} />
          <Route path="/dashboard"           element={<Dashboard />} />
          <Route path="/generators/risk-assessment"  element={<RiskAssessmentPage />} />
          <Route path="/generators/toolbox-talk"     element={<ToolboxTalkPage />} />
          <Route path="/generators/method-statement" element={<MethodStatementPage />} />
          <Route path="/generators/hira"             element={<HIRAPage />} />
          <Route path="/generators/policy"           element={<PolicyPage />} />
          <Route path="/generators/ptw"              element={<PTWPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
