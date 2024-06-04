import db from '@/db/db';
import fs from 'fs/promises';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params: { fileId } }: { params: { fileId: string } },
) {
  const product = await db.product.findUnique({ where: { id: fileId } });

  if (product == null) {
    return notFound();
  }

  const { size } = await fs.stat(product.filePath);
  const file = await fs.readFile(product.filePath);
  const ext = product.filePath.split('.').pop();

  return new NextResponse(file, {
    headers: {
      'Content-Disposition': `attachment; filename="${product.name}.${ext}"`,
      'Content-Length': size.toString(),
    },
  });
}
