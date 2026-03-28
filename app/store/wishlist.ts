import { create } from 'zustand'
import { Product } from '../(main)/types/types'

interface WishlistState {
    wishlist: Product[];
    toggleAddToWishlist: (product: Product) => void;
    emptyWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
    wishlist: [],


    toggleAddToWishlist: (product: Product) => {
        set((state) => {
            const exists = state.wishlist.some(
                item => item.id === product.id
            );

            if (exists) {
                return {
                    wishlist: state.wishlist.filter(
                        item => item.id !== product.id
                    )
                };
            }

            return {
                wishlist: [...state.wishlist, product]
            };
        });
    },


    emptyWishlist: () => set({ wishlist: [] }),

}))