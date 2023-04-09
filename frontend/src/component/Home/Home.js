import React,{Fragment,useEffect} from 'react'
import { FaMouse } from "react-icons/fa";
import "./Home.css";
import Product from './ProductCard';
import MetaData from '../layout/MetaData';
import {getProduct} from "../../actions/productAction"
import Loader from '../layout/Loader/Loader';
import {useSelector,useDispatch} from "react-redux"
import {useAlert} from "react-alert"


// const product={
//     name:"Panchtra",
//     images:[{url:"https://tse4.mm.bing.net/th?id=OIP.jlLmgnRd8mgBovnxDBzzKAHaJ9&pid=Api&P=0"}],
//     price:"$3000",
//     _id:"Durgesh"
// }
function Home() {
  const alert=useAlert();
  const dispatch=useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);


  useEffect(() => {
    if(error){
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);
  

  return( <Fragment>
    {loading ? (
      <Loader />
      // "loading"
    ) : (
      <Fragment>
        <MetaData title="ECOMMERCE" />

        <div className="banner">
          <p>Welcome to Ecommerce</p>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>

          <a href="#container">
            <button>
              Scroll <FaMouse />
            </button>
          </a>
        </div>

        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id="container">
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </Fragment>
    )}
  </Fragment>
  );
};

export default Home