import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductInCart } from "./ui/ProductInCart";
import { ResumeInCart } from "./ui/ResumeInCart";


export default async function CartPage() {


    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">
                <Title title="Carrito" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Agregar mas</span>
                        <Link href="/" className="underline mb-5">Continua comprando</Link>
                        <ProductInCart />
                    </div>



                    <div className=" bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2">Resumen de orden</h2>
                        <ResumeInCart />
                        <div className="mt-5 mb-2 w-full">
                            <Link href="/checkout"
                                className="flex btn-primary justify-center">
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>


            </div>




        </div>
    );
}