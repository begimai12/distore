import { useState } from "react";
import "./consultation.css";

const REVIEWS = [
    {
        id: 1,
        name: "Калерия Кисленко",
        text: "Лучший магазин косметики. Всегда нахожу здесь средства, которых нет в других магазинах",
        avatar: null,
    },
    {
        id: 2,
        name: "Лия Айбекова",
        text: "Очаровательные продавцы-консультанты. Знают товар, помогают с выбором. Из-за такого обсаживания потратила больше, чем планировала",
        avatar: null,
    },
    {
        id: 3,
        name: "Жылдыз Джукешева",
        text: "Это самый лучший магазин косметики большой ассортимент оригинальной косметики. Люблю этот магазин",
        avatar: null,
    },
];

const validatePhone = (v) => {
    if (!v.trim()) return "Введите номер телефона";
    if (!/^[+]?[\d\s\-\(\)]{7,15}$/.test(v.trim())) return "Некорректный номер телефона";
    return "";
};

const validateEmail = (v) => {
    if (!v.trim()) return "Введите email";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return "Некорректный email";
    return "";
};

export default function Consultation({ mobileShow = "form" }) {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({ phone: "", email: "" });
    const [touched, setTouched] = useState({ phone: false, email: false });
    const [sent, setSent] = useState(false);

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        setErrors(prev => ({
            ...prev,
            [field]: field === "phone" ? validatePhone(phone) : validateEmail(email),
        }));
    };

    const handleSubmit = () => {
        const phoneErr = validatePhone(phone);
        const emailErr = validateEmail(email);
        setErrors({ phone: phoneErr, email: emailErr });
        setTouched({ phone: true, email: true });
        if (phoneErr || emailErr) return;
        setSent(true);
        setPhone("");
        setEmail("");
    };

    return (
        <section className="consultation" data-mobile={mobileShow}>

            {/* Форма */}
            <div className="consultation__form-wrap">
                <h2 className="consultation__title">
                    Получите профессиональную консультацию специалиста
                </h2>

                {sent ? (
                    <p className="consultation__success">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
                ) : (
                    <div className="consultation__form">
                        <div className="consultation__field">
                            <input
                                type="tel"
                                placeholder="Телефон"
                                className={`consultation__input${touched.phone && errors.phone ? " consultation__input--error" : ""}`}
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    if (touched.phone) setErrors(prev => ({ ...prev, phone: validatePhone(e.target.value) }));
                                }}
                                onBlur={() => handleBlur("phone")}
                            />
                            {touched.phone && errors.phone && (
                                <span className="consultation__error">{errors.phone}</span>
                            )}
                        </div>
                        <div className="consultation__field">
                            <input
                                type="email"
                                placeholder="Email"
                                className={`consultation__input${touched.email && errors.email ? " consultation__input--error" : ""}`}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (touched.email) setErrors(prev => ({ ...prev, email: validateEmail(e.target.value) }));
                                }}
                                onBlur={() => handleBlur("email")}
                            />
                            {touched.email && errors.email && (
                                <span className="consultation__error">{errors.email}</span>
                            )}
                        </div>
                        <button className="consultation__btn" onClick={handleSubmit}>Отправить</button>
                    </div>
                )}
            </div>

            {/* Отзывы */}
            <div className="consultation__reviews">
                {REVIEWS.map((review, i) => (
                    <div key={review.id} className={`review-card review-card--${i + 1}`}>
                        <div className="review-card__header">
                            <div className="review-card__avatar">
                                {review.avatar
                                    ? <img src={review.avatar} alt={review.name} />
                                    : <span>{review.name[0]}</span>
                                }
                            </div>
                            <p className="review-card__name">{review.name}</p>
                        </div>
                        <p className="review-card__text">{review.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}