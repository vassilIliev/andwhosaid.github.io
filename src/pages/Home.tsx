import Nav from '../sections/Nav/Nav';
import Hero from '../sections/Hero/Hero';
import Services from '../sections/Services/Services';
import Location from '../sections/Location/Location';
import Booking from '../sections/Booking/Booking';
import Footer from '../sections/Footer/Footer';

export default function Home() {
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
