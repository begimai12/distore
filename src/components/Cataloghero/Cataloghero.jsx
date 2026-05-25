import { useState, useRef, useEffect } from "react";
import "./cataloghero.css";

const LOGO_URL = "https://distore.one/assets/logo-RTk1AIHF.svg";

const CATEGORIES = [
    "Декоративная косметика", "Косметички", "Наборы",
    "Парфюм", "Разное", "Уход для лица", "Уход за волосами", "Уход за телом"
];

const SORT_OPTIONS = [
    "Исходная сортировка",
    "По популярности",
    "По новизне",
    "Цена: по возрастанию",
    "Цена: по убыванию",
];

const FILTERS = [
    { id: "price", label: "Цена", type: "price" },
    { id: "category", label: "Категория", type: "list", options: CATEGORIES },
    { id: "brand", label: "Бренд", type: "list", options: [] },
    { id: "aroma", label: "Аромат", type: "list", options: [] },
    { id: "volume", label: "Объём", type: "list", options: [] },
];

const SORT_ICON = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 3l3 3-3 3M7 21l-3-3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const FILTER_ICON = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="7" cy="6" r="2" stroke="currentColor" strokeWidth="2" fill="white" />
        <circle cx="17" cy="12" r="2" stroke="currentColor" strokeWidth="2" fill="white" />
    </svg>
);

export default function CatalogHero({ title = "Декоративная косметика" }) {
    const [openFilter, setOpenFilter] = useState(null);
    const [openSort, setOpenSort] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(["Декоративная косметика"]);
    const [selectedSort, setSelectedSort] = useState("Исходная сортировка");
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(1000);
    const dropdownRef = useRef(null);

    // Закрываем при клике вне
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenFilter(null);
                setOpenSort(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggleCategory = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    return (
        <div className="catalog-hero" ref={dropdownRef}>
            {/* Логотип */}
            <div className="catalog-hero__logo">
                <span className="catalog-hero__heart">♥</span>
                <img src={LOGO_URL} alt="DI STORE" className="catalog-hero__logo-img" />
                <span className="catalog-hero__heart">♥</span>
            </div>

            {/* Фильтры + заголовок + сортировка */}
            <div className="catalog-hero__bar">
                {/* Иконка фильтра */}
                <button className="catalog-hero__filter-icon" aria-label="Фильтры">
                    {FILTER_ICON}
                </button>

                {/* Заголовок */}
                <h1 className="catalog-hero__title">{title}</h1>

                {/* Кнопка сортировки */}
                <button
                    className="catalog-hero__sort-btn"
                    onClick={() => { setOpenSort(v => !v); setOpenFilter(null); }}
                    aria-label="Сортировка"
                >
                    {SORT_ICON}
                </button>

                {/* Дропдаун сортировки */}
                {openSort && (
                    <div className="catalog-hero__sort-dropdown">
                        {SORT_OPTIONS.map((opt) => (
                            <button
                                key={opt}
                                className={`sort-option${selectedSort === opt ? " sort-option--active" : ""}`}
                                onClick={() => { setSelectedSort(opt); setOpenSort(false); }}
                            >
                                <span>{opt}</span>
                                <span className="sort-option__arrow">›</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Фильтр-кнопки */}
            <div className="catalog-hero__filters">
                {FILTERS.map((filter) => (
                    <div key={filter.id} className="catalog-hero__filter-wrap">
                        <button
                            className={`catalog-hero__filter-btn${openFilter === filter.id ? " catalog-hero__filter-btn--open" : ""}`}
                            onClick={() => setOpenFilter(openFilter === filter.id ? null : filter.id)}
                        >
                            <span>{filter.label}</span>
                            <span className="catalog-hero__filter-arrow">∨</span>
                        </button>

                        {/* Дропдаун фильтра */}
                        {openFilter === filter.id && (
                            <div className="catalog-hero__filter-dropdown">
                                {filter.type === "price" && (
                                    <div className="filter-price">
                                        <div className="filter-price__row">
                                            <span>от</span>
                                            <input
                                                type="number"
                                                value={priceFrom}
                                                onChange={e => setPriceFrom(e.target.value)}
                                                className="filter-price__input"
                                            />
                                        </div>
                                        <div className="filter-price__row">
                                            <span>до</span>
                                            <input
                                                type="number"
                                                value={priceTo}
                                                onChange={e => setPriceTo(e.target.value)}
                                                className="filter-price__input"
                                            />
                                        </div>
                                    </div>
                                )}
                                {filter.type === "list" && filter.options.map((opt) => (
                                    <label key={opt} className="filter-option">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(opt)}
                                            onChange={() => toggleCategory(opt)}
                                            className="filter-option__checkbox"
                                        />
                                        <span>{opt}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}