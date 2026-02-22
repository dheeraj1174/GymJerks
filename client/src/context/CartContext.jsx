import { createContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [coupon, setCoupon] = useState(null); // { code, discountPercent, discount }
    const [toast, setToast] = useState(null);

    // Load cart from local storage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem('gymjerks_cart');
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch { }
        }
        const storedCoupon = localStorage.getItem('gymjerks_coupon');
        if (storedCoupon) {
            try {
                setCoupon(JSON.parse(storedCoupon));
            } catch { }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('gymjerks_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        if (coupon) {
            localStorage.setItem('gymjerks_coupon', JSON.stringify(coupon));
        } else {
            localStorage.removeItem('gymjerks_coupon');
        }
    }, [coupon]);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type, id: Date.now() });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const addToCart = (product, size, color = '', qty = 1) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.product === product._id && item.size === size && item.color === color
            );

            if (existingItem) {
                return prevItems.map((item) =>
                    item.product === product._id && item.size === size && item.color === color
                        ? { ...item, qty: item.qty + qty }
                        : item
                );
            } else {
                return [
                    ...prevItems,
                    {
                        product: product._id,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        slug: product.slug,
                        size,
                        color,
                        qty,
                    },
                ];
            }
        });
        showToast(`${product.name} added to cart!`);
    };

    const removeFromCart = (productId, size, color = '') => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => !(item.product === productId && item.size === size && item.color === color))
        );
        showToast('Item removed from cart', 'info');
    };

    const updateQty = (productId, size, color, qty) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product === productId && item.size === size && item.color === color
                    ? { ...item, qty: Math.max(1, qty) }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        setCoupon(null);
    };

    const applyCoupon = (couponData) => {
        setCoupon(couponData);
        showToast(`Coupon "${couponData.code}" applied! ${couponData.discountPercent}% off`, 'success');
    };

    const removeCoupon = () => {
        setCoupon(null);
        showToast('Coupon removed', 'info');
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const discountAmount = coupon ? coupon.discount : 0;
    const cartTotal = Math.max(0, cartSubtotal - discountAmount);
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQty,
                clearCart,
                cartSubtotal,
                cartTotal,
                cartCount,
                isCartOpen,
                toggleCart,
                coupon,
                applyCoupon,
                removeCoupon,
                discountAmount,
                toast,
                showToast,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
