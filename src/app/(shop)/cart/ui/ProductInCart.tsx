'use client'

import { QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export const ProductInCart = () => {
    const [loading, setLoading] = useState(false)
    const productInCart = useCartStore(state => state.cart)
    const updateProductInCart = useCartStore(state => state.updateProductQuantity)
    const removeProductInCart = useCartStore(state => state.removeProduct)

    useEffect(() => {
        setLoading(true)
    }, [])

    if (!loading) {
        return <p>Loading...</p>
    }

    if (productInCart.length <= 0) {
        redirect('/empty')
    }

    return (
        <>

            {
                productInCart.map(product =>
                    <div key={`${product.slug}-${product.sizes}`} className="flex mb-5">
                        <Image src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                            alt={product.title}
                            className="mr-5 rounded"
                        />
                        <div>
                            <Link className="hover:underline cursor-pointer" href={`/product/${product.slug}`}>
                                <p>{product.sizes} - {product.title}</p>
                            </Link>

                            <p>${product.price}</p>
                            <QuantitySelector quantity={product.quantity} onQuantityChange={quantity => updateProductInCart(product, quantity)} />
                            <button onClick={() => removeProductInCart(product)} className="underline mt-3">Remover</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}
