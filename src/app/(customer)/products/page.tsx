import ProductCard, { ProductCardSkeleton } from '@/components/ProductCard';
import db from '@/db/db';
import { Suspense } from 'react';

function getProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: 'asc' },
  });
}

export default function ProductsPage() {
  return (
    <div className="mx-2 my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </div>
  );
}

async function ProductsSuspense() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const products = await getProducts();

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </>
  );
}
