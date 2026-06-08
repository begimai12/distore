import AboutDs from "../../components/Aboutds/Aboutds"
import CategoriesCarousel from "../../components/Categoriescarousel/Categoriescarousel"
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


function Home() {

    return (
        <>
            <Header />
            <Hero />
            <Popular />
            <Masks />
            <NewProducts />
            <CategoriesCarousel />
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

export default Home
