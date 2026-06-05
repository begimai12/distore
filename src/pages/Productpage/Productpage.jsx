import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ProductCard from "../../components/Productcard/Productcard"


function App() {

    return (
        <>
            <Header variant="back" />
            <ProductCard />
            <Footer hideOnMobile />

        </>
    )
}

export default App
