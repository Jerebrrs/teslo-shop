import { Title } from "@/components";

import prisma from "@/lib/prisma";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";
interface Props {
    params: {
        id: string
    }
}
export default async function OrderIdPage({ params }: Props) {
    const { id } = params;
    const product = await prisma.product.findMany({
        take: 3,
        include: {
            images: {
                select: {
                    url: true
                }
            }
        }
    });


    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title={`Orden #${id}`} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    <div className="flex flex-col mt-5">

                        <div className={
                            clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                {
                                    'bg-red-500': false,
                                    'bg-green-700': true,
                                }
                            )
                        }>
                            <IoCardOutline size={30} />
                            <span className="mx-2">Pendiente de Pago</span>
                        </div>
                        {
                            product.map(product =>
                                <div key={product.id} className="flex mb-5">
                                    <Image src={`/products/${product.images[0]}`}
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
                                        <p>{product.title}</p>
                                        <p>${product.price} x 3</p>
                                        <p>Subtotal ${product.price * 4}</p>

                                    </div>
                                </div>
                            )
                        }
                    </div>



                    <div className="bg-white rounded-xl shadow-xl p-7">
                        <h2 className="text-2xl mb-2 font-bold">Direccion de entrega.</h2>
                        <div className="mb-10">
                            <p className="text-xl">Simon y pepe</p>
                            <p>Cervantes 16</p>
                            <p>Parana</p>
                            <p>Entre rios</p>
                        </div>

                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />


                        <h2 className="text-2xl mb-2">Resumen de orden</h2>
                        <div className="grid grid-cols-2">
                            <span>No. Productos.</span>
                            <span className="text-right">3 articulos</span>

                            <span>Subtotal</span>
                            <span className="text-right">$100</span>

                            <span>Impuestos (15%)</span>
                            <span className="text-right">$100</span>
                            <span className="mt-5 text-2xl">Total: </span>
                            <span className="mt-5 text-2xl text-right">$100</span>
                        </div>
                        <div className="mt-5 mb-2 w-full">
                            <div className={
                                clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                    {
                                        'bg-red-500': false,
                                        'bg-green-700': true,
                                    }
                                )
                            }>
                                <IoCardOutline size={30} />
                                <span className="mx-2">Pendiente de Pago</span>
                            </div>

                        </div>
                    </div>
                </div>


            </div>




        </div>
    );
}