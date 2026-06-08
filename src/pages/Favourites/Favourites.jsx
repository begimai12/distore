import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import Wishlist from "../../components/Wishlist/Wishlist"


function Favourites() {

    return (
        <>
            <Header variant="page" title="Избранное" />
            <Wishlist />
            <Footer hideOnMobile />

        </>
    )
}

export default Favourites
