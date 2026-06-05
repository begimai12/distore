import { useState } from "react";
import "./authpage.css";
import acc from "../../assets/acc.png";
import locationIcon from "../../assets/location.svg";
import accountIcon from "../../assets/account.svg";


const CART_ICON = "data:image/svg+xml,%3csvg%20width='120'%20height='120'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_15_291)'%3e%3cpath%20d='M20%2020C18.6125%2020%2017.5%2021.1125%2017.5%2022.5C17.5%2023.163%2017.7634%2023.7989%2018.2322%2024.2678C18.7011%2024.7366%2019.337%2025%2020%2025C20.663%2025%2021.2989%2024.7366%2021.7678%2024.2678C22.2366%2023.7989%2022.5%2023.163%2022.5%2022.5C22.5%2021.837%2022.2366%2021.2011%2021.7678%2020.7322C21.2989%2020.2634%2020.663%2020%2020%2020ZM0%200V2.5H2.5L7%2011.9875L5.3%2015.05C5.1125%2015.4%205%2015.8125%205%2016.25C5%2016.913%205.26339%2017.5489%205.73223%2018.0178C6.20107%2018.4866%206.83696%2018.75%207.5%2018.75H22.5V16.25H8.025C7.94212%2016.25%207.86263%2016.2171%207.80403%2016.1585C7.74542%2016.0999%207.7125%2016.0204%207.7125%2015.9375C7.7125%2015.875%207.725%2015.825%207.75%2015.7875L8.875%2013.75H18.1875C19.125%2013.75%2019.95%2013.225%2020.375%2012.4625L24.85%204.375C24.9375%204.175%2025%203.9625%2025%203.75C25%203.41848%2024.8683%203.10054%2024.6339%202.86612C24.3995%202.6317%2024.0815%202.5%2023.75%202.5H5.2625L4.0875%200M7.5%2020C6.1125%2020%205%2021.1125%205%2022.5C5%2023.163%205.26339%2023.7989%205.73223%2024.2678C6.20107%2024.7366%206.83696%2025%207.5%2025C8.16304%2025%208.79893%2024.7366%209.26777%2024.2678C9.73661%2023.7989%2010%2023.163%2010%2022.5C10%2021.837%209.73661%2021.2011%209.26777%2020.7322C8.79893%2020.2634%208.16304%2020%207.5%2020Z'%20fill='%23CCD47C'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_15_291'%3e%3crect%20width='25'%20height='25'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";

const LOGOUT_SVG = "data:image/svg+xml,%3csvg%20width='70'%20height='70'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9%2021H5a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2h4'%20stroke='%23b5c96a'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpolyline%20points='16%2017%2021%2012%2016%207'%20stroke='%23b5c96a'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cline%20x1='21'%20y1='12'%20x2='9'%20y2='12'%20stroke='%23b5c96a'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";

const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

function InputField({ label, type = "text", value, onChange, showToggle, showPassword, onToggle, placeholder }) {
    return (
        <div className="auth-field">
            <label className="auth-field__label">{label}</label>
            <div className="auth-field__wrap">
                <input
                    className="auth-field__input"
                    type={showToggle ? (showPassword ? "text" : "password") : type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder || ""}
                />
                {showToggle && (
                    <button className="auth-field__eye" onClick={onToggle} type="button">
                        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                )}
            </div>
        </div>
    );
}

function PhoneField({ value, onChange }) {
    return (
        <div className="auth-field">
            <label className="auth-field__label">Номер телефона</label>
            <div className="auth-field__wrap auth-field__wrap--phone">
                <div className="auth-field__flag">
                    <span className="auth-field__flag-emoji">🇰🇬</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
                <input className="auth-field__input auth-field__input--phone" type="tel" value={value} onChange={onChange} placeholder="(xxx) xxx-xxxx" />
            </div>
        </div>
    );
}

function LoginForm({ onSwitch, onLogin }) {
    const [email, setEmail] = useState("Loisbecket@gmail.com");
    const [password, setPassword] = useState("•••••••");
    const [showPw, setShowPw] = useState(false);
    const [remember, setRemember] = useState(false);

    return (
        <div className="auth-form">
            <h2 className="auth-form__title">Войти</h2>
            <p className="auth-form__sub">
                Все еще нет аккаунта?{" "}
                <button className="auth-form__link" onClick={() => onSwitch("register")}>Зарегистрироваться</button>
            </p>
            <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <InputField label="Пароль" showToggle showPassword={showPw} onToggle={() => setShowPw(p => !p)} value={password} onChange={e => setPassword(e.target.value)} />
            <div className="auth-form__row">
                <label className="auth-form__check">
                    <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                    <span>Запомнить меня</span>
                </label>
                <button className="auth-form__link">Забыли пароль?</button>
            </div>
            <button className="auth-form__btn" onClick={() => onLogin()}>Войти</button>
        </div>
    );
}

function RegisterForm({ onSwitch }) {
    const [name, setName] = useState("Lois Becket");
    const [email, setEmail] = useState("Loisbecket@gmail.com");
    const [phone, setPhone] = useState("(454) 726-0592");
    const [password, setPassword] = useState("•••••••");
    const [showPw, setShowPw] = useState(false);

    return (
        <div className="auth-form">
            <h2 className="auth-form__title">Зарегистрироваться</h2>
            <p className="auth-form__sub">
                Уже есть аккаунт?{" "}
                <button className="auth-form__link" onClick={() => onSwitch("login")}>Войти</button>
            </p>
            <InputField label="Nickname" value={name} onChange={e => setName(e.target.value)} />
            <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <PhoneField value={phone} onChange={e => setPhone(e.target.value)} />
            <InputField label="Пароль" showToggle showPassword={showPw} onToggle={() => setShowPw(p => !p)} value={password} onChange={e => setPassword(e.target.value)} />
            <button className="auth-form__btn auth-form__btn--disabled">Зарегистрироваться</button>
        </div>
    );
}

function ProfilePage({ onLogoutRequest }) {
    const tiles = [
        { icon: CART_ICON, label: "Заказы" },
        { icon: locationIcon, label: "Адрес" },
        { icon: accountIcon, label: "Аккаунт" },
    ];

    return (
        <div className="profile">
            {/* Шапка */}
            <div className="profile__header">
                <div className="profile__avatar">
                    <img src={acc} alt="Derrimet" />
                </div>
                <div className="profile__info">
                    <span className="profile__name">Derrimet</span>
                    <span className="profile__email">example@gmail.com</span>
                </div>
                <button className="profile__logout-btn" onClick={onLogoutRequest} title="Выйти">
                    <img src={LOGOUT_SVG} alt="выйти" />
                </button>
            </div>

            {/* Плитки */}
            <div className="profile__tiles">
                {tiles.map(({ icon, label }) => (
                    <div key={label} className="profile__tile">
                        <div className="profile__tile-icon">
                            <img src={icon} alt={label} className="profile__tile-img" />
                        </div>
                        <span className="profile__tile-label">{label}</span>
                    </div>
                ))}

                {/* Выйти — только мобайл */}
                <div className="profile__tile profile__tile--logout-mobile" onClick={onLogoutRequest}>
                    <div className="profile__tile-icon">
                        <img src={LOGOUT_SVG} alt="выйти" className="profile__tile-img" />
                    </div>
                    <span className="profile__tile-label">Выйти</span>
                </div>
            </div>
        </div>
    );
}

function LogoutModal({ onCancel, onConfirm }) {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <p className="modal__text">Вы уверены, что хотите выйти?</p>
                <div className="modal__actions">
                    <button className="modal__btn modal__btn--cancel" onClick={onCancel}>Отменить</button>
                    <button className="modal__btn modal__btn--confirm" onClick={onConfirm}>Выйти</button>
                </div>
            </div>
        </div>
    );
}

export default function AuthPage() {
    const [view, setView] = useState("login");
    const [showLogout, setShowLogout] = useState(false);

    const handleLogin = () => setView("profile");
    const handleLogout = () => { setShowLogout(false); setView("login"); };

    return (
        <div className="auth-page">
            {(view === "login" || view === "register") && (
                <div className="auth-page__photo">
                    <img src={acc} alt="Di Store cosmetics" />
                </div>
            )}
            <div className={`auth-page__content ${view === "profile" ? "auth-page__content--full" : ""}`}>
                {view === "login" && <LoginForm onSwitch={setView} onLogin={handleLogin} />}
                {view === "register" && <RegisterForm onSwitch={setView} />}
                {view === "profile" && <ProfilePage onLogoutRequest={() => setShowLogout(true)} />}
            </div>
            {showLogout && <LogoutModal onCancel={() => setShowLogout(false)} onConfirm={handleLogout} />}
        </div>
    );
}