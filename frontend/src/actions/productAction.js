import {
  ALL_PRODUCT_FAILS,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILS,
  CLEAR_ERRORS,
} from "../constants/productConstant";
import axios from "axios";

//get all product
export const getProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const { data } = await axios.get("/api/v1/products");
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAILS,
      payload: error.response.data.messagae,
    });
  }
};
//get product Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } =await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILS,
      payload: error.response.data.messagae,
    });
  }
};

// // Get Products Details
// export const getProductDetails = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_DETAILS_REQUEST });

//     const { data } = await axios.get(`/api/v1/product/${id}`);

//     dispatch({
//       type: PRODUCT_DETAILS_SUCCESS,
//       payload: data.product,
//     });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_DETAILS_FAILS,
//       payload: error.response.data.message,
//     });
//   }
// };

//clears Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
