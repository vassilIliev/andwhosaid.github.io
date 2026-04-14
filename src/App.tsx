import { useHashRoute } from './hooks/useHashRoute';
import Home from './pages/Home';
import Photographer from './pages/Photographer';
import Videographer from './pages/Videographer';

export default function App() {
  const route = useHashRoute();
  if (route === 'photographer') return <Photographer />;
  if (route === 'videographer') return <Videographer />;
  return <Home />;
}
