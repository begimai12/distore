import { useNavigate, useLocation } from "react-router-dom";
import "./tabbar.css";
import favourites from "../../assets/favourites.svg";
import account from "../../assets/account.svg";
import home from "../../assets/home.svg";

const TABS = [
    { id: "home", src: home, alt: "Главная", path: "/" },
    { id: "favourites", src: favourites, alt: "Избранное", path: "/favourites" },
    { id: "account", src: account, alt: "Профиль", path: "/account" },
];

export default function TabBar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <nav className="tab-bar">
            {TABS.map(({ id, src, alt, path }) => (
                <button
                    key={id}
                    className={`tab-bar__item${pathname === path ? " tab-bar__item--active" : ""}`}
                    aria-label={alt}
                    onClick={() => navigate(path)}
                >
                    <img src={src} className="tab-bar__icon" alt={alt} />
                </button>
            ))}
        </nav>
    );
}
