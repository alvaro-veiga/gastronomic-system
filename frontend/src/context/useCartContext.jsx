import { createContext, useContext, useState } from "react";

const CartContext = createContext()

export function CartProvider({children}) {
    
    const [cartItems, setCartItems] = useState([])

    const addToCart = (itemToAdd) => {
        const checkItemAlready = cartItems.find((cartItems) => {
            return cartItems._id === itemToAdd._id
        })
        if (!checkItemAlready) {
            itemToAdd.quantity = 1
            setCartItems([...cartItems, itemToAdd])
            console.log('Item adicionado com sucesso')
        } else {
            console.log('O item ja esta no seu carrinho')
        }
    }

    const removeFromCart = (itemId) => {
        const cartItemsSanitized = cartItems.filter((item) => item._id !== itemId);
        setCartItems(cartItemsSanitized)
    };

    const updateCartItems = (items) => {
        setCartItems(items)
    }

    return(
        <CartContext.Provider value={{ removeFromCart, addToCart, cartItems, updateCartItems}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const context = useContext(CartContext)

    if (!context) {
        console.log('You are out of CartContext')
    }

    return context
}