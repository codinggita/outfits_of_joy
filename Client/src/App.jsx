import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './component/Footer'
import Homepage from './component/Homepage'
import Landingpage from './component/Landingpage'
import Navbar from './component/Navbar'
import Sherwani from './component/outfitcollection/Sherwani'
import Indowestern from './component/outfitcollection/Indowestern';
import Tuxedo from './component/outfitcollection/Tuxedo';
import Lehenga from './component/outfitcollection/Lehenga';
import Anarkali from './component/outfitcollection/Anarkali';
import Gown from './component/outfitcollection/Gown';

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<><Landingpage /><Homepage /></>} /> 
        <Route path="/sherwani" element={<Sherwani />} /> 
        <Route path="/indo-western" element={<Indowestern />} /> 
        <Route path="/tuxedo" element={<Tuxedo />} /> 
        <Route path="/lehenga" element={<Lehenga />} />
        <Route path="/anarkali" element={<Anarkali />} /> 
        <Route path="/gown" element={<Gown />} /> 
      </Routes>
      {/* <Footer />  */}
    </BrowserRouter>
    </>
  )
}

export default App
