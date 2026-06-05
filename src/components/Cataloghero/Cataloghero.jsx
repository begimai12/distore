import { useState, useRef, useEffect } from "react";
import "./cataloghero.css";
import filterArrow from "../../assets/filter.svg";
import filterIcon from "../../assets/icons.svg";

const ARROW_RIGHT = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M27.2002%208.0001L13.5469%2020.8001L27.2002%2033.6001'%20stroke='black'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";

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
    { id: "volume", label: "Объем", type: "list", options: [] },
];

export default function CatalogHero({ title = "Декоративная косметика", filters, onFiltersChange }) {
    const [openFilter, setOpenFilter] = useState(null);
    const [openSort, setOpenSort] = useState(false);

    // Мобайл drawer
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerExpanded, setDrawerExpanded] = useState({});

    // Временный стейт внутри drawer (применяется по "Сохранить")
    const [draftCategories, setDraftCategories] = useState([]);
    const [draftPriceFrom, setDraftPriceFrom] = useState(0);
    const [draftPriceTo, setDraftPriceTo] = useState(10000);

    const dropdownRef = useRef(null);

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

    const openDrawer = () => {
        setDraftCategories([...filters.categories]);
        setDraftPriceFrom(filters.priceFrom);
        setDraftPriceTo(filters.priceTo);
        setDrawerOpen(true);
    };

    const toggleDrawerSection = (id) =>
        setDrawerExpanded(prev => ({ ...prev, [id]: !prev[id] }));

    const toggleDraftCategory = (cat) =>
        setDraftCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );

    const handleDrawerSave = () => {
        onFiltersChange({ ...filters, categories: draftCategories, priceFrom: draftPriceFrom, priceTo: draftPriceTo });
        setDrawerOpen(false);
    };

    const handleDrawerReset = () => {
        setDraftCategories([]);
        setDraftPriceFrom(0);
        setDraftPriceTo(10000);
    };

    const toggleCategory = (cat) =>
        onFiltersChange({
            ...filters,
            categories: filters.categories.includes(cat)
                ? filters.categories.filter(c => c !== cat)
                : [...filters.categories, cat],
        });

    return (
        <div className="catalog-hero" ref={dropdownRef}>

            {/* ── Логотип ── */}
            <div className="catalog-hero__logo">
                <img src="https://distore.one/assets/logo-RTk1AIHF.svg" alt="DI STORE" className="catalog-hero__logo-img" />
            </div>

            {/* ── Бар: иконка + заголовок + сортировка ── */}
            <div className="catalog-hero__bar">
                <button
                    className="catalog-hero__filter-icon"
                    aria-label="Фильтры"
                    onClick={openDrawer}
                >
                    <img src={filterIcon} alt="фильтры" className="catalog-hero__filter-icon-img" />
                </button>

                <h1 className="catalog-hero__title">{title}</h1>

                <button
                    className="catalog-hero__sort-btn"
                    onClick={() => { setOpenSort(v => !v); setOpenFilter(null); }}
                    aria-label="Сортировка"
                >
                    <img src={filterArrow} alt="сортировка" className="catalog-hero__sort-icon" />
                </button>

                {openSort && (
                    <div className="catalog-hero__sort-dropdown">
                        {SORT_OPTIONS.map((opt) => (
                            <button
                                key={opt}
                                className={`sort-option${filters.sort === opt ? " sort-option--active" : ""}`}
                                onClick={() => { onFiltersChange({ ...filters, sort: opt }); setOpenSort(false); }}
                            >
                                <span>{opt}</span>
                                <img src={ARROW_RIGHT} alt="" className="sort-option__arrow" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Десктоп: таблетки-фильтры ── */}
            <div className="catalog-hero__filters">
                {FILTERS.map((filter) => (
                    <div key={filter.id} className="catalog-hero__filter-wrap">
                        <button
                            className={`catalog-hero__filter-btn${openFilter === filter.id ? " catalog-hero__filter-btn--open" : ""}`}
                            onClick={() => setOpenFilter(openFilter === filter.id ? null : filter.id)}
                        >
                            <span>{filter.label}</span>
                            <img src={ARROW_RIGHT} alt="" className="catalog-hero__filter-arrow" />
                        </button>

                        {openFilter === filter.id && (
                            <div className="catalog-hero__filter-dropdown">
                                {filter.type === "price" && (
                                    <div className="filter-price">
                                        <div className="filter-price__row">
                                            <span>от</span>
                                            <input type="number" value={filters.priceFrom} onChange={e => onFiltersChange({ ...filters, priceFrom: Number(e.target.value) })} className="filter-price__input" />
                                        </div>
                                        <div className="filter-price__row">
                                            <span>до</span>
                                            <input type="number" value={filters.priceTo} onChange={e => onFiltersChange({ ...filters, priceTo: Number(e.target.value) })} className="filter-price__input" />
                                        </div>
                                    </div>
                                )}
                                {filter.type === "list" && filter.options.map((opt) => (
                                    <label key={opt} className="filter-option">
                                        <input
                                            type="checkbox"
                                            checked={filters.categories.includes(opt)}
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

            {/* ── Мобайл: drawer ── */}
            {drawerOpen && (
                <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}>
                    <div className="drawer" onClick={e => e.stopPropagation()}>
                        <div className="drawer__header">
                            <span className="drawer__title">Фильтр товаров</span>
                            <button className="drawer__close" onClick={() => setDrawerOpen(false)}>✕</button>
                        </div>

                        <div className="drawer__body">
                            {FILTERS.map((filter) => (
                                <div key={filter.id} className="drawer__section">
                                    <button
                                        className="drawer__section-btn"
                                        onClick={() => toggleDrawerSection(filter.id)}
                                    >
                                        <span>{filter.label}</span>
                                        <span className="drawer__section-icon">
                                            {drawerExpanded[filter.id] ? "−" : "+"}
                                        </span>
                                    </button>

                                    {drawerExpanded[filter.id] && (
                                        <div className="drawer__section-content">
                                            {filter.type === "price" && (
                                                <div className="filter-price filter-price--drawer">
                                                    <div className="filter-price__row">
                                                        <span>от</span>
                                                        <input type="number" value={draftPriceFrom} onChange={e => setDraftPriceFrom(e.target.value)} className="filter-price__input" />
                                                        <span>до</span>
                                                        <input type="number" value={draftPriceTo} onChange={e => setDraftPriceTo(e.target.value)} className="filter-price__input" />
                                                    </div>
                                                </div>
                                            )}
                                            {filter.type === "list" && filter.options.map((opt) => (
                                                <label key={opt} className="filter-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={draftCategories.includes(opt)}
                                                        onChange={() => toggleDraftCategory(opt)}
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

                        <div className="drawer__footer">
                            <button className="drawer__btn drawer__btn--reset" onClick={handleDrawerReset}>Сбросить</button>
                            <button className="drawer__btn drawer__btn--save" onClick={handleDrawerSave}>Сохранить</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}