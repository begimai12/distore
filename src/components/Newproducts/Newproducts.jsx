import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import "./newproducts.css";
import defaultImg from "../../assets/default.png";

const CART_ICON = "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_15_291)'%3e%3cpath%20d='M20%2020C18.6125%2020%2017.5%2021.1125%2017.5%2022.5C17.5%2023.163%2017.7634%2023.7989%2018.2322%2024.2678C18.7011%2024.7366%2019.337%2025%2020%2025C20.663%2025%2021.2989%2024.7366%2021.7678%2024.2678C22.2366%2023.7989%2022.5%2023.163%2022.5%2022.5C22.5%2021.837%2022.2366%2021.2011%2021.7678%2020.7322C21.2989%2020.2634%2020.663%2020%2020%2020ZM0%200V2.5H2.5L7%2011.9875L5.3%2015.05C5.1125%2015.4%205%2015.8125%205%2016.25C5%2016.913%205.26339%2017.5489%205.73223%2018.0178C6.20107%2018.4866%206.83696%2018.75%207.5%2018.75H22.5V16.25H8.025C7.94212%2016.25%207.86263%2016.2171%207.80403%2016.1585C7.74542%2016.0999%207.7125%2016.0204%207.7125%2015.9375C7.7125%2015.875%207.725%2015.825%207.75%2015.7875L8.875%2013.75H18.1875C19.125%2013.75%2019.95%2013.225%2020.375%2012.4625L24.85%204.375C24.9375%204.175%2025%203.9625%2025%203.75C25%203.41848%2024.8683%203.10054%2024.6339%202.86612C24.3995%202.6317%2024.0815%202.5%2023.75%202.5H5.2625L4.0875%200M7.5%2020C6.1125%2020%205%2021.1125%205%2022.5C5%2023.163%205.26339%2023.7989%205.73223%2024.2678C6.20107%2024.7366%206.83696%2025%207.5%2025C8.16304%2025%208.79893%2024.7366%209.26777%2024.2678C9.73661%2023.7989%2010%2023.163%2010%2022.5C10%2021.837%209.73661%2021.2011%209.26777%2020.7322C8.79893%2020.2634%208.16304%2020%207.5%2020Z'%20fill='%23CCD47C'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_15_291'%3e%3crect%20width='25'%20height='25'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";

const ARROW_LEFT = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M27.2002%208.0001L13.5469%2020.8001L27.2002%2033.6001'%20stroke='black'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";

const TABS = ["Новинки", "Бестселлеры", "Рекомендуемое"];

const PRODUCTS = [
    { id: 1, name: "ISNTREE Hyaluronic Acid Moist Cream", price: 750, img: defaultImg },
    { id: 2, name: "PAULA'S CHOICE barrier repair moisturizer", price: 4700, img: defaultImg },
    { id: 3, name: "ALFAPARF SDL detoxifying low shampoo", price: 1700, img: defaultImg },
    { id: 4, name: "CELIMAX CICA CREAM", price: 750, img: defaultImg },
    { id: 5, name: "ALFAPARF SDL sunshine after sun low shampoo", price: 1200, img: defaultImg },
    { id: 6, name: "AXIS-Y complete no-stress physical sunscreen", price: 1050, img: defaultImg },
    { id: 7, name: "LA SULTANE DE SABA rose body lotion", price: 4700, img: defaultImg },
    { id: 8, name: "HEMPZ body moisturizer coconut Colada&Pineapple", price: 3490, img: defaultImg },
];

const TOTAL_PAGES = 10;

export default function NewProducts() {
    const [activeTab, setActiveTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const getPageNumbers = () => {
        // Показываем: первые 3, ..., последние 2
        const pages = [];
        for (let i = 1; i <= Math.min(3, TOTAL_PAGES); i++) pages.push(i);
        return pages;
    };

    return (
        <section className="new-products">

            {/* Табы */}
            <div className="new-products__tabs">
                {TABS.map((tab, i) => (
                    <button
                        key={tab}
                        className={`new-products__tab${activeTab === i ? " new-products__tab--active" : ""}`}
                        onClick={() => { setActiveTab(i); setCurrentPage(1); }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Сетка товаров */}
            <div className="new-products__grid">
                {PRODUCTS.map((product) => (
                    <div key={product.id} className="product-card">
                        {/* Изображение */}
                        <div className="product-card__img-wrap">
                            <img src={product.img} alt={product.name} className="product-card__img" />
                            <button className="product-card__cart" aria-label="В корзину" onClick={() => addToCart(product)}>
                                <img src={CART_ICON} alt="корзина" />
                            </button>
                            <button className="product-card__heart" aria-label="В избранное" onClick={() => toggleWishlist(product)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? "#e74c3c" : "none"} stroke="#e74c3c" strokeWidth="2">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </button>
                            <div className="product-card__info">
                                <p className="product-card__name">{product.name}</p>
                            </div>
                        </div>

                        <div className="product-card__price-wrap">
                            <span className="product-card__price">{product.price.toLocaleString()} сом</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Пагинация */}
            <div className="new-products__pagination">
                {/* Стрелка назад */}
                <button
                    className="pagination__btn pagination__btn--arrow"
                    onClick={() => setCurrentPage((v) => Math.max(v - 1, 1))}
                    disabled={currentPage === 1}
                    aria-label="Назад"
                >
                    <img src={ARROW_LEFT} alt="назад" className="pagination__arrow" />
                </button>

                {(() => {
                    const pages = [];
                    // Всегда показываем первые 5
                    const showFirst5 = currentPage <= 5;

                    if (showFirst5) {
                        // Страницы 1-5, потом ... 10
                        [1, 2, 3, 4, 5].forEach(p => pages.push(
                            <button
                                key={p}
                                className={`pagination__btn${p === currentPage ? " pagination__btn--active" : ""}`}
                                onClick={() => setCurrentPage(p)}
                            >{p}</button>
                        ));
                        pages.push(<span key="dots" className="pagination__dots">...</span>);
                        pages.push(
                            <button
                                key={TOTAL_PAGES}
                                className="pagination__btn"
                                onClick={() => setCurrentPage(TOTAL_PAGES)}
                            >{TOTAL_PAGES}</button>
                        );
                    } else {
                        // 1 ... prev current next ... 10
                        pages.push(
                            <button key={1} className="pagination__btn" onClick={() => setCurrentPage(1)}>1</button>
                        );
                        pages.push(<span key="dots1" className="pagination__dots">...</span>);
                        [currentPage - 1, currentPage, currentPage + 1]
                            .filter(p => p > 1 && p < TOTAL_PAGES)
                            .forEach(p => pages.push(
                                <button
                                    key={p}
                                    className={`pagination__btn${p === currentPage ? " pagination__btn--active" : ""}`}
                                    onClick={() => setCurrentPage(p)}
                                >{p}</button>
                            ));
                        if (currentPage < TOTAL_PAGES - 2) {
                            pages.push(<span key="dots2" className="pagination__dots">...</span>);
                        }
                        pages.push(
                            <button
                                key={TOTAL_PAGES}
                                className={`pagination__btn${currentPage === TOTAL_PAGES ? " pagination__btn--active" : ""}`}
                                onClick={() => setCurrentPage(TOTAL_PAGES)}
                            >{TOTAL_PAGES}</button>
                        );
                    }
                    return pages;
                })()}

                {/* Стрелка вперёд */}
                <button
                    className="pagination__btn pagination__btn--arrow"
                    onClick={() => setCurrentPage((v) => Math.min(v + 1, TOTAL_PAGES))}
                    disabled={currentPage === TOTAL_PAGES}
                    aria-label="Вперёд"
                >
                    <img src={ARROW_LEFT} alt="вперёд" className="pagination__arrow pagination__arrow--right" />
                </button>
            </div>
        </section>
    );
}