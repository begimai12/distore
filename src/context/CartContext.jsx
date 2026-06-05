import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try { return JSON.parse(localStorage.getItem("distore_cart")) || []; }
        catch { return []; }
    });

    const save = (next) => {
        localStorage.setItem("distore_cart", JSON.stringify(next));
        return next;
    };

    const addToCart = ({ id, name, price, img, volume }) => {
        const cartId = volume ? `${id}_${volume}` : `${id}`;
        setItems(prev => {
            const existing = prev.find(i => i.cartId === cartId);
            if (existing) {
                return save(prev.map(i => i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i));
            }
            return save([...prev, { cartId, id, name, price, img, volume: volume || "", qty: 1 }]);
        });
    };

    const updateQty = (cartId, delta) =>
        setItems(prev => save(
            prev.map(i => i.cartId === cartId ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
               .filter(i => i.qty > 0)
        ));

    const removeItem = (cartId) =>
        setItems(prev => save(prev.filter(i => i.cartId !== cartId)));

    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, updateQty, removeItem, total, count }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
