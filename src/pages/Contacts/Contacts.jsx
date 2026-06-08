import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import Location from "../../components/Location/Location"
import Tabbar from "../../components/Tabbar/Tabbar"


function Contacts() {

    return (
        <>
            <Header variant="back" />
            <Location />
            <Footer hideOnMobile />
            <Tabbar />

        </>
    )
}

export default Contacts
