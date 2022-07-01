export const setCartProduct =
  (product, quantityInput, uniquefeatureIndex) => async (dispatch) => {
    dispatch({
      type: "SET_CART_PRODUCTS",
      payload: product,
      quantity: quantityInput,
      uniquefeatureIndex: uniquefeatureIndex,
    });
  };
