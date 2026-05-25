import { useState, useEffect, useRef } from "react";
import "./hero.css";

const CIRCLE_LOGO = "https://distore.one/assets/circle-logo-dh9adKg5.svg";
const ARROW_LEFT = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M27.2002%208.0001L13.5469%2020.8001L27.2002%2033.6001'%20stroke='black'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";

const BRANDS = [
    { name: "CLIO", img: "http://distore.one/BrandLogo1C/CLIO.jpg" },
    { name: "ANASTASIA BEVERLY HILLS", img: "http://distore.one/BrandLogo1C/ANASTASIABEVERLYHILLS.jpg" },
    { name: "J'S DERMA", img: "http://distore.one/BrandLogo1C/J'SDERMA.jpg" },
    { name: "CP-1", img: "http://distore.one/BrandLogo1C/CP-1.jpg" },
    { name: "ILIA", img: "http://distore.one/BrandLogo1C/ILIA.jpg" },
    { name: "SOL DE JANEIRO", img: "http://distore.one/BrandLogo1C/SOLDEJANEIRO.jpg" },
    { name: "RARE BEAUTY", img: "http://distore.one/BrandLogo1C/RAREBEAUTY.jpg" },
    { name: "HERMES", img: "http://distore.one/BrandLogo1C/HERMES.jpg" },
    { name: "HEIMISH", img: "http://distore.one/BrandLogo1C/HEIMISH.jpg" },
    { name: "LN PRO", img: "http://distore.one/BrandLogo1C/LNPRO.jpg" },
    { name: "ONE SIZE", img: "http://distore.one/BrandLogo1C/ONESIZE.jpg" },
    { name: "DR. ALTHEA", img: "http://distore.one/BrandLogo1C/DR.ALTHEA.jpg" },
];

const ROW_1 = BRANDS.slice(0, 6);
const ROW_2 = BRANDS.slice(6, 12);
const ALL_BRANDS = [...BRANDS]; // все бренды для мобайла

const isMobileDevice = () => window.innerWidth <= 1023;
const CARD_W = () => isMobileDevice() ? 168 : 176;
const GAP = () => isMobileDevice() ? 4 : 82;
const STEP = () => CARD_W() + GAP();

// Хук бесконечной карусели — тройное дублирование, сброс в середину незаметно
function useInfiniteCarousel(items, startOffset = 0) {
    // Дублируем много раз чтобы не было видно краёв
    const repeated = [...items, ...items, ...items, ...items, ...items];
    const middle = items.length * 2; // начинаем с середины
    const [index, setIndex] = useState(middle + startOffset);
    const [animated, setAnimated] = useState(true);

    const offset = -index * STEP();

    const next = () => {
        setAnimated(true);
        setIndex((v) => {
            const next = v + 1;
            return next;
        });
    };

    const prev = () => {
        setAnimated(true);
        setIndex((v) => {
            const prev = v - 1;
            return prev;
        });
    };

    // Незаметный сброс: после анимации прыгаем в эквивалентную позицию в середине
    useEffect(() => {
        if (!animated) return;
        const timer = setTimeout(() => {
            setIndex((v) => {
                // Нормализуем индекс в диапазон [items.length, items.length * 2]
                const normalized = ((v - items.length) % items.length + items.length) % items.length + items.length;
                if (normalized !== v) {
                    setAnimated(false);
                    return normalized;
                }
                return v;
            });
        }, 420); // чуть после окончания анимации 0.4s
        return () => clearTimeout(timer);
    }, [index, items.length, animated]);

    return { repeated, offset, animated, next, prev };
}

export default function Hero() {
    const row1 = useInfiniteCarousel(ROW_1, 0);
    const row2 = useInfiniteCarousel(ROW_2, ROW_2.length - 3); // начинаем с конца
    const rowMobile = useInfiniteCarousel(ALL_BRANDS, 0); // мобайл — все бренды

    const handleNext = () => { row1.next(); row2.prev(); rowMobile.next(); };
    const handlePrev = () => { row1.prev(); row2.next(); rowMobile.prev(); };

    return (
        <section className="hero">
            <div className="hero-circles-overlay">
                <img src={CIRCLE_LOGO} className="hero-circle hero-circle--1" alt="" aria-hidden="true" />
                <img src={CIRCLE_LOGO} className="hero-circle hero-circle--2" alt="" aria-hidden="true" />
                <img src={CIRCLE_LOGO} className="hero-circle hero-circle--3" alt="" aria-hidden="true" />
            </div>

            {/* Логотип */}
            <div className="hero-logo">
                <img src="https://distore.one/assets/logo-RTk1AIHF.svg" className="hero-logo__img" alt="DI STORE" />
            </div>

            {/* Заголовок + стрелки */}
            <div className="hero-brands__header">
                <button className="hero-brands__arrow hero-brands__arrow--prev" onClick={handlePrev} aria-label="Назад">
                    <img src={ARROW_LEFT} alt="назад" />
                </button>
                <h2 className="hero-brands__title">Оригинальные бренды</h2>
                <button className="hero-brands__arrow hero-brands__arrow--next" onClick={handleNext} aria-label="Вперёд">
                    <img src={ARROW_LEFT} alt="вперёд" />
                </button>
            </div>

            {/* Карусель */}
            <div className="hero-carousel">

                {/* Строка 1 */}
                <div className="hero-carousel__viewport hero-carousel__viewport--right">
                    <div
                        className="hero-carousel__track"
                        style={{
                            transform: `translateX(${row1.offset}px)`,
                            transition: row1.animated ? "transform 0.4s ease" : "none",
                        }}
                    >
                        {row1.repeated.map((brand, i) => (
                            <div
                                key={`r1-${i}`}
                                className={`hero-brand-card${i % 2 !== 0 ? " hero-brand-card--low" : ""}`}
                            >
                                <img src={brand.img} alt={brand.name} className="hero-brand-card__img" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Строка 2 */}
                <div className="hero-carousel__viewport hero-carousel__viewport--left">
                    <div
                        className="hero-carousel__track"
                        style={{
                            transform: `translateX(${row2.offset}px)`,
                            transition: row2.animated ? "transform 0.4s ease" : "none",
                        }}
                    >
                        {row2.repeated.map((brand, i) => (
                            <div key={`r2-${i}`} className="hero-brand-card">
                                <img src={brand.img} alt={brand.name} className="hero-brand-card__img" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Мобайл — одна строка со всеми брендами в шахматном порядке */}
            <div className="hero-carousel hero-carousel--mobile">
                <div className="hero-carousel__viewport hero-carousel__viewport--mobile">
                    <div
                        className="hero-carousel__track"
                        style={{
                            transform: `translateX(${rowMobile.offset}px)`,
                            transition: rowMobile.animated ? "transform 0.4s ease" : "none",
                        }}
                    >
                        {rowMobile.repeated.map((brand, i) => (
                            <div
                                key={`rm-${i}`}
                                className={`hero-brand-card${i % 2 !== 0 ? " hero-brand-card--low" : ""}`}
                            >
                                <img src={brand.img} alt={brand.name} className="hero-brand-card__img" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Мобайл-круг — после карусели */}
            <img src={CIRCLE_LOGO} className="hero-circle-mobile" alt="" aria-hidden="true" />
        </section>
    );
}