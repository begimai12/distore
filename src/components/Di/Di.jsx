import "./di.css";
import di1 from "../../assets/di1.png";
import ds from "../../assets/ds.png";
import di2 from "../../assets/di2.png";
import di3 from "../../assets/di3.png";

const STORY_TEXT = [
    "Наша основательница – Даяна, хотела помогать людям через свое дело.",
    "Идея открыть магазин косметики пришла с личной необходимостью – в городе было мало качественной косметики для очень чувствительной и капризной кожи как у Даяны. Все началось с маленькой полочки в ее комнате в 2017. Она проходила курсы по косметике, изучала составы, искала работающие средства и рассказывала о своих находках в соц сетях. Шло время, росло количество консультаций, заказов, и единомышленников вокруг. В 2020 году открылся первый магазин Di Store и все полки опустели в первый же день.",
    "Сегодня Di Store- магазин с тысячами довольных клиентов, сильной командой и большими планами на будущее. Мы постоянно улучшаем свои знания и навыки, чтобы быть полезными вам!",
];

export default function Di() {
    return (
        <section className="di-root">

            {/* Заголовок */}
            <h2 className="di-title">Di Store – магазин косметики</h2>

            {/* Большое фото */}
            <div className="di-main">
                <img src={di1} alt="Di Store команда" />
            </div>

            {/* ДЕСКТОП: два фото + цитата */}
            <div className="di-bottom di-bottom--desktop">
                <div className="di-bottom__photos">
                    <div className="di-photo di-photo--1">
                        <img src={ds} alt="Di Store" />
                    </div>
                    <div className="di-photo di-photo--2">
                        <img src={di2} alt="Di Store" />
                    </div>
                </div>
                <div className="di-quote">
                    <div className="di-quote__inner">
                        <p className="di-quote__text">
                            «Di Store – это не про деньги, а про душу. Про возможность помогать людям любить себя, заботиться, и принимать себя.»
                        </p>
                        <span className="di-quote__sign">- Даяна</span>
                    </div>
                </div>
            </div>

            {/* МОБАЙЛ: два фото рядом */}
            <div className="di-bottom__photos di-bottom__photos--mobile">
                <div className="di-photo di-photo--1">
                    <img src={ds} alt="Di Store" />
                </div>
                <div className="di-photo di-photo--2">
                    <img src={di3} alt="Di Store" />
                </div>
            </div>

            {/* История */}
            <div className="di-story">
                <div className="di-story__text">
                    <h3 className="di-story__title">Как появился Di Store?</h3>

                    {/* МОБАЙЛ: фото + цитата рядом */}
                    <div className="di-quote di-quote--mobile">
                        <div className="di-story__img--mobile">
                            <img src={di2} alt="Di Store история" />
                        </div>
                        <div className="di-quote__inner">
                            <p className="di-quote__text">
                                «Di Store – это не про деньги, а про душу. Про возможность помогать людям любить себя, заботиться, и принимать себя.»
                            </p>
                            <span className="di-quote__sign">- Даяна</span>
                        </div>
                    </div>

                    {STORY_TEXT.map((p, i) => (
                        <p key={i} className="di-story__p">{p}</p>
                    ))}
                </div>

                {/* ДЕСКТОП: фото справа */}
                <div className="di-story__img">
                    <img src={di3} alt="Di Store история" />
                </div>
            </div>

        </section>
    );
}