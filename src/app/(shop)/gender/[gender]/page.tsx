export const revalidate = 60;
import { getPaginatedProductWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';

interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page?: string;
    }
}


export default async function GenderPage({ params, searchParams }: Props) {

    const { gender } = params;
    const page = searchParams.page ? parseInt(searchParams.page) : 1
    const { products, totalPage } = await getPaginatedProductWithImages({ page, gender: gender as Gender });

    if (products.length === 0) {
        redirect(`/gender/${gender}`)
    }


    const labels: Record<string, string> = {
        'men': 'para hombres',
        'women': 'para mujeres',
        'kid': 'para niños',
        'unisex': 'para todos'
    }

    return (
        <>
            <Title
                title={`Artículos de ${labels[gender]}`}
                subtitle="Todos los productos"
                className="mb-2"
            />
            <ProductGrid products={products} />
            <Pagination totalPage={totalPage} />
        </>
    );
}