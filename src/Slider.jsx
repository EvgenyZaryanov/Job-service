import { useState } from 'react';
import './slider.css';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'https://www.unitalm.ru/assets/images/news/eb6ff26c91a17418d6d3beedaf95272847cde28d.png',
    'https://murman-zan.ru/image?file=/cms_data/usercontent/regionaleditor/%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D1%8B/img/14_.png&theme=default',
    'https://dszn.ru/uploads/cache/storage/27/2d/67e606db190f975d55dd7fc74957a5aa528b05bc.jpeg/6db0b8830ecb034e7ba0141bb5f32d5d',
    'https://czn-yarcevo.admin-smolensk.ru/files/284/maket.jpg',
    'https://sun9-5.userapi.com/qNkemgb-NyG1sCmIlJbC8O2ta7ENY8Tj4nQbSQ/Va2e6TytofA.jpg'
  ];

  const nextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div className="slider">
      <button onClick={prevSlide} className="prev">
        &#10094;
      </button>
      <button onClick={nextSlide} className="next">
        &#10095;
      </button>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={index === currentSlide ? 'slide active' : 'slide'}
          style={{ backgroundImage: `url(${slide})` }}
        ></div>
      ))}
    </div>
  );
};

export default Slider;
