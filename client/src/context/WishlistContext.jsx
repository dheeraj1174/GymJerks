import { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import api from '../utils/api';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const { user } = useContext(AuthContext);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('gymjerks_wishlist');
        if (stored) {
            try {
                setWishlistItems(JSON.parse(stored));
            } catch { }
        }
    }, []);

    // Sync from backend when user logs in
    useEffect(() => {
        if (user) {
            const fetchWishlist = async () => {
                try {
                    const { data } = await api.get('/users/wishlist');
                    const ids = data.map(p => p._id || p);
                    setWishlistItems(ids);
                    localStorage.setItem('gymjerks_wishlist', JSON.stringify(ids));
                } catch (err) {
                    // Silently fail - use local storage data
                }
            };
            fetchWishlist();
        }
    }, [user]);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('gymjerks_wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const toggleWishlist = async (productId) => {
        setWishlistItems(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });

        // Sync with backend if logged in
        if (user) {
            try {
                await api.post('/users/wishlist', { productId });
            } catch (err) {
                // Silently fail
            }
        }
    };

    const isInWishlist = (productId) => wishlistItems.includes(productId);

    const removeFromWishlist = (productId) => {
        setWishlistItems(prev => prev.filter(id => id !== productId));
        if (user) {
            api.post('/users/wishlist', { productId }).catch(() => { });
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);

export default WishlistContext;
