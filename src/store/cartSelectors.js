export const selectTotalQuantity = (state) => {
    const cartItems = state.cart.items;
    return cartItems.reduce((acc, product) => acc + product.quantity, 0);
  };
  