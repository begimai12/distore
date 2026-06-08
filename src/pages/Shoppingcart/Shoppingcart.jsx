import Cart from "../../components/Cart/Cart"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"


function Shoppingcart() {

    return (
        <>
            <Header variant="page" title="Корзина" />
            <Cart />
            <Footer hideOnMobile />

        </>
    )
}

export default Shoppingcart