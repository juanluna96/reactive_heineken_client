import { Route, Routes } from 'react-router-dom';
import { RateBeerMasterScreen } from './components/RateBeerMasterScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { ThankYouScreen } from './components/ThankYouScreen';
import { WatchExperienceScreen } from './components/WatchExperienceScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ROUTES } from './routes';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.welcome} element={<WelcomeScreen />} />
      <Route path={ROUTES.registration} element={<RegistrationScreen />} />
      <Route path={ROUTES.watchExperience} element={<WatchExperienceScreen />} />
      <Route path={ROUTES.rateBeerMaster} element={<RateBeerMasterScreen />} />
      <Route path={ROUTES.thankYou} element={<ThankYouScreen />} />
    </Routes>
  );
}

export default App;
