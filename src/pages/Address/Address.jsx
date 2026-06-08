import { useNavigate } from "react-router-dom"
import AddressPage from "../../components/Addresspage/Addresspage"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import TabBar from "../../components/Tabbar/Tabbar"

function Address() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <AddressPage onBack={() => navigate(-1)} />
            <Footer hideOnMobile />
            <TabBar />
        </>
    )
}

export default Address
