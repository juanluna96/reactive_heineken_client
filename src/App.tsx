import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AdminBeerMastersScreen } from './components/AdminBeerMastersScreen';
import { AdminDashboardScreen } from './components/AdminDashboardScreen';
import { AdminRatingsScreen } from './components/AdminRatingsScreen';
import { AdminRestaurantsScreen } from './components/AdminRestaurantsScreen';
import { AdminSettingsScreen } from './components/AdminSettingsScreen';
import { LoginScreen } from './components/LoginScreen';
import { NotFoundScreen } from './components/NotFoundScreen';
import { PageTransition } from './components/PageTransition';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RateBeerMasterScreen } from './components/RateBeerMasterScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { RememberPasswordScreen } from './components/RememberPasswordScreen';
import { ResetPasswordScreen } from './components/ResetPasswordScreen';
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
        <Route path={ROUTES.admin} element={<Navigate to={ROUTES.authLogin} replace />} />
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
          path={ROUTES.adminRatings}
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['owner', 'heineken', 'restaurant']}>
                <AdminRatingsScreen />
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.adminSettings}
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['owner']}>
                <AdminSettingsScreen />
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
        <Route
          path={ROUTES.authResetPassword}
          element={
            <PageTransition>
              <ResetPasswordScreen />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFoundScreen />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
