export const setCartProduct =
  (
    product,
    quantityInput,
    uniquefeatureIndex,
    size,
    selectedColor,
    uniquefea
  ) =>
  async (dispatch) => {
    dispatch({
      type: "SET_CART_PRODUCTS",
      payload: product,
      quantity: quantityInput,
      uniquefeatureIndex: uniquefeatureIndex,
      size: size,
      selectedColor: selectedColor,
      uniquefea: uniquefea,
    });
  };

export const removeProductFromCart = (id) => async (dispatch) => {
  dispatch({
    type: "REMOVE_SINGLE_CART_PRODUCTS",
    payload: id,
  });
};

export const emptyCartProduct = () => async (dispatch) => {
  dispatch({
    type: "EMPTY_CART_PRODUCTS",
  });
};

export const triggerOrderAfterReward = () => async (dispatch) => {
  dispatch({
    type: "TRIGGER_ORDER",
  });
};
