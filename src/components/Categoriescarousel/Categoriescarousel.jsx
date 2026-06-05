import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./categoriescarousel.css";
import defaultImg from "../../assets/default.png";

const CATEGORIES = [
    { id: 1, title: "Декоративная косметика от CLIO", bg: "#F9C4C4", catalog: "Декоративная косметика" },
    { id: 2, title: "Уход за кожей лица", bg: "#C4D9F9", catalog: "Уход для лица" },
    { id: 3, title: "Уход за волосами", bg: "#C4F9D4", catalog: "Уход за волосами" },
    { id: 4, title: "Парфюмерия и ароматы", bg: "#F9ECC4", catalog: "Парфюм" },
    { id: 5, title: "Маски и патчи", bg: "#E8C4F9", catalog: null },
    { id: 6, title: "Уход за телом", bg: "#C4F9F4", catalog: "Уход за телом" },
];

const ChevronLeft = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 18L15 12L9 6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function CategoriesCarousel() {
    const swiperRef = useRef(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const navigate = useNavigate();

    const goToCategory = (cat) => {
        const path = cat.catalog
            ? `/catalog?category=${encodeURIComponent(cat.catalog)}`
            : "/catalog";
        navigate(path);
    };

    return (
        <div className="cat-root">
            <div className="cat-header">
                <button className="cat-nav" onClick={() => swiperRef.current?.slidePrev()}>
                    <ChevronLeft />
                </button>
                <h2 className="cat-title">Категории</h2>
                <button className="cat-nav" onClick={() => swiperRef.current?.slideNext()}>
                    <ChevronRight />
                </button>
            </div>

            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1.6}
                loop={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 120,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination]}
                className="cat-swiper"
            >
                {CATEGORIES.map((cat) => (
                    <SwiperSlide key={cat.id} className="cat-slide">
                        {({ isActive }) => (
                            <div
                                className={`cat-card ${isActive ? "cat-card--active" : "cat-card--side"}`}
                                style={{ background: cat.bg, cursor: "pointer" }}
                                onClick={() => goToCategory(cat)}
                            >
                                <img src={defaultImg} alt={cat.title} className="cat-card__img" />
                                {isActive && (
                                    <div className="cat-card__overlay">
                                        <button
                                            className="cat-card__btn"
                                            onClick={(e) => { e.stopPropagation(); goToCategory(cat); }}
                                        >
                                            Подробнее
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            <p className="cat-caption">{CATEGORIES[activeIdx].title}</p>
        </div>
    );
}