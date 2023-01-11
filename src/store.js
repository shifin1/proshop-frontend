import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedreducer,
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers"
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderPayReducer,
  orderListReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers"

const allReducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedreducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
})

const middleware = [thunk]

const store = configureStore(
  { reducer: allReducers },
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
