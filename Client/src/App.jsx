import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './component/Footer'
import Homepage from './component/Homepage'
import Landingpage from './component/Landingpage'
import Navbar from './component/Navbar'
import Menscollection from './component/outfitcollection/Menscollection'
import Womenscollection from './component/outfitcollection/Womenscollection';
import Mensoutfitview from './component/outfitcollection/Mensoutfitview';
import Womensoutfitview from './component/outfitcollection/Womensoutfitview';
import Allmensoutfit from './component/Wholeoutfitcollection/Allmensoutfit';
import Allwomensoutfit from './component/Wholeoutfitcollection/Allwomensoutfit';
import Profileview from './component/Profile/Profileview';
import Address from './component/Profile/Address';
import Orders from './component/Profile/Orders';
import { UserProvider } from "./component/UserContext.jsx";
import Favourites from './component/Profile/Favourites.jsx';
import Cart from './component/Profile/Cart.jsx';
import Ourstores from './component/extra component/ourStores.jsx'
import Four04 from "./component/extra component/Four04.jsx"

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<><Landingpage /><Homepage /></>} />
            <Route path="/Malecollection/:category" element={<Menscollection />} />
            <Route path="/Femalecollection/:category" element={<Womenscollection />} />
            <Route path="/Malecollection/:category/:id" element={<Mensoutfitview />} />
            <Route path="/Femalecollection/:category/:id" element={<Womensoutfitview />} />
            <Route path="/Mens-outfits" element={<Allmensoutfit />} />
            <Route path="/Womens-outfits" element={<Allwomensoutfit />} />
            <Route path="/Profile" element={<Profileview />} />
            <Route path="/Profile/address" element={<Address />} />
            <Route path="/Profile/orders" element={<Orders />} />
            <Route path="/Profile/favourites" element={<Favourites />} />
            <Route path="/Profile/cart" element={<Cart />} />
            <Route path="/our-stores" element={<Ourstores />} />
            <Route path="*" element={<Four04 />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
