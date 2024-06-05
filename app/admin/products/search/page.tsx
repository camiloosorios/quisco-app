import ProductSearchForm from '@/components/products/ProductSearchForm';
import ProductTable from '@/components/products/ProductTable';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';
import React from 'react'

async function searchProducts(searchTerm : string) {
    return prisma.product.findMany({
        where : {
            name : {
                contains : searchTerm,
                mode : 'insensitive'
            }
        },
        include : {
            category : true
        }
    });
}

export default async function SearchPage({ searchParams } : { searchParams : { search : string } }) {
    const products = await searchProducts(searchParams.search);
  return (
    <>
        <Heading>Resultados de búsqueda: {searchParams.search}</Heading>
        <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
            <ProductSearchForm/>
        </div>
        {products.length ? (
            <ProductTable
                products={products}
            />
        ) : <p className='text-center text-lg mt-5'>No hay resultados</p>}
    </>
  )
}
