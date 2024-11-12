'use client'
import { QuantitySelector, SizeSelector } from "@/components"
import type { CartProduct, Product, Size } from "@/interface"
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
    product: Product;
}
export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart)

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState<boolean>(true);

    const addToCart = () => {

        if (!size) return;

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            sizes: size,
            image: product.images[0]
        }

        addProductToCart(cartProduct)
        //despues de agregar el producto al carrito pone los states en su valor inicial
        setPosted(false)
        setQuantity(1)
        setSize(undefined)
    }

    return (
        <>
            {posted && !size && (<span className="mt-2 text-red-500">Debe de seleccionar una talla*</span>)}

            <SizeSelector selectedSize={size} availableSizes={product.sizes} onSizeChanged={setSize} />

            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            <button
                onClick={addToCart}
                className="btn-primary my-5">
                Agregar al carrito
            </button>
        </>
    )
}
