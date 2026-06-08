import Checkout from "../../components/Cart/Checkout/Checkout"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"


function Ordering() {

    return (
        <>
            <Header variant="page" title="Оформление заказа" />
            <Checkout />
            <Footer hideOnMobile />

        </>
    )
}

export default Ordering
