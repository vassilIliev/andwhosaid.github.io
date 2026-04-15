import { useEffect, useState } from 'react';

export type Route = 'home' | 'photographer' | 'videographer';
export type HashState = { route: Route; anchor: string | null };

const SECTION_IDS = new Set(['services', 'about', 'contact', 'top']);

function parse(hash: string): HashState {
  const clean = hash.replace(/^#\/?/, '').toLowerCase();
  if (clean === 'photographer') return { route: 'photographer', anchor: null };
  if (clean === 'videographer') return { route: 'videographer', anchor: null };
  if (SECTION_IDS.has(clean)) return { route: 'home', anchor: clean };
  return { route: 'home', anchor: null };
}

export function useHashRoute(): HashState {
  const [state, setState] = useState<HashState>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      const next = parse(window.location.hash);
      setState((prev) => {
        if (prev.route !== next.route && !next.anchor) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return state;
}
