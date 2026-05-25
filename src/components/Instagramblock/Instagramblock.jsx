import "./instagramblock.css";
import instagramImg from "../../assets/instagram.png";

export default function InstagramBlock() {
    return (
        <section className="instagram">
            <h2 className="instagram__title">Следите за нами в Instagram</h2>

            <a
                href="https://www.instagram.com/di_store_kg"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram__link"
            >
                <img src={instagramImg} alt="di_store_kg" className="instagram__img" />
            </a>
        </section>
    );
}