import { CartProduct } from "@/interface";
import { subtle } from "crypto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSumaInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        //1. Revisar si el producto existe.
        const productInCart = cart.some(
          (item) => item.id === product.id && item.sizes === product.sizes
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        //2.Se que el producto existe, tengo que incrementar
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.sizes === product.sizes) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updateCartproduct = cart.map((item) => {
          if (item.id === product.id && item.sizes === product.sizes) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updateCartproduct });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const removeProductInCart = cart.filter(
          (item) => item.id !== product.id || item.sizes !== product.sizes
        );

        set({ cart: removeProductInCart });
      },
      getSumaInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );

        const tax = subTotal * 0.15;
        const total = subTotal + tax;

        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
