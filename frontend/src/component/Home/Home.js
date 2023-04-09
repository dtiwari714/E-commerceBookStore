import React, { useEffect } from 'react'
import {FaMouse} from 'react-icons/fa'
import './Home.css'
import Product from './Product'
import Metadata from '../layout/Metadata'
import {useDispatch, useSelector} from 'react-redux'
import {getProduct} from '../../Actions/ProductAction'
// const products = {
//   name:"Science book",
//   price:"₹300",
//   _id:"Science",
//   img :[{url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK3piEulYntdLdpDJC1XFs5XTR92P2f0Hj4A&usqp=CAU"}]
// }
export default function Home() {
  const dispatch = useDispatch();
  const {products,loading,error,productsCount} = useSelector(state=>state.products);
  console.log(products)
  useEffect(()=>{
    dispatch(getProduct());
  },[dispatch])
  return (
    <>
    <Metadata title="Books Bugs"/>
      <div className='banner'>
          <p>let's Read Something New </p>
          <h1>Find Amazing Books</h1>
          <a href='#container'>
            <button>
              Scroll <FaMouse/>
            </button>
          </a>
      </div>
      <h2 className='heading'>Feature Products</h2>
      <div className='container' id='container'>
      {products && products.map((product)=> <Product product={product}/> )}
      </div>
    </>
  )
}
