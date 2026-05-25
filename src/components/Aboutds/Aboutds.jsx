import "./aboutds.css";
import ds from "../../assets/ds.png";
import dsm from "../../assets/dsm.png";
import d1 from "../../assets/d1.svg";
import d2 from "../../assets/d2.svg";
import d3 from "../../assets/d3.svg";

const LOGO_URL = "https://distore.one/assets/logo-RTk1AIHF.svg";

export default function AboutDs() {
    return (
        <section className="about-ds">

            {/* Декоративные мазки */}
            <img src={d1} className="about-ds__decor about-ds__decor--1" alt="" aria-hidden="true" />
            <img src={d2} className="about-ds__decor about-ds__decor--2" alt="" aria-hidden="true" />
            <img src={d3} className="about-ds__decor about-ds__decor--3" alt="" aria-hidden="true" />

            {/* Логотип сверху по центру */}
            <div className="about-ds__logo">
                <img src={LOGO_URL} alt="DI STORE" className="about-ds__logo-img" />
            </div>

            {/* Контент: фото слева, текст справа */}
            <div className="about-ds__content">

                {/* Десктоп — ds.png */}
                <img src={ds} alt="Команда DI STORE" className="about-ds__photo desktop-only" />

                {/* Мобайл — dsm.png, одно фото */}
                <img src={dsm} alt="Команда DI STORE" className="about-ds__photo-mobile mobile-only" />

                {/* Десктоп текст */}
                <p className="about-ds__text desktop-only">
                    Мы предоставляем только оригинальную продукцию по самым демократичным ценам.
                    В нашем магазине представлены более 100 брендов. У нас действует система лояльности клиентов.
                    Все наши консультанты обучены предоставлять качественные консультации,
                    которые помогут вам подобрать индивидуальный уход, исходя из типа вашей кожи.
                    Все консультации бесплатны!
                </p>

                {/* Мобайл текст */}
                <p className="about-ds__text about-ds__text--mobile mobile-only">
                    В нашем магазине только оригинальная продукция по доступным ценам и более 100 брендов.
                    Действует система лояльности. Консультанты помогут вам подобрать уход с учетом типа кожи.
                    И самое приятное — все консультации бесплатны!
                </p>
            </div>

        </section>
    );
}