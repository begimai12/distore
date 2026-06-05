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

export default function Consultation({ mobileShow = "form" }) {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!phone && !email) return;
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
                        <input
                            type="tel"
                            placeholder="Телефон"
                            className="consultation__input"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="consultation__input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
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