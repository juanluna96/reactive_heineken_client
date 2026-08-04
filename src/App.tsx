import { Route, Routes } from 'react-router-dom';
import { RegistrationScreen } from './components/RegistrationScreen';
import { WatchExperienceScreen } from './components/WatchExperienceScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ROUTES } from './routes';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.welcome} element={<WelcomeScreen />} />
      <Route path={ROUTES.registration} element={<RegistrationScreen />} />
      <Route path={ROUTES.watchExperience} element={<WatchExperienceScreen />} />
    </Routes>
  );
}

export default App;
