import { useEffect, useState } from 'react';

export type Route = 'home' | 'photographer' | 'videographer';

function parse(hash: string): Route {
  const clean = hash.replace(/^#\/?/, '').toLowerCase();
  if (clean === 'photographer') return 'photographer';
  if (clean === 'videographer') return 'videographer';
  return 'home';
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      const next = parse(window.location.hash);
      setRoute((prev) => {
        if (prev !== next) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
