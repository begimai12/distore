import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
import favourites from "../../assets/favourites.svg";
import account from "../../assets/account.svg";

const BURGER_ICON =
    "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1.25%205H23.75M1.25%2012.5H23.75M1.25%2020H23.75'%20stroke='%23CCD47C'%20stroke-width='2.08333'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";

const SEARCH_ICON =
    "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_16_1103)'%3e%3cpath%20d='M17.2613%2019.1531C15.1112%2020.8221%2012.4059%2021.609%209.69613%2021.3535C6.98634%2021.0981%204.47573%2019.8195%202.67535%2017.7781C0.874966%2015.7367%20-0.0798578%2013.0858%200.0052356%2010.3652C0.090329%207.6445%201.20894%205.05852%203.13338%203.1336C5.05815%201.20903%207.64395%200.0903355%2010.3644%200.00523597C13.0849%20-0.0798636%2015.7355%200.875029%2017.7768%202.67554C19.8181%204.47605%2021.0966%206.98684%2021.352%209.69683C21.6074%2012.4068%2020.8206%2015.1123%2019.1517%2017.2625L24.5732%2022.6844C24.7492%2022.8479%2024.8779%2023.0559%2024.9457%2023.2864C25.0135%2023.5169%2025.0179%2023.7614%2024.9584%2023.9942C24.8989%2024.227%2024.7777%2024.4394%2024.6075%2024.6091C24.4374%2024.7788%2024.2247%2024.8995%2023.9918%2024.9584C23.7593%2025.0178%2023.515%2025.0135%2023.2847%2024.9461C23.0544%2024.8786%2022.8465%2024.7504%2022.6828%2024.5749L17.2613%2019.1531ZM18.7237%2010.6992C18.7395%209.63557%2018.5437%208.57935%2018.1477%207.59205C17.7516%206.60474%2017.1632%205.70605%2016.4167%204.94825C15.6702%204.19044%2014.7804%203.58866%2013.7992%203.17791C12.818%202.76715%2011.7649%202.55562%2010.7011%202.55562C9.63743%202.55562%208.58433%202.76715%207.60311%203.17791C6.62189%203.58866%205.73213%204.19044%204.9856%204.94825C4.23906%205.70605%203.65066%206.60474%203.2546%207.59205C2.85855%208.57935%202.66276%209.63557%202.67862%2010.6992C2.71003%2012.8064%203.56908%2014.8166%205.07018%2016.2956C6.57128%2017.7746%208.59392%2018.6036%2010.7011%2018.6036C12.8084%2018.6036%2014.831%2017.7746%2016.3321%2016.2956C17.8332%2014.8166%2018.6923%2012.8064%2018.7237%2010.6992Z'%20fill='%23CCD47C'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_16_1103'%3e%3crect%20width='25'%20height='25'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";

const CART_ICON =
    "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_15_291)'%3e%3cpath%20d='M20%2020C18.6125%2020%2017.5%2021.1125%2017.5%2022.5C17.5%2023.163%2017.7634%2023.7989%2018.2322%2024.2678C18.7011%2024.7366%2019.337%2025%2020%2025C20.663%2025%2021.2989%2024.7366%2021.7678%2024.2678C22.2366%2023.7989%2022.5%2023.163%2022.5%2022.5C22.5%2021.837%2022.2366%2021.2011%2021.7678%2020.7322C21.2989%2020.2634%2020.663%2020%2020%2020ZM0%200V2.5H2.5L7%2011.9875L5.3%2015.05C5.1125%2015.4%205%2015.8125%205%2016.25C5%2016.913%205.26339%2017.5489%205.73223%2018.0178C6.20107%2018.4866%206.83696%2018.75%207.5%2018.75H22.5V16.25H8.025C7.94212%2016.25%207.86263%2016.2171%207.80403%2016.1585C7.74542%2016.0999%207.7125%2016.0204%207.7125%2015.9375C7.7125%2015.875%207.725%2015.825%207.75%2015.7875L8.875%2013.75H18.1875C19.125%2013.75%2019.95%2013.225%2020.375%2012.4625L24.85%204.375C24.9375%204.175%2025%203.9625%2025%203.75C25%203.41848%2024.8683%203.10054%2024.6339%202.86612C24.3995%202.6317%2024.0815%202.5%2023.75%202.5H5.2625L4.0875%200M7.5%2020C6.1125%2020%205%2021.1125%205%2022.5C5%2023.163%205.26339%2023.7989%205.73223%2024.2678C6.20107%2024.7366%206.83696%2025%207.5%2025C8.16304%2025%208.79893%2024.7366%209.26777%2024.2678C9.73661%2023.7989%2010%2023.163%2010%2022.5C10%2021.837%209.73661%2021.2011%209.26777%2020.7322C8.79893%2020.2634%208.16304%2020%207.5%2020Z'%20fill='%23CCD47C'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_15_291'%3e%3crect%20width='25'%20height='25'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";

const LOGO_URL = "https://distore.one/assets/logo-RTk1AIHF.svg";

const NAV_LINKS = [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: "/catalog" },
    { label: "О нас", href: "/about" },
    { label: "Контакты", href: "/contacts" },
];

const CATEGORIES = [
    {
        label: "Декоративная косметика",
        sub: [
            "База под макияж", "Бальзамы для губ", "Для бровей", "Для ресниц",
            "Карандаши для глаз", "Карандаши для губ", "Консилеры", "Контур",
            "Палетки для лица", "Подводки для глаз", "Помады", "Пудры",
            "Румяна", "Тени для век", "Тональные основы", "Фиксатор для макияжа", "Хайлайтеры",
        ],
    },
    { label: "Уход для лица", sub: [] },
    { label: "Уход за волосами", sub: [] },
    { label: "Уход за телом", sub: [] },
    { label: "Наборы", sub: [] },
    { label: "Парфюм", sub: [] },
    { label: "Разное", sub: [] },
];

const LANGUAGES = [
    { label: "English", flag: "🇺🇸" },
    { label: "Кыргызча", flag: "🇰🇬" },
    { label: "Русский", flag: "🇷🇺" },
];

export default function Header() {
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("menu");
    const [activeCategory, setActiveCategory] = useState(null);
    const [langOpen, setLangOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1023);

    const burgerRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 1023);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Закрываем десктоп-дропдаун при клике вне
    useEffect(() => {
        if (!menuOpen || isMobile) return;
        const handler = (e) => {
            const inBurger = burgerRef.current && burgerRef.current.contains(e.target);
            const inDropdown = dropdownRef.current && dropdownRef.current.contains(e.target);
            if (!inBurger && !inDropdown) {
                setMenuOpen(false);
                setActiveCategory(null);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [menuOpen, isMobile]);

    const handleBurgerClick = () => {
        setMenuOpen((v) => !v);
        setActiveCategory(null);
    };

    const handleNavClick = () => {
        setMenuOpen(false);
        setActiveCategory(null);
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setActiveCategory(null);
        setActiveTab("menu");
        setLangOpen(false);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setActiveCategory(null);
    };

    return (
        <>
            {/* ════════ HEADER ════════ */}
            <header className="header">

                {/* LEFT: бургер + десктоп-навигация */}
                <div className="header-left">
                    <div className="burger-wrapper" ref={burgerRef}>
                        <button className="icon-btn" aria-label="Меню" onClick={handleBurgerClick}>
                            <img src={BURGER_ICON} className="icon-burger" alt="меню" />
                        </button>
                    </div>

                    <nav className="nav desktop-only">
                        {NAV_LINKS.map(({ label, href }) => (
                            <Link
                                key={href}
                                to={href}
                                className={`nav-link${pathname === href ? " nav-link--active" : ""}`}
                                onClick={handleNavClick}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* MOBILE: логотип по центру */}
                <div className="mobile-logo mobile-only">
                    <img src={LOGO_URL} className="mobile-logo__img" alt="DI STORE" />
                </div>

                {/* RIGHT */}
                <div className="header-right">
                    <div className="search-bar desktop-only">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Поиск"
                            className="search-input"
                        />
                        <img src={SEARCH_ICON} className="icon-search" alt="поиск" />
                    </div>

                    <button className="icon-btn mobile-only" aria-label="Поиск">
                        <img src={SEARCH_ICON} className="icon-search-mobile" alt="поиск" />
                    </button>

                    <button className="icon-btn desktop-only" aria-label="Избранное">
                        <img src={favourites} className="icon-wishlist" alt="избранное" />
                    </button>

                    <button className="icon-btn" aria-label="Корзина">
                        <img src={CART_ICON} className="icon-cart" alt="корзина" />
                    </button>

                    <button className="icon-btn desktop-only" aria-label="Личный кабинет">
                        <img src={account} className="icon-profile" alt="личный кабинет" />
                    </button>
                </div>
            </header>

            {/* ════════ DESKTOP DROPDOWN ════════ */}
            {menuOpen && !isMobile && (
                <div className="dropdown" ref={dropdownRef}>

                    {/* Первый уровень */}
                    {!activeCategory && CATEGORIES.map((cat) => (
                        <div
                            key={cat.label}
                            className="dropdown-item"
                            onClick={() => cat.sub.length > 0 ? setActiveCategory(cat) : setMenuOpen(false)}
                        >
                            <span>{cat.label}</span>
                            {cat.sub.length > 0 && <span className="dropdown-arrow">›</span>}
                        </div>
                    ))}

                    {/* Второй уровень — вместо первого */}
                    {activeCategory && (
                        <>
                            <div className="dropdown-sub__title" onClick={() => setActiveCategory(null)}>
                                <span className="dropdown-sub__back">‹</span>
                                {activeCategory.label}
                            </div>
                            {activeCategory.sub.map((sub) => (
                                <div key={sub} className="dropdown-sub__item" onClick={() => setMenuOpen(false)}>
                                    {sub}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}

            {/* ════════ MOBILE FULLSCREEN MENU ════════ */}
            {menuOpen && isMobile && (
                <div className="mobile-menu">

                    {/* Шапка */}
                    <div className="mobile-menu__header">
                        <button className="mobile-menu__close" onClick={closeMenu}>✕</button>
                        <div className="mobile-logo">
                            <img src={LOGO_URL} className="mobile-logo__img" alt="DI STORE" />
                        </div>
                        <div className="mobile-menu__icons">
                            <button className="icon-btn" aria-label="Поиск">
                                <img src={SEARCH_ICON} className="icon-search-mobile" alt="поиск" />
                            </button>
                            <button className="icon-btn" aria-label="Корзина">
                                <img src={CART_ICON} className="icon-cart-mobile" alt="корзина" />
                            </button>
                        </div>
                    </div>

                    {/* Табы */}
                    <div className="mobile-menu__tabs">
                        <button
                            className={`mobile-tab${activeTab === "menu" ? " mobile-tab--active" : ""}`}
                            onClick={() => handleTabChange("menu")}
                        >
                            Меню
                        </button>
                        <button
                            className={`mobile-tab${activeTab === "categories" ? " mobile-tab--active" : ""}`}
                            onClick={() => handleTabChange("categories")}
                        >
                            Категории
                        </button>
                    </div>

                    {/* Контент */}
                    <div className="mobile-menu__content">

                        {/* Таб: Меню */}
                        {activeTab === "menu" && (
                            <nav className="mobile-nav">
                                {NAV_LINKS.map(({ label, href }) => (
                                    <Link
                                        key={href}
                                        to={href}
                                        className={`mobile-nav__link${pathname === href ? " mobile-nav__link--active" : ""}`}
                                        onClick={handleNavClick}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </nav>
                        )}

                        {/* Таб: Категории — первый уровень */}
                        {activeTab === "categories" && !activeCategory && (
                            <div className="mobile-categories">
                                {CATEGORIES.map((cat) => (
                                    <div
                                        key={cat.label}
                                        className="mobile-categories__item"
                                        onClick={() => cat.sub.length > 0 && setActiveCategory(cat)}
                                    >
                                        <span>{cat.label}</span>
                                        <span className="mobile-categories__arrow">›</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Таб: Категории — второй уровень */}
                        {activeTab === "categories" && activeCategory && (
                            <div className="mobile-subcategories">
                                <button
                                    className="mobile-subcategories__back"
                                    onClick={() => setActiveCategory(null)}
                                >
                                    <span>‹</span>
                                    <span className="mobile-subcategories__title">{activeCategory.label}</span>
                                </button>
                                {activeCategory.sub.map((sub) => (
                                    <div key={sub} className="mobile-categories__item mobile-categories__item--sub">
                                        {sub}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Футер — только на вкладке Меню */}
                    {activeTab === "menu" && (
                        <div className="mobile-menu__footer">
                            <div className="lang-switcher">
                                {langOpen && (
                                    <div className="lang-list">
                                        {LANGUAGES.map((l) => (
                                            <div key={l.label} className="lang-item">
                                                <span>{l.label}</span>
                                                <span>{l.flag}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <button className="lang-btn" onClick={() => setLangOpen((v) => !v)}>
                                    <span>Язык</span>
                                    <span>{langOpen ? "∨" : "∧"}</span>
                                </button>
                            </div>

                            <div className="social-links">
                                {/* Instagram */}
                                <a href="#" aria-label="Instagram" className="social-link">
                                    <svg className="social-icon" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" fill="#CCD47C" />
                                    </svg>
                                </a>
                                {/* WhatsApp */}
                                <a href="#" aria-label="WhatsApp" className="social-link">
                                    <svg className="social-icon" viewBox="0 0 24 24" fill="none">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" fill="#CCD47C" />
                                    </svg>
                                </a>
                                {/* Telegram */}
                                <a href="#" aria-label="Telegram" className="social-link">
                                    <svg className="social-icon" viewBox="0 0 24 24" fill="none">
                                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="#CCD47C" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}