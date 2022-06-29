export const setCartProduct = (product, quantityInput) => async (dispatch) => {
  dispatch({
    type: "SET_CART_PRODUCTS",
    payload: product,
    quantity: quantityInput,
  });
};
