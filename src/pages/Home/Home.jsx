import AboutDs from "../../components/Aboutds/Aboutds"
import Consultation from "../../components/Consultation/Consultation"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import Hero from "../../components/Hero/Hero"
import InstagramBlock from "../../components/Instagramblock/Instagramblock"
import Masks from "../../components/Masks/Masks"
import NewProducts from "../../components/Newproducts/Newproducts"
import Payment from "../../components/Payment/Payment"
import Popular from "../../components/Popular/Popular"
import TabBar from "../../components/Tabbar/Tabbar"
import TopSales from "../../components/Topsales/Topsales"


function App() {

    return (
        <>
            <Header />
            <Hero />
            <Popular />
            <Masks />
            <NewProducts />
            <AboutDs />
            <TopSales />
            <Consultation />
            <Payment />
            <InstagramBlock />
            <Footer />
            <TabBar />

        </>
    )
}

export default App
