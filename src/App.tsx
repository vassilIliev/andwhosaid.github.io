import { useEffect, useRef } from 'react';
import { useHashRoute } from './hooks/useHashRoute';
import Home from './pages/Home';
import Photographer from './pages/Photographer';
import Videographer from './pages/Videographer';

export default function App() {
  const { route, anchor, seq } = useHashRoute();
  const prevRoute = useRef(route);

  useEffect(() => {
    if (prevRoute.current !== route) {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = '';
      });
    }
    prevRoute.current = route;
  }, [route]);

  if (route === 'photographer') return <Photographer />;
  if (route === 'videographer') return <Videographer />;
  return <Home anchor={anchor} seq={seq} />;
}
