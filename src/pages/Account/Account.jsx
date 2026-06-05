import AuthPage from "../../components/Authpage/Authpage";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Tabbar from "../../components/Tabbar/Tabbar";



function App() {
    return (
        <>
            <Header />
            <AuthPage />
            <Footer hideOnMobile />
            <Tabbar />
        </>
    )
}

export default App
