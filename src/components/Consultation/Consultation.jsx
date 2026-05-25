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

export default function Consultation() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section className="consultation">

            {/* Форма */}
            <div className="consultation__form-wrap">
                <h2 className="consultation__title">
                    Получите профессиональную консультацию специалиста
                </h2>

                <div className="consultation__form">
                    <input
                        type="tel"
                        placeholder="Телефон"
                        className="consultation__input"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="consultation__input"
                    />
                    <button className="consultation__btn">Отправить</button>
                </div>
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