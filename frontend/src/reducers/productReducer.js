import {
  ALL_PRODUCT_FAILS,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILS,
  CLEAR_ERRORS,
} from "../constants/productConstant";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case ALL_PRODUCT_FAILS:
      return {
        loading: false,
        products: action.payload,
      };
    default:
      return state;
  }
};

// export const productDetailsReducer = (state = { product: {} }, action) => {
//   switch (action.type) {
//     case PRODUCT_DETAILS_REQUEST:
//       return {
//         loading: true,
//         ...state,
//       };
//     case PRODUCT_DETAILS_SUCCESS:
//       return {
//         loading: false,
//         product: action.payload,
//       };
//     case PRODUCT_DETAILS_FAILS:
//       return {
//         loading: false,
//         error: action.payload,
//       };

//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };/
export const productDetailsReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case PRODUCT_DETAILS_FAILS:
      return {
        loading: false,
        product: action.payload,
      };
    default:
      return state;
  }
};