import ProductCard, { ProductCardSkeleton } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import db from '@/db/db';
import { Product } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

function getPolpularProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: 'desc' } },
    take: 6,
  });
}

function getNewestProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });
}

export default function HomePage() {
  return (
    <main className="space-y-12">
      <ProductGridSection
        title="New Products"
        productsFetcher={getNewestProducts}
      />
      <ProductGridSection
        title="Popular Products"
        productsFetcher={getPolpularProducts}
      />
    </main>
  );
}

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

async function ProductGridSection({
  title,
  productsFetcher,
}: ProductGridSectionProps) {
  const products = await productsFetcher();

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button asChild variant="outline">
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="mx-2 my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
