import { useEffect } from 'react';
import Nav from '../sections/Nav/Nav';
import Hero from '../sections/Hero/Hero';
import Services from '../sections/Services/Services';
import Location from '../sections/Location/Location';
import Booking from '../sections/Booking/Booking';
import Footer from '../sections/Footer/Footer';

type Props = { anchor: string | null };

export default function Home({ anchor }: Props) {
  useEffect(() => {
    if (!anchor || anchor === 'top') {
      if (anchor === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(raf);
  }, [anchor]);

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
