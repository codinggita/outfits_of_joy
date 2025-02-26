import { useEffect, useState } from "react";
import { getCartItems, removeFromCart } from "../Profile/Api.js";
import { useUser } from "../UserContext.jsx";
import { toast } from "react-toastify";

const useCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { userId } = useUser();

    // Fetch cart details
    const fetchCartDetails = async () => {
        if (!userId) return;
        try {
            const cartData = await getCartItems(userId);
            if (cartData?.items) {
                setCartItems(cartData.items);
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error("Error fetching cart details:", error);
        }
    };

    useEffect(() => {
        fetchCartDetails();
    }, [userId]);

    // Remove item from cart
    const handleRemoveFromCart = async (productId) => {
        if (!userId) {
            toast.warn("Please log in to modify your cart.");
            return;
        }
        const result = await removeFromCart(userId, productId);
        if (!result.error) {
            setCartItems(cartItems.filter(item => item.productId !== productId)); // Update local state
        }
    };

    useEffect(() => {
        fetchCartDetails();
    }, [cartItems]);  // This ensures cart updates immediately

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);


    return { cartItems, totalItems, fetchCartDetails, handleRemoveFromCart };
};

export default useCart;