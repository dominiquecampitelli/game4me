import { useEffect, useRef, useState } from "react";

import GodOfWarRagnarok from "../../assets/images/god-of-war-ragnarok-banner.jpg";
import ResidentEvilRequiem from "../../assets/images/resident-evil-requiem-banner.jpg";
import GrandTheftAuto6 from "../../assets/images/grand-theft-auto-6-banner.jpg";
import CallOfDutyBlackOps7 from "../../assets/images/call-of-duty-black-ops-7-banner.jpg";
import ArrowLeft from "../../assets/svg/arrow-left.svg";
import ArrowRight from "../../assets/svg/arrow-right.svg";

import "./styles.css";

const mockBanners = [
  {
    id: 1,
    title: "God Of War Ragnarok",
    image: GodOfWarRagnarok,
  },
  {
    id: 2,
    title: "Resident Evil Requiem",
    image: ResidentEvilRequiem,
  },
  {
    id: 3,
    title: "Grand Theft Auto 6",
    image: GrandTheftAuto6,
  },
  {
    id: 4,
    title: "Call Of Duty Black Ops 7",
    image: CallOfDutyBlackOps7,
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === mockBanners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? mockBanners.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [paused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      nextSlide();
    }

    if (distance < -50) {
      prevSlide();
    }
  };

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-banner">
        <div
          className="hero-slider"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {mockBanners.map((banner) => (
            <div className="hero-slide" key={banner.id}>
              <img src={banner.image} alt={banner.title} />
              <div className="hero-overlay">
                <button className="btn btn-pink">Ver lançamento</button>
              </div>
            </div>
          ))}
        </div>

        <button className="hero-arrow left" onClick={prevSlide}>
          <img src={ArrowLeft} alt="voltar" />
        </button>

        <button className="hero-arrow right" onClick={nextSlide}>
          <img src={ArrowRight} alt="próximo" />
        </button>

        <div className="hero-dots">
          {mockBanners.map((_, index) => (
            <span
              key={index}
              className={index === current ? "active" : ""}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
