import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./cart.css";

const ARROW_LEFT = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M27.2002%208.0001L13.5469%2020.8001L27.2002%2033.6001'%20stroke='black'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";

export default function Cart() {
    const { items, updateQty, removeItem, total } = useCart();
    const navigate = useNavigate();

    return (
        <div className="cart-root">
            {/* Шапка */}
            <div className="cart-header">
                <button className="cart-back" onClick={() => window.history.back()} aria-label="Назад">
                    <img src={ARROW_LEFT} alt="назад" />
                </button>
                <h1 className="cart-title">Корзина</h1>
                <div className="cart-header__placeholder" />
            </div>

            {/* Сетка */}
            {items.length === 0 ? (
                <div className="cart-empty">
                    <p>Корзина пуста</p>
                </div>
            ) : (
                <div className="cart-grid-wrap">
                    <div className="cart-grid">
                        {items.map(item => (
                            <div key={item.cartId} className="cart-card">
                                <div className="cart-card__img">
                                    <img src={item.img} alt={item.name} />
                                </div>
                                <div className="cart-card__info">
                                    <div className="cart-card__top">
                                        <div>
                                            <p className="cart-card__name">{item.name}</p>
                                            <p className="cart-card__volume">{item.volume}</p>
                                        </div>
                                        <button
                                            className="cart-card__delete"
                                            onClick={() => removeItem(item.cartId)}
                                            aria-label="Удалить"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                                <path d="M10 11v6M14 11v6" />
                                                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="cart-card__bottom">
                                        <p className="cart-card__price">{item.price.toLocaleString()} сом</p>
                                        <div className="cart-card__qty">
                                            <button className="cart-card__qty-btn" onClick={() => updateQty(item.cartId, -1)}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="11" width="16" height="2" rx="1" /></svg>
                                            </button>
                                            <span className="cart-card__qty-val">{item.qty}</span>
                                            <button className="cart-card__qty-btn" onClick={() => updateQty(item.cartId, 1)}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4a1 1 0 011 1v6h6a1 1 0 010 2h-6v6a1 1 0 01-2 0v-6H5a1 1 0 010-2h6V5a1 1 0 011-1z" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Футер */}
            <div className="cart-footer">
                <div className="cart-footer__total">
                    <span className="cart-footer__label">Общая сумма:</span>
                    <span className="cart-footer__amount">{total.toLocaleString()} сом</span>
                </div>
                <button className="cart-footer__btn" onClick={() => navigate('/ordering')}>К оплате</button>
            </div>
        </div>
    );
}