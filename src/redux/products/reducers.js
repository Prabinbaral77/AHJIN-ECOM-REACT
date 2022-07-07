const initialState = {
  products: [],
  cart: [],
  refreshOrder: true,
};
// eslint-disable-next-line import/no-anonymous-default-export
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
            size: action?.size,
            selectedColor: action?.selectedColor,
          },
        ],
      };
    case "REMOVE_SINGLE_CART_PRODUCTS":
      return {
        cart: state.cart.filter((singleProduct) => {
          return singleProduct?.product?.id !== action.payload;
        }),
      };
    case "EMPTY_CART_PRODUCTS":
      return {
        ...state,
        cart: [],
      };

    case "TRIGGER_ORDER":
      return {
        ...state,
        refreshOrder: !state?.refreshOrder,
      };

    default:
      return state;
  }
}
