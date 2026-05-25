import "./payment.css";
import mastercard from "../../assets/mastercard.png";
import visa from "../../assets/visa.png";
import elkart from "../../assets/elkart.png";
import elsom from "../../assets/elsom.png";
import mbank from "../../assets/mbank.png";
import visamastercard from "../../assets/visamastercard.png";

const METHODS = [
    { name: "Mastercard", img: mastercard },
    { name: "Visa", img: visa },
    { name: "Элкарт", img: elkart },
    { name: "Элсом", img: elsom },
    { name: "Mbank", img: mbank },
    { name: "Visa Mastercard", img: visamastercard },
];

export default function Payment() {
    return (
        <section className="payment">
            <h2 className="payment__title">Онлайн Оплата</h2>
            <div className="payment__list">
                {METHODS.map((method) => (
                    <div key={method.name} className="payment__card">
                        <img src={method.img} alt={method.name} className="payment__img" />
                    </div>
                ))}
            </div>
        </section>
    );
}