export const orderSuccessEmail = (name, cartItems) => {
  const email = {
    body: {
      name,
      intro: "Your order has been placed successfully.",
      table: {
        data: cartItems.map((item) => {
          return {
            product: item.name,
            price: item.price,
            quantity: item.cartQuantity,
            total: item.price * item.cartQuantity,
          };
        }),
        customWidth: {
          product: "40%",
        },
      },
      action: {
        instructions:
          "You can check the status of your order and more in your dashboard",
        button: {
          color: "#aa4e02",
          text: "Go to dashboard",
          link: "https://maxstore.com",
        },
      },
      outro: "We thank you for your purchase.",
    },
  };
  return email;
};
