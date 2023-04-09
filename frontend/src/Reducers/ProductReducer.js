import {createReducer} from '@reduxjs/toolkit'

const initialState ={
    products:[]
}

export const ProductReducer = createReducer(initialState,{
    ALL_PRODUCT_REQUEST:(state,action)=>{
        state.loading=true;
        state.products=[];
        
    },
    All_PRODUCT_SUCCESS:(state,action)=>{
        state.loading=false;
        state.products=action.payload.products;
        state.productsCount=action.payload.productsCount;
    },
    All_PRODUCT_FAIL:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    }

});