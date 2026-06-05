import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import OrderTracking from "../../components/Ordertracking/Ordertracking"
import Tabbar from "../../components/Tabbar/Tabbar"

function App() {

    return (
        <>
            <Header />
            <OrderTracking />
            <Footer hideOnMobile />
            <Tabbar />

        </>
    )
}

export default App
