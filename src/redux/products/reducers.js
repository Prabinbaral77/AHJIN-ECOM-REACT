const initialState = {
  products: [],
  cart: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_CART_PRODUCTS":
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            product: action.payload,
            quantity: action.quantity,
            uniquefeatureIndex: action.uniquefeatureIndex,
          },
        ],
      };
    case "EMPTY_CART_PRODUCTS":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
}
