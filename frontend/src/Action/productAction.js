import axios from 'axios'
import {ALL_PRODUCTS_FAIL,ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS
} from "../constants/productConstants";

export const getProducts = (keyword = '',currentPage,price, category,rating=0) => async (dispatch)=>{
    try {
        dispatch({type: ALL_PRODUCTS_REQUEST})

        let link = `/api/v1/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if(category){
            link += `&category=${category}`
        }
        const {data} = await axios.get(link);
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type : ALL_PRODUCTS_FAIL,
            payload : error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        console.log(id)
        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearError = () => async (disptach) =>{
    disptach({
        type: CLEAR_ERRORS 
    })
}