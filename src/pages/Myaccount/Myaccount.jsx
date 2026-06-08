import { useNavigate } from "react-router-dom"
import AccountPage from "../../components/Accountpage/Accountpage"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import TabBar from "../../components/Tabbar/Tabbar"

function Myaccount() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <AccountPage onBack={() => navigate(-1)} />
            <Footer hideOnMobile />
            <TabBar />
        </>
    )
}

export default Myaccount
