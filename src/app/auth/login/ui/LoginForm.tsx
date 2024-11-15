"use client"
import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link"
import { useActionState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";


export const LoginForm = () => {

    const [errorMessage, formAction, isPending
    ] = useActionState(authenticate, undefined);


    useEffect(() => {
        if (errorMessage === 'Success') {
            window.location.replace('/') // hace el refresh
        }
    }, [errorMessage])

    return (
        <form action={formAction} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name="email" />


            <label htmlFor="email">Contraseña</label>
            <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="password" name="password" />


            <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                {errorMessage !== 'Success' && (
                    <div className="flex flex-row mt-2">
                        <IoIosCloseCircleOutline size={30} className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </div>
                )}
            </div>

            <button
                disabled={isPending}
                className={
                    clsx({
                        "btn-primary": !isPending,
                        "btn-secondary": isPending
                    })
                }>
                Ingresar
            </button>

            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}
