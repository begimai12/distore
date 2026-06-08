import { useNavigate } from "react-router-dom"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import OrderTracking from "../../components/Ordertracking/Ordertracking"
import Tabbar from "../../components/Tabbar/Tabbar"

function Order() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <OrderTracking onBack={() => navigate(-1)} />
            <Footer hideOnMobile />
            <Tabbar />
        </>
    )
}

export default Order
