import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./popular.css";
import p1 from "../../assets/p1.png";
import p2 from "../../assets/p2.png";
import p3 from "../../assets/p3.png";

const IMAGES = [p1, p2, p3];

export default function Popular() {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const handlePrev = () => setActiveIndex((v) => Math.max(v - 1, 0));
    const handleNext = () => setActiveIndex((v) => Math.min(v + 1, IMAGES.length - 1));

    return (
        <section className="popular">
            <div className="popular__header">
                <h2 className="popular__title">Популярные товары</h2>
                <button className="popular__more" aria-label="Смотреть все" onClick={() => navigate('/catalog')}>
                    <img src="data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M27.2002%208.0001L13.5469%2020.8001L27.2002%2033.6001'%20stroke='black'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e" className="popular__arrow" alt="далее" />
                </button>
            </div>

            {/* Десктоп — все карточки в ряд */}
            <div className="popular__track desktop-only">
                {IMAGES.map((img, i) => (
                    <div key={i} className="popular-card">
                        <img src={img} alt={`Товар ${i + 1}`} className="popular-card__img" />
                    </div>
                ))}
            </div>

            {/* Мобайл — слайдер */}
            <div className="popular__slider mobile-only">
                <div className="popular__slide">
                    <div className="popular-card popular-card--mobile">
                        <img
                            src={IMAGES[activeIndex]}
                            alt={`Товар ${activeIndex + 1}`}
                            className="popular-card__img"
                        />
                    </div>
                </div>

                {/* Точки-индикаторы */}
                <div className="popular__dots">
                    {IMAGES.map((_, i) => (
                        <button
                            key={i}
                            className={`popular__dot${i === activeIndex ? " popular__dot--active" : ""}`}
                            onClick={() => setActiveIndex(i)}
                            aria-label={`Слайд ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}