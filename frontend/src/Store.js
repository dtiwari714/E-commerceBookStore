import {configureStore} from '@reduxjs/toolkit';
import { ProductReducer } from './Reducers/ProductReducer';
const store = configureStore({
    reducer:{
        products:ProductReducer
    }
});

export default store;
