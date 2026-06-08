import { useLocation } from "react-router-dom"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ProductCard from "../../components/Productcard/Productcard"

function Productpage() {
    const { state } = useLocation();
    return (
        <>
            <Header variant="back" />
            <ProductCard product={state?.product} />
            <Footer hideOnMobile />
        </>
    )
}

export default Productpage
