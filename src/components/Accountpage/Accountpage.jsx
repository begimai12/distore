import { useState } from "react";
import "./accountpage.css";
import acc from "../../assets/acc.png";

const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

function Field({ label, value, onChange, placeholder, type = "text", showToggle, showPw, onToggle }) {
    return (
        <div className="acc-field">
            <label className="acc-field__label">{label}</label>
            <div className="acc-field__wrap">
                <input
                    className="acc-field__input"
                    type={showToggle ? (showPw ? "text" : "password") : type}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder || ""}
                />
                {showToggle && (
                    <button className="acc-field__eye" type="button" onClick={onToggle}>
                        {showPw ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                )}
            </div>
        </div>
    );
}

function PhoneField({ value, onChange }) {
    return (
        <div className="acc-field">
            <label className="acc-field__label">Номер телефона</label>
            <div className="acc-field__wrap acc-field__wrap--phone">
                <div className="acc-field__flag">
                    <span>🇰🇬</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
                <input
                    className="acc-field__input acc-field__input--phone"
                    type="tel"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder="(xxx) xxx-xxxx"
                />
            </div>
        </div>
    );
}

// Модальное окно смены пароля
function ChangePasswordModal({ onClose }) {
    const [current, setCurrent] = useState("");
    const [next, setNext] = useState("");
    const [confirm, setConfirm] = useState("");

    return (
        <div className="acc-modal-overlay" onClick={onClose}>
            <div className="acc-modal" onClick={e => e.stopPropagation()}>
                <h3 className="acc-modal__title">Смена пароля</h3>
                <Field label="Нынешний пароль" value={current} onChange={setCurrent} type="password" placeholder="" />
                <Field label="Новый пароль" value={next} onChange={setNext} type="password" placeholder="" />
                <Field label="Подтвердить пароль" value={confirm} onChange={setConfirm} type="password" placeholder="" />
                <button className="acc-btn acc-btn--save acc-modal__btn">Изменить пароль</button>
            </div>
        </div>
    );
}

export default function AccountPage({ onBack }) {
    const [name, setName] = useState("");
    const [nickname, setNick] = useState("Derrimet");
    const [email, setEmail] = useState("Loisbecket@gmail.com");
    const [phone, setPhone] = useState("(454) 726-0592");
    const [password, setPw] = useState("•••••••");
    const [showPw, setShowPw] = useState(false);
    const [showModal, setModal] = useState(false);

    return (
        <div className="acc-root">
            {/* Левое фото (только десктоп) */}
            <div className="acc-photo">
                <img src={acc} alt="Di Store" />
            </div>

            {/* Правая панель */}
            <div className="acc-panel">
                {/* Заголовок */}
                <div className="acc-header">
                    <button className="acc-header__back" onClick={onBack}><BackIcon /></button>
                    <h2 className="acc-header__title">Мой аккаунт</h2>
                </div>

                {/* Аватар */}
                <div className="acc-avatar-wrap">
                    <div className="acc-avatar">
                        <img src={acc} alt="avatar" />
                    </div>
                    <button className="acc-avatar__change">Изменить</button>
                </div>

                {/* Поля */}
                <Field label="Имя" value={name} onChange={setName} placeholder="Заполнить поле" />
                <Field label="Nickname" value={nickname} onChange={setNick} placeholder="Nickname" />
                <Field label="Email" value={email} onChange={setEmail} placeholder="Email" type="email" />
                <PhoneField value={phone} onChange={setPhone} />
                <Field
                    label="Пароль"
                    value={password}
                    onChange={setPw}
                    showToggle
                    showPw={showPw}
                    onToggle={() => setShowPw(p => !p)}
                />

                <div className="acc-forgot-row">
                    <button className="acc-forgot" onClick={() => setModal(true)}>Забыли пароль?</button>
                </div>

                <button className="acc-btn acc-btn--save">Сохранить изменения</button>
            </div>

            {/* Модалка смены пароля */}
            {showModal && <ChangePasswordModal onClose={() => setModal(false)} />}
        </div>
    );
}