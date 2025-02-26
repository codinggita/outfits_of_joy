import { toast } from "react-toastify";
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

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


export const handlePayment = async (amount, userEmail, userName, phone) => {
  try {
      const response = await fetch("https://outfits-of-joy.onrender.com/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
      });

      const orderData = await response.json();

      if (!orderData.success) {
          toast.warn("Error creating order")
          return { success: false };
      }

      return new Promise((resolve) => { 
          const options = {
              key: import.meta.env.VITE_RAZORPAY_KEY_ID,
              amount: orderData.order.amount,
              currency: "INR",
              name: "My Website",
              description: "Test Transaction",
              order_id: orderData.order.id,
              handler: async function (response) {
                  await fetch("https://outfits-of-joy.onrender.com/verify-payment", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                          razorpay_payment_id: response.razorpay_payment_id,
                          razorpay_order_id: response.razorpay_order_id,
                          razorpay_signature: response.razorpay_signature,
                          user_email: userEmail,
                      }),
                  });

                  resolve({ success: true, response, razorpayOrderId: orderData.order.id });
              },
              prefill: {
                  name: userName,
                  email: userEmail,
                  contact: phone,
              },
              theme: { color: "#3399cc" },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();

          rzp.on("payment.failed", function (response) {
              resolve({ success: false, error: response.error });
          });
      });
  } catch (error) {
      console.error("Payment error:", error);
      return { success: false, error };
  }
};



export const cancelOrder = async (userId, productId) => {
  try {
      const response = await fetch(`https://outfits-of-joy.onrender.com/outfits-of-joy/orders/${productId}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
          throw new Error("Failed to cancel order");
      }

      return await response.json();
  } catch (error) {
      console.error("Error cancelling order:", error);
      throw error;
  }
};