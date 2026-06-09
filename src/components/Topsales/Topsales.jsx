import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import "./topsales.css";
import "../NewProducts/newproducts.css";
import imgBojSun from "../../assets/products/boj_sun.jpg";
import imgColourpop from "../../assets/products/glow_recipe.jpg";
import imgRare from "../../assets/products/rare_blush.jpg";

const IMG_DR_ALTHEA = "https://distore.one/BrandLogo1C/DR.ALTHEA.jpg";

const CART_ICON = "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_15_291)'%3e%3cpath%20d='M20%2020C18.6125%2020%2017.5%2021.1125%2017.5%2022.5C17.5%2023.163%2017.7634%2023.7989%2018.2322%2024.2678C18.7011%2024.7366%2019.337%2025%2020%2025C20.663%2025%2021.2989%2024.7366%2021.7678%2024.2678C22.2366%2023.7989%2022.5%2023.163%2022.5%2022.5C22.5%2021.837%2022.2366%2021.2011%2021.7678%2020.7322C21.2989%2020.2634%2020.663%2020%2020%2020ZM0%200V2.5H2.5L7%2011.9875L5.3%2015.05C5.1125%2015.4%205%2015.8125%205%2016.25C5%2016.913%205.26339%2017.5489%205.73223%2018.0178C6.20107%2018.4866%206.83696%2018.75%207.5%2018.75H22.5V16.25H8.025C7.94212%2016.25%207.86263%2016.2171%207.80403%2016.1585C7.74542%2016.0999%207.7125%2016.0204%207.7125%2015.9375C7.7125%2015.875%207.725%2015.825%207.75%2015.7875L8.875%2013.75H18.1875C19.125%2013.75%2019.95%2013.225%2020.375%2012.4625L24.85%204.375C24.9375%204.175%2025%203.9625%2025%203.75C25%203.41848%2024.8683%203.10054%2024.6339%202.86612C24.3995%202.6317%2024.0815%202.5%2023.75%202.5H5.2625L4.0875%200M7.5%2020C6.1125%2020%205%2021.1125%205%2022.5C5%2023.163%205.26339%2023.7989%205.73223%2024.2678C6.20107%2024.7366%206.83696%2025%207.5%2025C8.16304%2025%208.79893%2024.7366%209.26777%2024.2678C9.73661%2023.7989%2010%2023.163%2010%2022.5C10%2021.837%209.73661%2021.2011%209.26777%2020.7322C8.79893%2020.2634%208.16304%2020%207.5%2020Z'%20fill='%23CCD47C'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_15_291'%3e%3crect%20width='25'%20height='25'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";

// Пока статичные — потом API
const PRODUCTS = [
    { id: 101, name: "Beauty of Joseon SPF 50", price: 1100, img: imgBojSun },
    { id: 102, name: "DR.ALTHEA double serum balm foundation", price: 1500, img: IMG_DR_ALTHEA },
    { id: 103, name: "COLOURPOP Pressed Powder Palette", price: 2100, img: imgColourpop },
    { id: 104, name: "RARE BEAUTY soft pinch tinted lip oil", price: 2400, img: imgRare },
];

export default function TopSales() {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    return (
        <section className="top-sales">
            <h2 className="top-sales__title">Лидеры продаж за месяц</h2>

            <div className="top-sales__grid">
                {PRODUCTS.map((product, i) => (
                    <div key={product.id} className={`product-card top-sales__card top-sales__card--${i + 1}`} onClick={() => navigate('/productpage', { state: { product } })} style={{ cursor: "pointer" }}>
                        <div className="product-card__img-wrap">
                            <img src={product.img} alt={product.name} className="product-card__img" />
                            <button className="product-card__cart" aria-label="В корзину" onClick={e => { e.stopPropagation(); addToCart(product); }}>
                                <img src={CART_ICON} alt="корзина" />
                            </button>
                            <button className="product-card__heart" aria-label="В избранное" onClick={e => { e.stopPropagation(); toggleWishlist(product); }}>
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
        </section>
    );
}