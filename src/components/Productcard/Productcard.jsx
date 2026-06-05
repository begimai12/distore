import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./productcard.css";
import defaultImg from "../../assets/default.png";

const LOGO_URL = "https://distore.one/assets/logo-RTk1AIHF.svg";
const ARROW_LEFT = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M27.2002%208.0001L13.5469%2020.8001L27.2002%2033.6001'%20stroke='black'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";

const PRODUCT = {
    id: 200,
    name: "RARE BEAUTY always an optimist pore diffusing primer",
    volumes: ["28 ml", "15 ml"],
    shades: ["100W", "120C", "130N", "150C", "170W"],
    description: "Этот праймер помогает выровнять текстуру кожи и продлить устойчивость макияжа. Включая гиалуроновую кислоту, эта грунтовка обеспечивает длительное увлажнение, гарантируя, что кожа продолжает дышать под макияжем.",
    price: 3400,
    images: [defaultImg, defaultImg, defaultImg],
};

export default function ProductCard({ product = PRODUCT }) {
    const [selectedVolume, setSelectedVolume] = useState(product.volumes[0]);
    const { addToCart } = useCart();
    const [selectedShade, setSelectedShade] = useState(product.shades[0]);
    const [activeImg, setActiveImg] = useState(0);
    const [liked, setLiked] = useState(false);
    const [descOpen, setDescOpen] = useState(true);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const HeartIcon = () => liked
        ? <svg width="22" height="22" viewBox="0 0 24 24" fill="#e74c3c"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
        : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="1.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>;

    return (
        <div className="pc-root">
            <div className="pc-header">
                <button className="pc-back" onClick={() => window.history.back()}>
                    <img src={ARROW_LEFT} alt="назад" />
                </button>
                <img src={LOGO_URL} alt="DI STORE" className="pc-logo" />
                <div className="pc-header__placeholder" />
            </div>

            <h1 className="pc-name-mobile">{product.name}</h1>

            <div className="pc-body">

                {/* Галерея десктоп */}
                <div className="pc-gallery">
                    <div className="pc-gallery__main">
                        <img src={product.images[activeImg]} alt={product.name} className="pc-gallery__img" />
                        <button className="pc-gallery__heart" onClick={() => setLiked(v => !v)}>
                            <HeartIcon />
                        </button>
                    </div>
                    <div className="pc-gallery__thumbs">
                        {product.images.slice(0, 2).map((img, i) => (
                            <button key={i} className={`pc-gallery__thumb${activeImg === i ? " pc-gallery__thumb--active" : ""}`} onClick={() => setActiveImg(i)}>
                                <img src={img} alt="" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Слайдер мобайл */}
                <div className="pc-slider">
                    <Swiper
                        modules={[Pagination]}
                        slidesPerView="auto"
                        centeredSlides
                        spaceBetween={16}
                        pagination={{ clickable: true }}
                        onSlideChange={s => setActiveImg(s.activeIndex)}
                        className="pc-swiper"
                    >
                        {product.images.map((img, i) => (
                            <SwiperSlide key={i}>
                                <div className="pc-swiper__slide">
                                    <img src={img} alt={product.name} />
                                    <button className="pc-gallery__heart" onClick={() => setLiked(v => !v)}>
                                        <HeartIcon />
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Инфо */}
                <div className="pc-info">
                    <h1 className="pc-info__name">{product.name}</h1>
                    <div className="pc-info__row">
                        <span className="pc-info__label">Объем:</span>
                        <div className="pc-info__tags">
                            {product.volumes.map(v => (
                                <button key={v} className={`pc-tag${selectedVolume === v ? " pc-tag--active" : ""}`} onClick={() => setSelectedVolume(v)}>{v}</button>
                            ))}
                        </div>
                    </div>
                    <div className="pc-info__row">
                        <span className="pc-info__label">Оттенок:</span>
                        <div className="pc-info__tags">
                            {product.shades.map(s => (
                                <button key={s} className={`pc-tag${selectedShade === s ? " pc-tag--active" : ""}`} onClick={() => setSelectedShade(s)}>{s}</button>
                            ))}
                        </div>
                    </div>
                    <div className="pc-accordion">
                        <button className="pc-accordion__btn" onClick={() => setDescOpen(v => !v)}>
                            <span>Описание</span>
                            <img src={ARROW_LEFT} alt="" className={`pc-accordion__arrow${descOpen ? " pc-accordion__arrow--open" : ""}`} />
                        </button>
                        {descOpen && <p className="pc-accordion__content">{product.description}</p>}
                    </div>
                    <div className="pc-accordion">
                        <button className="pc-accordion__btn" onClick={() => setDetailsOpen(v => !v)}>
                            <span>Детали</span>
                            <img src={ARROW_LEFT} alt="" className={`pc-accordion__arrow${detailsOpen ? " pc-accordion__arrow--open" : ""}`} />
                        </button>
                        {detailsOpen && <p className="pc-accordion__content">Детали товара...</p>}
                    </div>
                    <div className="pc-info__footer">
                        <span className="pc-info__price">{product.price.toLocaleString()} сом</span>
                        <button className="pc-btn pc-btn--cart" onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, img: product.images[0], volume: selectedVolume })}>В корзину</button>
                    </div>
                    <button className="pc-btn pc-btn--whatsapp" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(product.name)}`, '_blank')}>
                        Оформить через Whatsapp
                    </button>
                </div>
            </div>
        </div>
    );
}