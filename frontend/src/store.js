import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer,productDetailsReducer } from './reducers/productReducers';
import { authReducer } from './reducers/userReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails:productDetailsReducer,
    auth:authReducer
})

let initialState = {};
const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))
console.log(store.getState())
export default store;