import AddressPage from "../../components/Addresspage/Addresspage"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import TabBar from "../../components/Tabbar/Tabbar"

function App() {

    return (
        <>
            <Header />
            <AddressPage />
            <Footer hideOnMobile />
            <TabBar />

        </>
    )
}

export default App