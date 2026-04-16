import { useEffect, useLayoutEffect } from 'react';
import Nav from '../sections/Nav/Nav';
import Footer from '../sections/Footer/Footer';
import BioPage from '../sections/BioPage/BioPage';

const gallery = [
  { src: 'assets/Sirkatov/PANA1879.jpg', alt: 'Портретна фотография' },
  { src: 'assets/Sirkatov/_MG_0269.jpg', alt: 'Модна фотография' },
  { src: 'assets/Sirkatov/_MG_0491.jpg', alt: 'Студийна фотография' },
  { src: 'assets/Sirkatov/_MG_1583.jpg', alt: 'Портретна фотография' },
  { src: 'assets/Sirkatov/_MG_0313.jpg', alt: 'Арт фотография' },
  { src: 'assets/Sirkatov/PANA1345.jpg', alt: 'Документална фотография' },
];

export default function Photographer() {
  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Nav />
      <main>
        <BioPage
          badge="Фотограф"
          tagline="Изкуството да спреш времето."
          paragraphs={[
            'Георги Сиркатов е фотограф, роден в София, България. Интересът на Георги към визуалните изкуства започва още в детството. Той учи в художествена гимназия, където усвоява различни техники в живописта и скулптурата и експериментира с разнообразни материали. Там той започва и да изследва аналоговата фотография, ранните дигитални камери и видеокамери.',
            'През годините работи с множество български и световни брандове — Huawei, Ivet Fashion, L\u2019Europeo и др.',
          ]}
          quote={'\u201EЩе се радвам да разкажа твоята история чрез най-красивите ти кадри и профили.\u201C'}
          portrait={{
            src: 'assets/Sirkatov/IMG_1813.png',
            alt: 'Портрет на Георги Сиркатов',
          }}
          gallery={gallery}
        />
      </main>
      <Footer />
    </>
  );
}
