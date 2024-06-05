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
const ProductCard = ({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: ProductCardProps) => {
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
};

export default ProductCard;
