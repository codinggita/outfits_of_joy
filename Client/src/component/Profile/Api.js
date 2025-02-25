export const getUserDetails = async (email) => {
  try {
    const response = await fetch(`https://outfits-of-joy.onrender.com/outfits-of-joy/users/${email}`);
    if (!response.ok) throw new Error("User not found");

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user:", error.message);
  }
};


export const updateUserDetails = async (userId, updatedData, isAddressUpdate = false) => {
  try {
    const response = await fetch(`https://outfits-of-joy.onrender.com/outfits-of-joy/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        isAddressUpdate ? { address: updatedData } : updatedData
      ),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};


export const ordersdetails = async (userId) => {
  try {
    const response = await fetch(`https://outfits-of-joy.onrender.com/outfits-of-joy/orders/${userId}`);
    if (!response.ok) throw new Error("Order not found");

    const orderData = await response.json();
    return orderData;
  } catch (error) {
    console.error("Error fetching Order:", error.message);
  }
};


export const getCartItems = async(userId) => {
  try {
      const response = await fetch(`https://outfits-of-joy.onrender.com/outfits-of-joy/carts/${userId}`);
      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching cart items:", error);
      return null;
  }
};


export const removeFromCart = async (userId, productId) => {
  try {
      const response = await fetch(`https://outfits-of-joy.onrender.com/outfits-of-joy/carts/${userId}/${productId}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          throw new Error('Failed to remove item from cart');
      }

      return await response.json();
  } catch (error) {
      console.error('Error removing from cart:', error);
      return { error: error.message };
  }
};
