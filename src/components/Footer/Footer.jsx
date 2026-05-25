import "./footer.css";

const USEFUL_LINKS = [
    "Политика конфиденциальности",
    "Возврат товара",
    "Правила оформления заказа",
    "Правила продажи товаров",
    "Публичная оферта",
    "Правила оплаты и возврата денежных средств",
];

const ADDRESS_ITEMS = [
    "Медерова 44/1, бутик Б6",
    "Ибраимова 115/1",
    "Арстанбека Дуйшеева, 12",
    "Ежедневно с 10:00 до 21:00",
    "Distore.biz@gmail.com",
];

const ALL_COLUMNS = [
    {
        title: "Аккаунт",
        links: ["Аккаунт", "Мой заказ", "Адрес", "Корзина", "Список желаний"],
        desktopOnly: true,
    },
    {
        title: "Меню",
        links: ["Декоративная косметика", "Уход для лица", "Уход за волосами", "Уход за телом", "Наборы", "Парфюм", "Разное"],
        desktopOnly: true,
    },
    {
        title: "Полезное",
        links: USEFUL_LINKS,
    },
    {
        title: "Адрес",
        items: ADDRESS_ITEMS,
    },
];

const SOCIALS = [
    {
        label: "Telegram", href: "#", icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21.5 2.5L2.5 9.5l7 2.5m12-9.5L12 14m0 0l2 7.5L21.5 2.5M12 14l-2.5-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )
    },
    {
        label: "Instagram", href: "#", icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
        )
    },
    {
        label: "WhatsApp", href: "#", icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 21l1.65-3.8A9 9 0 1 1 12 21h-.1L3 21z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )
    },
];

const SOCIALS_DESKTOP = [...SOCIALS];

export default function Footer() {
    return (
        <footer className="footer">
            {/* Десктоп: все 4 колонки */}
            <div className="footer__columns desktop-only">
                {ALL_COLUMNS.map((col) => (
                    <div key={col.title} className="footer__col">
                        <h3 className="footer__col-title">{col.title}</h3>
                        {col.links && col.links.map((link) => (
                            <a key={link} href="#" className="footer__link">{link}</a>
                        ))}
                        {col.items && col.items.map((item) => (
                            <p key={item} className="footer__text">{item}</p>
                        ))}
                    </div>
                ))}
            </div>

            {/* Мобайл: только Полезное и Адрес */}
            <div className="footer__columns-mobile mobile-only">
                {ALL_COLUMNS.filter(c => !c.desktopOnly).map((col) => (
                    <div key={col.title} className="footer__col">
                        <h3 className="footer__col-title">{col.title}</h3>
                        {col.links && col.links.map((link) => (
                            <a key={link} href="#" className="footer__link">{link}</a>
                        ))}
                        {col.items && col.items.map((item) => (
                            <p key={item} className="footer__text">{item}</p>
                        ))}
                    </div>
                ))}
            </div>

            {/* Логотип */}
            <div className="footer__logo">
                <img src="https://distore.one/assets/logo-RTk1AIHF.svg" alt="DI STORE" className="footer__logo-img" />
            </div>

            {/* Соцсети */}
            <div className="footer__socials footer__socials--desktop desktop-only">
                {SOCIALS_DESKTOP.map((s) => (
                    <a key={s.label} href={s.href} aria-label={s.label} className="footer__social">{s.icon}</a>
                ))}
            </div>
            <div className="footer__socials footer__socials--mobile mobile-only">
                {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} aria-label={s.label} className="footer__social">{s.icon}</a>
                ))}
            </div>
        </footer>
    );
}