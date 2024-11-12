export const revalidate = 10000;
import { getProductSlug } from "@/actions";
import { ProductMobileSlidesShow, ProductSlidesShow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
    params: {
        slug: string;
    }

}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug;

    //data
    const product = await getProductSlug(slug);


    return {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? 'Descripcion no encontrada.',
        openGraph: {
            title: product?.title ?? 'Producto no encontrado',
            description: product?.description ?? 'Descripcion no encontrada.',
            images: [`/products/${product?.images[0]}`],
        },
    }
}

export default async function ProductBySlugPage({ params }: Props) {
    const { slug } = params;

    const product = await getProductSlug(slug)

    if (!product) {
        notFound()
    }


    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="col-span-1 md:col-span-2">
                <ProductMobileSlidesShow title={product.title} images={product.images} className="block md:hidden" />

                <ProductSlidesShow title={product.title} images={product.images} className="hidden md:block" />
            </div>

            <div className="col-span-1 px-5">
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>
                <StockLabel slug={product.slug} />
                <p className="text-lg mb-5">${product.price}</p>
                <AddToCart product={product} />

                <h3 className="font-bold text-sm">Descripcion</h3>
                <p className="font-light">{product.description}</p>
            </div>
        </div>
    );
}