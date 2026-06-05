import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from "./context/CartContext"
import Home from "./pages/Home/Home"
import Catalog from "./pages/Catalog/Catalog"
import './App.css'
import Productpage from "./pages/Productpage/Productpage"
import Favourites from "./pages/Favourites/Favourites"
import Shoppingcart from "./pages/Shoppingcart/Shoppingcart"
import Ordering from "./pages/Ordering/Ordering"
import Aboutus from "./pages/Aboutus/Aboutus"
import Contacts from "./pages/Contacts/Contacts"
import Account from "./pages/Account/Account"
import Order from "./pages/Order/Order"
import Address from "./pages/Address/Address"
import Myaccount from "./pages/Myaccount/Myaccount"



function App() {
  return (
    <BrowserRouter>
      <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/productpage" element={<Productpage />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/shoppingcart" element={<Shoppingcart />} />
        <Route path="/ordering" element={<Ordering />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/account" element={<Account />} />
        <Route path="/order" element={<Order />} />
        <Route path="/address" element={<Address />} />
        <Route path="/myaccount" element={<Myaccount />} />


      </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
