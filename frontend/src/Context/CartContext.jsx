import React, { Children, createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext();

export const CartProvider = ({children})=>{

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
    }, []);

    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cartItems));
    }, [cartItems]);

    //add to cart
    const addToCart = (product,qty)=>{
        setCartItems((prev)=>{
            const existing = prev.find((item)=>item.id === product.id);

            if (existing) {
                return prev.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + qty }
                    : item
                );
            }

            return [
                ...prev,
                {
                    id: product.id,
                    name: product.product_name,
                    price: product.discount_price || product.price,
                    image: product.product_image,
                    quantity: qty,
                },
            ];
        })
    }

    //increment Quantity
    const incrementQuantity = (id)=>{
        setCartItems((prev)=>
            prev.map((item)=>
                item.id === id ? {...item, quantity:item.quantity + 1} : item
            )
        )
    }

    //decremnt Qyantity
    const decrementQuantity  = (id)=>{
        setCartItems((prev)=>
            prev.map((item)=>
                item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1} : item
            )
        )
    }

     // Remove item
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };


    // Clear cart
    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return(
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                incrementQuantity,
                decrementQuantity,
                removeFromCart,
                clearCart,
                cartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
  

export const useCart = () => useContext(CartContext);
