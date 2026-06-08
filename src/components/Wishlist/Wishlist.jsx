import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import "./wishlist.css";

const ARROW_LEFT = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M27.2002%208.0001L13.5469%2020.8001L27.2002%2033.6001'%20stroke='black'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";

export default function Wishlist() {
    const { items, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="wl-root">
            <div className="wl-header">
                <button className="wl-back" onClick={() => window.history.back()} aria-label="Назад">
                    <img src={ARROW_LEFT} alt="назад" />
                </button>
                <h1 className="wl-title">Список Желаний</h1>
                <div className="wl-header__placeholder" />
            </div>

            {items.length === 0 ? (
                <div className="wl-empty">
                    <p>Список желаний пуст</p>
                </div>
            ) : (
                <div className="wl-grid">
                    {items.map(item => (
                        <div key={item.id} className="wl-card">
                            <div className="wl-card__img">
                                <img src={item.img} alt={item.name} />
                            </div>
                            <div className="wl-card__info">
                                <div className="wl-card__top">
                                    <div>
                                        <p className="wl-card__name">{item.name}</p>
                                        {item.volume && <p className="wl-card__volume">{item.volume}</p>}
                                    </div>
                                    <button
                                        className="wl-card__heart"
                                        onClick={() => removeFromWishlist(item.id)}
                                        aria-label="Удалить из желаний"
                                    >
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#e74c3c">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="wl-card__price">
                                    {typeof item.price === "number" ? item.price.toLocaleString() + " сом" : item.price}
                                </p>
                                <button
                                    className="wl-card__cart"
                                    onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, img: item.img, volume: item.volume })}
                                >
                                    В корзину
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
