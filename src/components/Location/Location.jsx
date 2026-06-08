import { useState } from "react";
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

const validateName = (v) => {
    if (!v.trim()) return "Введите имя";
    return "";
};

const validatePhone = (v) => {
    if (!v.trim()) return "Введите номер телефона";
    if (!/^[+\d\s\-\(\)]+$/.test(v.trim())) return "Некорректный номер телефона";
    const digits = v.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) return "Некорректный номер телефона";
    return "";
};

const validateEmail = (v) => {
    if (!v.trim()) return "Введите email";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return "Некорректный email";
    return "";
};

function ContactForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({ name: "", phone: "", email: "" });
    const [touched, setTouched] = useState({ name: false, phone: false, email: false });
    const [sent, setSent] = useState(false);

    const validators = { name: validateName, phone: validatePhone, email: validateEmail };
    const values = { name, phone, email };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        setErrors(prev => ({ ...prev, [field]: validators[field](values[field]) }));
    };

    const handleChange = (field, value) => {
        const setters = { name: setName, phone: setPhone, email: setEmail };
        setters[field](value);
        if (touched[field]) setErrors(prev => ({ ...prev, [field]: validators[field](value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nameErr = validateName(name);
        const phoneErr = validatePhone(phone);
        const emailErr = validateEmail(email);
        setErrors({ name: nameErr, phone: phoneErr, email: emailErr });
        setTouched({ name: true, phone: true, email: true });
        if (nameErr || phoneErr || emailErr) return;
        setSent(true);
        setName(""); setPhone(""); setEmail("");
        setTouched({ name: false, phone: false, email: false });
        setErrors({ name: "", phone: "", email: "" });
        setTimeout(() => setSent(false), 4000);
    };

    if (sent) {
        return <p className="loc-form__success">Спасибо! Мы свяжемся с вами в ближайшее время.</p>;
    }

    return (
        <form className="loc-form" onSubmit={handleSubmit} noValidate>
            <div className="loc-form__field">
                <input
                    type="text"
                    placeholder="Имя"
                    className={`loc-form__input${touched.name && errors.name ? " loc-form__input--error" : ""}`}
                    value={name}
                    onChange={e => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                />
                {touched.name && errors.name && <span className="loc-form__error">{errors.name}</span>}
            </div>
            <div className="loc-form__field">
                <input
                    type="tel"
                    placeholder="Телефон"
                    className={`loc-form__input${touched.phone && errors.phone ? " loc-form__input--error" : ""}`}
                    value={phone}
                    onChange={e => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                />
                {touched.phone && errors.phone && <span className="loc-form__error">{errors.phone}</span>}
            </div>
            <div className="loc-form__field">
                <input
                    type="email"
                    placeholder="Email"
                    className={`loc-form__input${touched.email && errors.email ? " loc-form__input--error" : ""}`}
                    value={email}
                    onChange={e => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                />
                {touched.email && errors.email && <span className="loc-form__error">{errors.email}</span>}
            </div>
            <button type="submit" className="loc-form__btn">Отправить</button>
        </form>
    );
}

export default function Location() {
    return (
        <section className="loc-root">

            {/* Карта мобайл */}
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
                    <ContactForm />
                </div>
            </div>

            {/* Форма мобайл */}
            <div className="loc-form-wrap loc-form-wrap--mobile">
                <h2 className="loc-form__title">У вас есть вопросы к нам?</h2>
                <p className="loc-form__subtitle">Наш менеджер свяжется с вами в ближайшее время</p>
                <ContactForm />
            </div>

        </section>
    );
}
