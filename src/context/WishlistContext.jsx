import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [items, setItems] = useState(() => {
        try { return JSON.parse(localStorage.getItem("distore_wishlist")) || []; }
        catch { return []; }
    });

    const save = (next) => {
        localStorage.setItem("distore_wishlist", JSON.stringify(next));
        return next;
    };

    const toggleWishlist = (product) => {
        setItems(prev => {
            const exists = prev.find(i => i.id === product.id);
            if (exists) return save(prev.filter(i => i.id !== product.id));
            return save([...prev, {
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                volume: product.volume || "",
            }]);
        });
    };

    const isInWishlist = (id) => items.some(i => i.id === id);

    const removeFromWishlist = (id) =>
        setItems(prev => save(prev.filter(i => i.id !== id)));

    const count = items.length;

    return (
        <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist, removeFromWishlist, count }}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => useContext(WishlistContext);
