import AccountPage from "../../components/Accountpage/Accountpage"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import TabBar from "../../components/Tabbar/Tabbar"

function App() {

    return (
        <>
            <Header />
            <AccountPage />
            <Footer hideOnMobile />
            <TabBar />

        </>
    )
}

export default App