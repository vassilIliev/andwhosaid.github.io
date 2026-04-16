import { useEffect } from 'react';
import Nav from '../sections/Nav/Nav';
import Hero from '../sections/Hero/Hero';
import Services from '../sections/Services/Services';
import Location from '../sections/Location/Location';
import Booking from '../sections/Booking/Booking';
import Footer from '../sections/Footer/Footer';

type Props = { anchor: string | null; seq: number };

export default function Home({ anchor, seq }: Props) {
  useEffect(() => {
    if (!anchor) return;
    if (anchor === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(raf);
  }, [anchor, seq]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Location />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
