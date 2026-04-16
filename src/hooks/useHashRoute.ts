import { useEffect, useState } from 'react';

export type Route = 'home' | 'photographer' | 'videographer';
export type HashState = { route: Route; anchor: string | null; seq: number };

const SECTION_IDS = new Set(['services', 'about', 'contact', 'top']);

let seq = 0;

function parse(hash: string): HashState {
  const clean = hash.replace(/^#\/?/, '').toLowerCase();
  if (clean === 'photographer') return { route: 'photographer', anchor: null, seq: ++seq };
  if (clean === 'videographer') return { route: 'videographer', anchor: null, seq: ++seq };
  if (SECTION_IDS.has(clean)) return { route: 'home', anchor: clean, seq: ++seq };
  return { route: 'home', anchor: null, seq: ++seq };
}

export function useHashRoute(): HashState {
  const [state, setState] = useState<HashState>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      const next = parse(window.location.hash);
      setState(next);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return state;
}
