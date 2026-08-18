import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AdminBeerMastersScreen } from './components/AdminBeerMastersScreen';
import { AdminDashboardScreen } from './components/AdminDashboardScreen';
import { AdminRestaurantsScreen } from './components/AdminRestaurantsScreen';
import { LoginScreen } from './components/LoginScreen';
import { PageTransition } from './components/PageTransition';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RateBeerMasterScreen } from './components/RateBeerMasterScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { RememberPasswordScreen } from './components/RememberPasswordScreen';
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
        <Route
          path={ROUTES.adminHome}
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['owner', 'heineken']}>
                <AdminDashboardScreen />
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.adminRestaurants}
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['owner', 'heineken', 'restaurant']}>
                <AdminRestaurantsScreen />
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.adminBeerMasters}
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['owner', 'heineken', 'restaurant']}>
                <AdminBeerMastersScreen />
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.authLogin}
          element={
            <PageTransition>
              <LoginScreen />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.authRegister}
          element={
            <PageTransition>
              <RegisterScreen />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.authRememberPassword}
          element={
            <PageTransition>
              <RememberPasswordScreen />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
