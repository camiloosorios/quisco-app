import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order : OrderItem[]
    addtoOrder : (product : Product) => void
    increaseQuantity : (id : Product['id']) => void
    decreaseQuantity : (id : Product['id']) => void
    removeItem : (id : Product['id']) => void
    clearOrder : () => void
}

export const useStore = create<Store>((set, get) => ({
    order : [],
    addtoOrder : (product) => {
        const { categoryId, image, ...data } = product;
        let order : OrderItem[] = [];
        const orderExists = get().order.find((item) => item.id === data.id);
        if (orderExists) {
            order = get().order.map((item) =>{
                if (item.id === data.id) {
                    item.quantity += 1;
                    item.subtotal = item.quantity * item.price;
                }
                return item;
            });
        } else {
            order = [...get().order, {
               ...data,
                quantity : 1,
                subtotal: data.price
            }];
        }
        set(() => ({ order }));
        
    },
    increaseQuantity : (id) => {
        const order : OrderItem[] = get().order.map((item) => {
            if (item.id === id && item.quantity < 5) {
                item.quantity += 1;
                item.subtotal = item.quantity * item.price;
            }
            return item;
        });
        set(() => ({ order }));
    },
    decreaseQuantity : (id) => {
        const order : OrderItem[] = get().order.map((item) => {
            if (item.id === id && item.quantity > 1) {
                item.quantity -= 1;
                item.subtotal = item.quantity * item.price;
            }
            return item;
        });
        set(() => ({ order }));
    },
    removeItem : (id) => {
        set((state) => ({
            order : [...state.order.filter(item => item.id !== id)]
        }));
    },
    clearOrder : () => set(() => ({ order : [] }))
}));