'use client'
import Link from "next/link";

export default function GenderNotFound() {

    return (
        <div>
            <h1>404 Not Found</h1>
            <Link href={"/"}>Regresar</Link>
        </div>
    );
}