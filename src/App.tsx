import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { PageTransition } from './components/PageTransition';
import { RateBeerMasterScreen } from './components/RateBeerMasterScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { ThankYouScreen } from './components/ThankYouScreen';
import { WatchExperienceScreen } from './components/WatchExperienceScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ROUTES } from './routes';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path={ROUTES.welcome}
          element={
            <PageTransition>
              <WelcomeScreen />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.registration}
          element={
            <PageTransition>
              <RegistrationScreen />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.watchExperience}
          element={
            <PageTransition>
              <WatchExperienceScreen />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.rateBeerMaster}
          element={
            <PageTransition>
              <RateBeerMasterScreen />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.thankYou}
          element={
            <PageTransition>
              <ThankYouScreen />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
