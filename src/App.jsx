import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { PromoHome } from './pages/PromoHome';
import { Search } from './pages/Search';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Quiz } from './pages/Quiz';
import { Welcome } from './pages/Welcome';
import { LandingQuiz } from './pages/LandingQuiz';
import { ContestRules } from './pages/ContestRules';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { BottomNav } from './components/BottomNav';
import { CoinsProvider } from './context/CoinsContext';
import { SettingsProvider } from './context/SettingsContext';
import { useCoins } from './hooks/useCoins';



function ProtectedRoute({ children, allowUnclaimed }) {
  const { hasClaimedBonus, hasSeenLanding } = useCoins();
  const location = useLocation();

  if (!hasSeenLanding && location.pathname !== '/landing') {
    return <Navigate to="/landing" replace />;
  }

  if (hasSeenLanding && !hasClaimedBonus && !allowUnclaimed && location.pathname !== '/welcome') {
    return <Navigate to="/welcome" replace />;
  }

  return children;
}

function AppContent() {
  const location = useLocation();
  // Hide bottom nav on Quiz, Welcome, Landing, and PromoHome screens
  const showBottomNav = !location.pathname.startsWith('/quiz') && !location.pathname.startsWith('/welcome') && !location.pathname.startsWith('/landing') && !location.pathname.startsWith('/promo-home');

  return (
    <>
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar relative z-10">
        <Routes>
          <Route path="/landing" element={<ProtectedRoute allowUnclaimed><LandingQuiz /></ProtectedRoute>} />
          <Route path="/welcome" element={<ProtectedRoute allowUnclaimed><Welcome /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/promo-home" element={<ProtectedRoute><PromoHome /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/rules" element={<ProtectedRoute><ContestRules /></ProtectedRoute>} />
          <Route path="/terms" element={<ProtectedRoute><TermsAndConditions /></ProtectedRoute>} />
          <Route path="/quiz/:categoryId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        </Routes>
      </div>
      {showBottomNav && <BottomNav />}
    </>
  );
}

function App() {
  return (
    <SettingsProvider>
      <CoinsProvider>
        <Router>
          {/* Desktop wrapper with blurred backdrop to simulate mobile device */}
          <div className="h-[100dvh] w-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-0">
            
            {/* The App Container touching top and bottom */}
            <div 
              className="relative w-full h-[100dvh] max-w-[430px] bg-background overflow-hidden flex flex-col shadow-2xl mx-auto"
              style={{ transform: 'translateZ(0)' }}
            >
              <AppContent />
            </div>
            
          </div>
        </Router>
      </CoinsProvider>
    </SettingsProvider>
  );
}

export default App;
