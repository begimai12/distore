import { useState } from "react";
import "./ordertracking.css";

// Моковые данные заказов
const ORDERS = [
    { id: 1, name: "ISNTREE Hyaluronic Acid Moist Cream", volume: "100мл", qty: "2шт", price: "750 сом", paid: false },
    { id: 2, name: "ISNTREE Hyaluronic Acid Moist Cream", volume: "100мл", qty: "2шт", price: "750 сом", paid: false },
    { id: 3, name: "ISNTREE Hyaluronic Acid Moist Cream", volume: "100мл", qty: "2шт", price: "750 сом", paid: true },
    { id: 4, name: "ISNTREE Hyaluronic Acid Moist Cream", volume: "100мл", qty: "2шт", price: "750 сом", paid: true },
];

// Иконки этапов (SVG inline)
const BoxIcon = () => (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M10 20L30 10L50 20V40L30 50L10 40V20Z" fill="#CCD47C" />
        <path d="M30 10L30 30M10 20L30 30M50 20L30 30" stroke="#fff" strokeWidth="2" />
    </svg>
);

const TruckIcon = () => (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <rect x="6" y="18" width="34" height="22" rx="3" fill="#CCD47C" />
        <path d="M40 26H50L54 34V40H40V26Z" fill="#CCD47C" />
        <circle cx="16" cy="42" r="5" fill="#CCD47C" stroke="#fff" strokeWidth="2" />
        <circle cx="46" cy="42" r="5" fill="#CCD47C" stroke="#fff" strokeWidth="2" />
    </svg>
);

const CheckBoxIcon = () => (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M10 20L30 10L50 20V40L30 50L10 40V20Z" fill="#CCD47C" />
        <path d="M22 30L28 36L38 24" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="46" cy="16" r="8" fill="#CCD47C" stroke="#fff" strokeWidth="2" />
        <path d="M42 16L45 19L50 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const STAGES = [
    {
        icon: <BoxIcon />,
        title: "Сборка",
        desc: "На этапе сборки тщательно проверяют ваш заказ и проверяют перед отправкой",
        date: "24.06.2024",
        active: true,
    },
    {
        icon: <TruckIcon />,
        title: "Доставка",
        desc: "На данном этапе заказа отправляется покупателю",
        date: null,
        active: false,
    },
    {
        icon: <CheckBoxIcon />,
        title: "Доставлено",
        desc: "Заказа доставлен покупателю",
        confirm: true,
        date: null,
        active: false,
    },
];

// ── Вкладка «Заказ» ──
function OrderList() {
    return (
        <div className="ot-list">
            {ORDERS.map(order => (
                <div key={order.id} className="ot-item">
                    <div className="ot-item__img">
                        <img src="/product-placeholder.jpg" alt={order.name}
                            onError={e => { e.target.style.background = '#e8f4e8'; e.target.style.display = 'block'; }} />
                    </div>
                    <div className="ot-item__info">
                        <span className="ot-item__name">{order.name}</span>
                        <div className="ot-item__meta">
                            <span className="ot-item__volume">{order.volume}</span>
                            <span className="ot-item__qty">{order.qty}</span>
                            <span className="ot-item__price">{order.price}</span>
                        </div>
                    </div>
                    <button className={`ot-item__btn ${order.paid ? "ot-item__btn--status" : "ot-item__btn--pay"}`}>
                        {order.paid ? "Статус заказа" : "Оплатить"}
                    </button>
                </div>
            ))}
        </div>
    );
}

// ── Вкладка «Статус заказа» ──
function OrderStatus() {
    return (
        <div className="ot-status">
            {/* Десктоп: горизонтальный прогресс */}
            <div className="ot-status__desktop">
                <div className="ot-status__icons">
                    {STAGES.map((s, i) => (
                        <div key={i} className={`ot-stage-icon ${s.active ? "ot-stage-icon--active" : ""}`}>
                            {s.icon}
                        </div>
                    ))}
                </div>
                <div className="ot-status__line-wrap">
                    <div className="ot-status__line">
                        {STAGES.map((s, i) => (
                            <div key={i} className={`ot-status__dot ${s.active ? "ot-status__dot--active" : ""}`} />
                        ))}
                        <div className="ot-status__track" />
                        <div className="ot-status__progress" style={{ width: "50%" }} />
                    </div>
                </div>
                <div className="ot-status__labels">
                    {STAGES.map((s, i) => (
                        <div key={i} className="ot-stage-info">
                            <span className="ot-stage-info__title">{s.title}</span>
                            <span className="ot-stage-info__desc">{s.desc}</span>
                            {s.date && <span className="ot-stage-info__date">{s.date}</span>}
                            {s.confirm && <button className="ot-stage-info__confirm">Подтвердить</button>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Мобайл: вертикальный прогресс */}
            <div className="ot-status__mobile">
                <div className="ot-status__vline-wrap">
                    {STAGES.map((s, i) => (
                        <div key={i} className="ot-vstage">
                            <div className="ot-vstage__left">
                                <div className={`ot-vstage__dot ${s.active ? "ot-vstage__dot--active" : ""}`} />
                                {i < STAGES.length - 1 && <div className="ot-vstage__connector" />}
                            </div>
                            <div className="ot-vstage__right">
                                <div className="ot-vstage__header">
                                    <span className="ot-vstage__title">{s.title}</span>
                                    {s.date && <span className="ot-vstage__date">{s.date}</span>}
                                </div>
                                <span className="ot-vstage__desc">{s.desc}</span>
                                {s.confirm && <button className="ot-vstage__confirm">Подтвердить</button>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Root ──
export default function OrderTracking({ onBack }) {
    const [tab, setTab] = useState("order");

    return (
        <div className="ot-root">
            {/* Заголовок */}
            <div className="ot-header">
                <button className="ot-header__back" onClick={onBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h2 className="ot-header__title">Отслеживание заказа</h2>
            </div>

            {/* Табы */}
            <div className="ot-tabs">
                <button
                    className={`ot-tab ${tab === "order" ? "ot-tab--active" : ""}`}
                    onClick={() => setTab("order")}
                >
                    Заказ
                </button>
                <button
                    className={`ot-tab ${tab === "status" ? "ot-tab--active" : ""}`}
                    onClick={() => setTab("status")}
                >
                    Статус заказа
                </button>
            </div>

            {/* Контент */}
            <div className="ot-content">
                {tab === "order" && <OrderList />}
                {tab === "status" && <OrderStatus />}
            </div>
        </div>
    );
}