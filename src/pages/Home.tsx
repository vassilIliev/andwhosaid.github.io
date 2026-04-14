import Nav from '../sections/Nav/Nav';
import Hero from '../sections/Hero/Hero';
import Services from '../sections/Services/Services';
import Location from '../sections/Location/Location';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Location />
      </main>
    </>
  );
}
