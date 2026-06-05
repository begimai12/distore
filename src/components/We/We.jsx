import "./we.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import w1 from "../../assets/w1.png";
import w2 from "../../assets/w2.png";
import w3 from "../../assets/w3.png";
import w4 from "../../assets/w4.png";
import di3 from "../../assets/di3.png";


const STATS = [
    { value: "5 лет", label: "на рынке" },
    { value: "15к", label: "клиентов" },
    { value: "1000+", label: "отзывов" },
    { value: "100+", label: "брендов" },
    { value: "20+", label: "консультаций" },
    { value: "3000+", label: "позиций" },
];

const EMPLOYEES = [
    { name: "Сабина", role: "Менеджер", img: w1 },
    { name: "Айзат", role: "Онлайн - консультант", img: w2 },
    { name: "Асель", role: "Контент мейкер", img: w3 },
    { name: "Айпери", role: "Продавец консультант", img: w4 },
];

const ADVANTAGES_TEXT = [
    "В нашем магазине представлены средства по уходу за кожей, а также декоративная косметика самых топовых брендов Кореи, Европы и Америки прямиком с заводов-производителей!",
    "Мы предоставляем только оригинальную продукцию по самым демократичным ценам. В нашем магазине представлено более 100 брендов. У нас действует система лояльности клиентов. Все наши консультанты обучены предоставлять качественные консультации, которые помогут вам подобрать индивидуальный уход, исходя из типа вашей кожи. Все консультации бесплатны!",
];

export default function We() {
    return (
        <section className="we-root">

            {/* Статистика */}
            <div className="we-stats">
                {STATS.map((s, i) => (
                    <div key={i} className="we-stat">
                        <span className="we-stat__value">{s.value}</span>
                        <span className="we-stat__label">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Преимущества — только мобайл */}
            <div className="we-advantages">
                <h2 className="we-section-title">Преимущества</h2>
                <div className="we-advantages__body">
                    <div className="we-advantages__img">
                        <img src={di3} alt="преимущества" />
                    </div>
                    <div className="we-advantages__texts">
                        <p className="we-advantages__p">{ADVANTAGES_TEXT[0]}</p>
                    </div>
                </div>
                <p className="we-advantages__p we-advantages__p--full">{ADVANTAGES_TEXT[1]}</p>
            </div>

            {/* Сотрудники */}
            <div className="we-employees">
                <h2 className="we-section-title">Наши сотрудники</h2>

                {/* Десктоп: 4 колонки */}
                <div className="we-employees__grid">
                    {EMPLOYEES.map((e, i) => (
                        <div key={i} className="we-employee">
                            <div className="we-employee__img">
                                <img src={e.img} alt={e.name} />
                            </div>
                            <p className="we-employee__name">{e.name}</p>
                            <p className="we-employee__role">{e.role}</p>
                        </div>
                    ))}
                </div>

                {/* Мобайл: слайдер по 2 */}
                <div className="we-employees__slider">
                    <Swiper
                        modules={[Pagination]}
                        slidesPerView={2}
                        spaceBetween={16}
                        pagination={{ clickable: true }}
                        className="we-swiper"
                    >
                        {EMPLOYEES.map((e, i) => (
                            <SwiperSlide key={i}>
                                <div className="we-employee">
                                    <div className="we-employee__img">
                                        <img src={e.img} alt={e.name} />
                                    </div>
                                    <p className="we-employee__name">{e.name}</p>
                                    <p className="we-employee__role">{e.role}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

        </section>
    );
}