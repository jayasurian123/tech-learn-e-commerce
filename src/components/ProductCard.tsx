import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
};

export default function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative aspect-video h-auto w-full">
        <Image src={`/${imagePath}`} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{priceInCents}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex animate-pulse flex-col overflow-hidden">
      <div className="aspect-video w-full bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="h-6 w-3/4 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="h-4 w-1/2 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="h-4 w-full rounded-full bg-gray-300" />
        <div className="h-4 w-full rounded-full bg-gray-300" />
        <div className="h-4 w-3/4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button size="lg" disabled className="w-full" />
      </CardFooter>
    </Card>
  );
}
