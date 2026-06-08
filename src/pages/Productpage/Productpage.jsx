import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ProductCard from "../../components/Productcard/Productcard"


function Productpage() {

    return (
        <>
            <Header variant="back" />
            <ProductCard />
            <Footer hideOnMobile />

        </>
    )
}

export default Productpage
