import { create } from 'zustand'
import { Product } from '../types/types'

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number | undefined) => void;
    deleteFromCart: (productId: number) => void;
    emptyCart: () => void;
    updateQuantity: (productId: number, newQuantity: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
    cart: [],


    addToCart: (product: Product, quantity: number = 1) => {
        const currentCart = get().cart;
        const existingItem = currentCart.some((item) => item.id === product.id);

        if (existingItem) {
            set({
                cart: currentCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
            })
        } else {
            set({
                cart: [...currentCart, { ...product, quantity: quantity }]
            })
        }


    },


    deleteFromCart: (productId: number) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
    },


    emptyCart: () => set({ cart: [] }),

    updateQuantity: (productId: number, newQuantity: number) => {
        set({
            cart: get().cart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        });
    }
}))