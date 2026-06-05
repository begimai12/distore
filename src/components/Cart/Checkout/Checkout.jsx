import { useState } from "react";
import "./checkout.css";
import defaultImg from "../../../assets/default.png";

const ARROW_LEFT = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M27.2002%208.0001L13.5469%2020.8001L27.2002%2033.6001'%20stroke='black'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";

// Пример товаров — в реальном проекте придут из стейта/контекста
const ORDER_ITEMS = [
    { id: 1, name: "ISNTREE Hyaluronic Acid Moist Cream", volume: "100мл", price: 750, qty: 2, img: defaultImg },
];

const DELIVERY_PRICE = 300;

export default function Checkout() {
    const [form, setForm] = useState({
        name: "", phone: "", email: "",
        country: "Кыргызстан", city: "Бишкек", address: "",
        note: "", promo: "",
        agree: false,
    });
    const [delivery, setDelivery] = useState("delivery"); // "delivery" | "pickup"
    const [showModal, setShowModal] = useState(false);
    const [showUds, setShowUds] = useState(false);
    const [udsCode, setUdsCode] = useState("");
    const [udsQty, setUdsQty] = useState("");

    const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

    const subtotal = ORDER_ITEMS.reduce((sum, i) => sum + i.price * i.qty, 0);
    const total = subtotal + (delivery === "delivery" ? DELIVERY_PRICE : 0);

    const handleSubmit = () => {
        if (!form.agree) { alert("Примите правила и условия"); return; }
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        setShowUds(true);
    };

    const handleUdsSkip = () => {
        setShowUds(false);
        alert("Заказ оформлен!");
    };

    const handleUdsSubmit = () => {
        setShowUds(false);
        alert("Бонусы списаны! Заказ оформлен.");
    };

    return (
        <div className="co-root">
            {/* Шапка */}
            <div className="co-header">
                <button className="co-back" onClick={() => window.history.back()} aria-label="Назад">
                    <img src={ARROW_LEFT} alt="назад" />
                </button>
                <h1 className="co-title">Оформление заказа</h1>
                <div className="co-header__placeholder" />
            </div>

            <div className="co-body">
                {/* Секция 1 */}
                <div className="co-section">
                    <div className="co-section__heading">
                        <span className="co-section__num">1</span>
                        <h2 className="co-section__title">Информации о заказчике</h2>
                    </div>
                    <div className="co-fields">
                        <div className="co-field">
                            <label className="co-label">Имя <span className="co-required">*</span></label>
                            <input className="co-input" placeholder="Имя" value={form.name} onChange={e => set("name", e.target.value)} />
                        </div>
                        <div className="co-field">
                            <label className="co-label">Телефон <span className="co-required">*</span></label>
                            <input className="co-input" placeholder="Телефон" value={form.phone} onChange={e => set("phone", e.target.value)} />
                        </div>
                        <div className="co-field">
                            <label className="co-label">Почта <span className="co-required">*</span></label>
                            <input className="co-input" placeholder="example@gmail.com" value={form.email} onChange={e => set("email", e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Секция 2 */}
                <div className="co-section">
                    <div className="co-section__heading">
                        <span className="co-section__num">2</span>
                        <h2 className="co-section__title">Адрес</h2>
                    </div>
                    <div className="co-fields">
                        <div className="co-field">
                            <label className="co-label">Страна <span className="co-required">*</span></label>
                            <input className="co-input" value={form.country} onChange={e => set("country", e.target.value)} />
                        </div>
                        <div className="co-field">
                            <label className="co-label">Город <span className="co-required">*</span></label>
                            <input className="co-input" value={form.city} onChange={e => set("city", e.target.value)} />
                        </div>
                        <div className="co-field">
                            <label className="co-label">Адрес <span className="co-required">*</span></label>
                            <input className="co-input" placeholder="Номер дома и название улицы" value={form.address} onChange={e => set("address", e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Секция 3 */}
                <div className="co-section">
                    <div className="co-section__heading">
                        <span className="co-section__num">3</span>
                        <h2 className="co-section__title">Дополнительно</h2>
                    </div>
                    <div className="co-fields">
                        <div className="co-field">
                            <label className="co-label">Примечание</label>
                            <input className="co-input" placeholder="Необязательно" value={form.note} onChange={e => set("note", e.target.value)} />
                        </div>
                        <div className="co-field">
                            <label className="co-label">Промокод</label>
                            <input className="co-input" placeholder="Ввести код" value={form.promo} onChange={e => set("promo", e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Футер */}
            <div className="co-footer">
                <div className="co-footer__left">
                    <p className="co-footer__note">
                        Ваши персональные данные будут использоваться для обработки вашего заказа, поддержки вашего использования на этом веб-сайте и для других целей, описанных в нашем{" "}
                        <a href="#" className="co-link">политика конфиденциальности</a>
                    </p>
                    <label className="co-agree">
                        <input type="checkbox" checked={form.agree} onChange={e => set("agree", e.target.checked)} className="co-agree__checkbox" />
                        <span>Я прочитал(а) и принимаю <a href="#" className="co-link">правила и условия</a> сайта <span className="co-required">*</span></span>
                    </label>
                </div>
                <button className="co-submit" onClick={handleSubmit}>
                    Оформить заказ
                </button>
            </div>

            {/* Модальное окно */}
            {showModal && (
                <div className="co-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="co-modal" onClick={e => e.stopPropagation()}>
                        {/* Товары */}
                        {ORDER_ITEMS.map(item => (
                            <div key={item.id} className="co-modal__item">
                                <div className="co-modal__item-img">
                                    <img src={item.img} alt={item.name} />
                                </div>
                                <div className="co-modal__item-info">
                                    <p className="co-modal__item-name">{item.name}</p>
                                    <p className="co-modal__item-volume">{item.volume}</p>
                                </div>
                                <div className="co-modal__item-right">
                                    <p className="co-modal__item-price">{item.price} сом</p>
                                    <p className="co-modal__item-qty">{item.qty}шт</p>
                                </div>
                            </div>
                        ))}

                        <div className="co-modal__divider" />

                        {/* Подытог */}
                        <div className="co-modal__row">
                            <span className="co-modal__row-label">Подытог</span>
                            <span className="co-modal__row-value">{subtotal.toLocaleString()} сом</span>
                        </div>

                        {/* Способ получения */}
                        <div className="co-modal__row co-modal__row--delivery">
                            <span className="co-modal__row-label">Способ получения</span>
                            <div className="co-modal__delivery-options">
                                <label className="co-modal__delivery-opt">
                                    <input
                                        type="checkbox"
                                        checked={delivery === "delivery"}
                                        onChange={() => setDelivery("delivery")}
                                        style={{ accentColor: "#ccd47c" }}
                                    />
                                    <span>Доставка от <strong>{DELIVERY_PRICE} сом</strong></span>
                                </label>
                                <label className="co-modal__delivery-opt">
                                    <input
                                        type="checkbox"
                                        checked={delivery === "pickup"}
                                        onChange={() => setDelivery("pickup")}
                                        style={{ accentColor: "#ccd47c" }}
                                    />
                                    <span>Самовызов</span>
                                </label>
                            </div>
                        </div>

                        <div className="co-modal__divider" />

                        {/* Итого */}
                        <div className="co-modal__row co-modal__row--total">
                            <span className="co-modal__total-label">Итого</span>
                            <span className="co-modal__total-value">{total.toLocaleString()} сом</span>
                        </div>

                        {/* Кнопка */}
                        <button className="co-modal__btn" onClick={handleConfirm}>
                            Подтвердить заказ
                        </button>
                    </div>
                </div>
            )}
            {/* UDS модал */}
            {showUds && (
                <div className="co-modal-overlay" onClick={() => setShowUds(false)}>
                    <div className="co-modal co-modal--uds" onClick={e => e.stopPropagation()}>
                        <h2 className="co-modal__uds-title">Списать бонусы UDS</h2>
                        <input
                            className="co-modal__uds-input"
                            placeholder="Ввести UDS код"
                            value={udsCode}
                            onChange={e => setUdsCode(e.target.value)}
                        />
                        <input
                            className="co-modal__uds-input"
                            placeholder="Кол-во бонусов"
                            value={udsQty}
                            onChange={e => setUdsQty(e.target.value)}
                        />
                        <div className="co-modal__uds-btns">
                            <button className="co-modal__uds-btn co-modal__uds-btn--skip" onClick={handleUdsSkip}>
                                Пропустить
                            </button>
                            <button className="co-modal__uds-btn co-modal__uds-btn--submit" onClick={handleUdsSubmit}>
                                Списать
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}