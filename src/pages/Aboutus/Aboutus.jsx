import Consultation from "../../components/Consultation/Consultation"
import Di from "../../components/Di/Di"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import InstagramBlock from "../../components/Instagramblock/Instagramblock"
import TabBar from "../../components/Tabbar/Tabbar"
import We from "../../components/We/We"

function App() {

    return (
        <>
            <Header variant="back" />
            <Di />
            <We />
            <Consultation mobileShow="reviews" />
            <InstagramBlock />
            <Footer hideOnMobile />
            <TabBar />

        </>
    )
}

export default App
