import {
  GET_COURSES,
  COURSE_ERROR,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  CLEAR_CART
} from "../actions/types";

import toast from "react-hot-toast";

const cachedCart = localStorage && JSON?.parse(localStorage.getItem("cart"));
const cachedTotal = localStorage && localStorage.getItem("total");

const initialState = {
  cart: cachedCart ? cachedCart : [],
  courses: [],
  total: cachedTotal ? cachedTotal :0,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let itemToBeAdded = state.courses.find(
        (item) => item.id === action.payload
      );
      let existingItem = state.cart.find((item) => action.payload === item.id);
      if (existingItem) {
        toast.success(`Course already in cart`);
        return {
          ...state
        };
      } else {
        itemToBeAdded.quantity = 1;
        let newTotal = parseInt(state.total) + parseInt(itemToBeAdded.course_fee);
        toast.success(`Course added to cart`);

        localStorage.setItem(
          "cart",
          JSON.stringify([...state.cart, itemToBeAdded])
        );
        localStorage.setItem("total", newTotal);
        
        return {
          ...state,
          cart: [...state.cart, itemToBeAdded],
          total: newTotal,
        };
      }
    case REMOVE_FROM_CART:
      let itemToRemove = state.cart.find((item) => action.payload === item.id);
      let newCart = state.cart.filter((item) => action.payload !== item.id);
      let newTotal = state.total - itemToRemove.course_fee * itemToRemove.quantity;
      toast.error(`Course removed from cart`);

      localStorage.setItem("cart", JSON.stringify([...newCart]));
      localStorage.setItem("total", newTotal);

      return {
        ...state,
        cart: [...newCart],
        total: newTotal,
      };
    case ADD_QUANTITY:
      let addedItem = state.cart.find((item) => item.id === action.payload);
      addedItem.quantity += 1;
      newTotal = state.total + addedItem.course_fee;
      return {
        ...state,
        total: newTotal,
      };
    case SUB_QUANTITY:
      addedItem = state.cart.find(item => item.id === action.payload) 
      
        if(addedItem.quantity === 1){
            let new_items = state.cart.filter(item=>item.id !== action.payload)
            let newTotal = state.total - addedItem.course_fee
            return{
                ...state,
                cart: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
      }
    case CLEAR_CART:
      toast.error(`Cart Cleared`);
      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("total",0);
      return {
        ...state,
        cart:[]
      }
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case COURSE_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};
