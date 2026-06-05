import { useNavigate } from "react-router-dom";
import "./masks.css";
import masksImg from "../../assets/masks.png";

export default function Masks() {
    const navigate = useNavigate();
    return (
        <section className="masks">
            <div className="masks__header">
                <h2 className="masks__title">Маски для лица</h2>
                <button className="masks__more" aria-label="Смотреть все" onClick={() => navigate('/catalog')}>
                    <img src="data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M27.2002%208.0001L13.5469%2020.8001L27.2002%2033.6001'%20stroke='black'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e" className="masks__arrow" alt="далее" />
                </button>
            </div>

            <div className="masks__banner">
                <img src={masksImg} alt="Маски для лица" className="masks__img" />
            </div>
        </section>
    );
}