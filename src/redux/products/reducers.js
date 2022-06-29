const initialState = {
  products: [],
  cart: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_CART_PRODUCTS":
      return {
        ...initialState.cart,
        cart: [
          ...state.cart,
          { product: action.payload, quantity: action.quantity },
        ],
      };

    default:
      return state;
  }
}
