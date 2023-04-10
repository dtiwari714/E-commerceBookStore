import './App.css';
import { BrowserRouter,Routes, Route} from "react-router-dom";
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import WebFont from 'webfontloader';
import {useEffect} from "react"
import Home from './component/Home/Home';
//import Loader from './component/layout/Loader/Loader';
import ProductDetails from './component/Product/ProductDetails';


function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    });
  return (
    // <div className="App">
    // </div>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* <Route path="/sad" element={<Loader />} /> */}
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App;


