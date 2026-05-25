import { useState } from "react";
import "./tabbar.css";
import favourites from "../../assets/favourites.svg";
import account from "../../assets/account.svg";
import home from "../../assets/home.svg";

export default function TabBar() {
    const [active, setActive] = useState("home");

    const tabs = [
        { id: "home", src: home, alt: "Главная", },
        { id: "favourites", src: favourites, alt: "Избранное", },
        { id: "account", src: account, alt: "Профиль", },
    ];

    return (
        <nav className="tab-bar">
            {tabs.map(({ id, src, alt }) => (
                <button
                    key={id}
                    className={`tab-bar__item${active === id ? " tab-bar__item--active" : ""}`}
                    aria-label={alt}
                    onClick={() => setActive(id)}
                >
                    {active === id ? (
                        <div className="tab-bar__circle">
                            <img src={src} className="tab-bar__icon tab-bar__icon--active" alt={alt} />
                        </div>
                    ) : (
                        <img src={src} className="tab-bar__icon" alt={alt} />
                    )}
                </button>
            ))}
        </nav>
    );
}