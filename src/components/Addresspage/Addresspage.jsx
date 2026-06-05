import { useState } from "react";
import "./addresspage.css";

const ChevronIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9L12 15L18 9" />
    </svg>
);

const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

function Field({ label, value, onChange, placeholder, required }) {
    return (
        <div className="addr-field">
            <label className="addr-field__label">
                {label}{required && <span className="addr-field__req"> *</span>}
            </label>
            <input
                className="addr-field__input"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder || ""}
            />
        </div>
    );
}

export default function AddressPage({ onBack }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("Кыргызстан");
    const [city, setCity] = useState("Бишкек");
    const [address, setAddress] = useState("");

    // мобайл: аккордеон
    const [openSection, setOpenSection] = useState("customer");

    const handleReset = () => {
        setName(""); setPhone(""); setEmail("");
        setCountry("Кыргызстан"); setCity("Бишкек"); setAddress("");
    };

    const toggle = (section) =>
        setOpenSection(prev => prev === section ? null : section);

    return (
        <div className="addr-root">
            {/* Заголовок */}
            <div className="addr-header">
                <button className="addr-header__back" onClick={onBack}>
                    <BackIcon />
                </button>
                <div className="addr-header__text">
                    <h2 className="addr-header__title">Адрес</h2>
                    <p className="addr-header__sub">Следующие адреса будут использованы по умолчанию при оформлении заказов</p>
                </div>
            </div>

            {/* ── ДЕСКТОП: две колонки ── */}
            <div className="addr-desktop">
                {/* Левая колонка */}
                <div className="addr-col">
                    <div className="addr-section-header">Информация о заказчике</div>
                    <Field label="Имя" value={name} onChange={setName} placeholder="Имя" required />
                    <Field label="Телефон" value={phone} onChange={setPhone} placeholder="Телефон" required />
                    <Field label="Почта" value={email} onChange={setEmail} placeholder="example@gmail.com" required />
                    <div className="addr-col__actions">
                        <button className="addr-btn addr-btn--reset" onClick={handleReset}>Сбросить</button>
                    </div>
                </div>

                {/* Правая колонка */}
                <div className="addr-col">
                    <div className="addr-section-header">Адрес доставки</div>
                    <Field label="Страна" value={country} onChange={setCountry} placeholder="Страна" required />
                    <Field label="Город" value={city} onChange={setCity} placeholder="Город" required />
                    <Field label="Адрес" value={address} onChange={setAddress} placeholder="Номер дома и название улицы" required />
                    <div className="addr-col__actions">
                        <button className="addr-btn addr-btn--save">Сохранить</button>
                    </div>
                </div>
            </div>

            {/* ── МОБАЙЛ: аккордеон ── */}
            <div className="addr-mobile">
                {/* Секция 1 */}
                <div className="addr-accordion">
                    <button
                        className={`addr-accordion__header ${openSection === "customer" ? "addr-accordion__header--open" : ""}`}
                        onClick={() => toggle("customer")}
                    >
                        <span>Информация о заказчике</span>
                        <span className={`addr-accordion__chevron ${openSection === "customer" ? "addr-accordion__chevron--open" : ""}`}>
                            <ChevronIcon />
                        </span>
                    </button>
                    {openSection === "customer" && (
                        <div className="addr-accordion__body">
                            <Field label="Имя" value={name} onChange={setName} placeholder="Имя" required />
                            <Field label="Телефон" value={phone} onChange={setPhone} placeholder="Телефон" required />
                            <Field label="Почта" value={email} onChange={setEmail} placeholder="example@gmail.com" required />
                        </div>
                    )}
                </div>

                {/* Секция 2 */}
                <div className="addr-accordion">
                    <button
                        className={`addr-accordion__header ${openSection === "delivery" ? "addr-accordion__header--open" : ""}`}
                        onClick={() => toggle("delivery")}
                    >
                        <span>Адрес доставки</span>
                        <span className={`addr-accordion__chevron ${openSection === "delivery" ? "addr-accordion__chevron--open" : ""}`}>
                            <ChevronIcon />
                        </span>
                    </button>
                    {openSection === "delivery" && (
                        <div className="addr-accordion__body">
                            <Field label="Страна" value={country} onChange={setCountry} placeholder="Страна" required />
                            <Field label="Город" value={city} onChange={setCity} placeholder="Город" required />
                            <Field label="Адрес" value={address} onChange={setAddress} placeholder="Номер дома и название улицы" required />
                        </div>
                    )}
                </div>

                {/* Кнопки */}
                <div className="addr-mobile__actions">
                    <button className="addr-btn addr-btn--reset" onClick={handleReset}>Сбросить</button>
                    <button className="addr-btn addr-btn--save">Сохранить</button>
                </div>
            </div>
        </div>
    );
}