import PageHeader from '@/app/admin/_components/PageHeader';
import db from '@/db/db';
import ProductForm from '../../_components/ProductForm';

const EditProductPage = async ({
  params: { fileId },
}: {
  params: { fileId: string };
}) => {
  const product = await db.product.findUnique({ where: { id: fileId } });

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
};

export default EditProductPage;
