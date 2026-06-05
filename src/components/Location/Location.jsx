import "./location.css";
import calendarIcon from "../../assets/calendar.svg";
import phoneIcon from "../../assets/phone.svg";
import locationIcon from "../../assets/location.svg";
import mailIcon from "../../assets/mail.svg";

const INFO = [
    { icon: calendarIcon, title: "10:00 – 21:00", desc: "Работаем ежедневно" },
    { icon: phoneIcon, title: "+996 706 918 918", desc: "Получить консультацию у наших специалистов" },
    { icon: locationIcon, title: "Медерова 44/1", desc: "Бишкек" },
    { icon: mailIcon, title: "sales@distore.one", desc: "Получить консультацию у наших специалистов" },
];

const MAP_URL = "https://yandex.ru/map-widget/v1/?um=constructor%3Aaddbfd171cb8bf8c6765b828095d3fd2046b6cbb60b7c14db38592d04fc176fe&source=constructor";

export default function Location() {
    const handleSubmit = (e) => { e.preventDefault(); };

    return (
        <section className="loc-root">

            {/* Карта — отдельный блок */}
            <div className="loc-map">
                <iframe src={MAP_URL} width="100%" height="100%" frameBorder="0" title="Di Store на карте" allowFullScreen />
            </div>

            {/* Инфо-блоки */}
            <div className="loc-info">
                {INFO.map((item, i) => (
                    <div key={i} className="loc-info__item">
                        <img src={item.icon} className="loc-info__icon" alt="" />
                        <p className="loc-info__title">{item.title}</p>
                        <p className="loc-info__desc">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Карта + форма (десктоп) */}
            <div className="loc-bottom">
                <div className="loc-map loc-map--desktop">
                    <iframe src={MAP_URL} width="100%" height="100%" frameBorder="0" title="Di Store на карте" allowFullScreen />
                </div>
                <div className="loc-form-wrap">
                    <h2 className="loc-form__title">У вас есть вопросы к нам?</h2>
                    <p className="loc-form__subtitle">Наш менеджер свяжется с вами в ближайшее время</p>
                    <form className="loc-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Имя" className="loc-form__input" />
                        <input type="tel" placeholder="Телефон" className="loc-form__input" />
                        <input type="email" placeholder="Email" className="loc-form__input" />
                        <button type="submit" className="loc-form__btn">Отправить</button>
                    </form>
                </div>
            </div>

            {/* Форма (только мобайл) */}
            <div className="loc-form-wrap loc-form-wrap--mobile">
                <h2 className="loc-form__title">У вас есть вопросы к нам?</h2>
                <p className="loc-form__subtitle">Наш менеджер свяжется с вами в ближайшее время</p>
                <form className="loc-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Имя" className="loc-form__input" />
                    <input type="tel" placeholder="Телефон" className="loc-form__input" />
                    <input type="email" placeholder="Email" className="loc-form__input" />
                    <button type="submit" className="loc-form__btn">Отправить</button>
                </form>
            </div>

        </section>
    );
}