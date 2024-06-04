'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/formatter';
import { Product } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addProduct } from '../../_actions/products';

const ProductForm = ({ product }: { product?: Product | null }) => {
  const [errorState, formAction] = useFormState(addProduct, {});
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents,
  );

  return (
    <form action={formAction} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ''}
        />
        {errorState.name && (
          <div className="text-destructive">{errorState.name}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price in Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          onChange={(event) =>
            setPriceInCents(Number(event.target.value) || undefined)
          }
          value={priceInCents}
        />
        {errorState.priceInCents && (
          <div className="text-destructive">{errorState.priceInCents}</div>
        )}
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            required
            defaultValue={product?.description || ''}
          />
          {errorState.description && (
            <div className="text-destructive">{errorState.description}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <Input
            type="file"
            id="file"
            name="file"
            required={product === null}
          />
          {product !== null && (
            <div className="text-muted-foreground">{product?.filePath}</div>
          )}
          {errorState.file && (
            <div className="text-destructive">{errorState.file}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            id="image"
            name="image"
            required={product === null}
          />
          {product !== null && (
            <Image
              className="object-contain"
              src={`/${product?.imagePath}`}
              alt="preview image"
              width={200}
              height={200}
            />
          )}
          {errorState.image && (
            <div className="text-destructive">{errorState.image}</div>
          )}
        </div>
      </div>
      <SubmitButton />
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </Button>
  );
}

export default ProductForm;
