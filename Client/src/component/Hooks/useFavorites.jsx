import { useState, useEffect } from "react";
import { fetchFavourites, addToFavourites, removeFromFavourites } from "../outfitcollection/api";
import { useUser } from "../UserContext";
import { toast } from "react-toastify";

export default function useFavorites() {
    const { userId } = useUser();
    const [favourites, setFavourites] = useState(new Set());

    useEffect(() => {
        if (userId) {
            loadFavourites();
        }
    }, [userId]);

    const loadFavourites = async () => {
        try {
            const result = await fetchFavourites(userId);
            if (result?.items) {
                setFavourites(new Set(result.items));
            }
        } catch (error) {
            console.error("Error fetching favourites:", error);
        }
    };

    const toggleFavourite = async (productId) => {
        if (!userId) {
            toast.warn("Please log in to add favorites!");
            return;
        }

        if (favourites.has(productId)) {
            await removeFromFavourites(userId, productId);
            setFavourites((prev) => {
                const updated = new Set(prev);
                updated.delete(productId);
                return updated;
            });
        } else {
            await addToFavourites(userId, productId);
            setFavourites((prev) => new Set([...prev, productId]));
        }
    };

    return { favourites, toggleFavourite };
}
