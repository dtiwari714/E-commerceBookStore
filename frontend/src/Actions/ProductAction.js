import axios from 'axios'
export const getProduct = ()=> async(dispatch)=>{
    try{
        dispatch({
            type:"ALL_PRODUCT_REQUEST"
        })
        const {data}= await axios.get("/api/v1/products/")
        dispatch({
            type:"All_PRODUCT_SUCCESS",
            payload:data,
        })
    }
    catch(error){
        dispatch({
            type:"All_PRODUCT_FAIL",
            payload:error.response.data.message
        })
    }
}

// clear all data
export const clearError=()=>async(dispatch)=>{
    dispatch({
        type:"CLEAR_ERROR",
    
    })
}