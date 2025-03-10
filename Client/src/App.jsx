import './App.css'
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"
import AboutUs from './component/FooterPages/AboutUs.jsx';
import PrivacyPolicy from './component/FooterPages/PrivacyPolicy.jsx';
import TermsAndConditions from './component/FooterPages/TermsAndConditions.jsx';
import ReturnAndRefund from './component/FooterPages/ReturnAndRefund.jsx';
import Hygiene from './component/FooterPages/Hygiene.jsx';
import HelpAndSupport from './component/FooterPages/HelpAndSupport.jsx';
import FAQ from './component/FooterPages/FAQ.jsx';


function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); 
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <img src="https://freefrontend.com/assets/img/css-loaders/daily-ui-20-css-loader.gif" alt="" style={{width:"100%", height:"99.4vh"}}/>
      </div>
    );
  }

  return (
    <>
      <UserProvider>
        <ToastContainer position="top-right" />
        <Navbar />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<><Landingpage /><Homepage /></>} />
          <Route path="/malecollection/:category" element={<Menscollection />} />
          <Route path="/femalecollection/:category" element={<Womenscollection />} />
          <Route path="/malecollection/:category/:id" element={<Mensoutfitview />} />
          <Route path="/femalecollection/:category/:id" element={<Womensoutfitview />} />
          <Route path="/mens-outfits" element={<Allmensoutfit />} />
          <Route path="/womens-outfits" element={<Allwomensoutfit />} />
          <Route path="/profile" element={<Profileview />} />
          <Route path="/profile/address" element={<Address />} />
          <Route path="/profile/orders" element={<Orders />} />
          <Route path="/profile/favourites" element={<Favourites />} />
          <Route path="/profile/cart" element={<Cart />} />
          <Route path="/our-stores" element={<Ourstores />} />
          <Route path="*" element={<Four04 />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/return-and-refund" element={<ReturnAndRefund />} />
          <Route path="/hygiene" element={<Hygiene />} />
          <Route path="/help-and-support" element={<HelpAndSupport/>} />
          <Route path="/faq" element={<FAQ/>} />
        </Routes>
        <Footer />
      </UserProvider>
    </>
  )
}

export default App
