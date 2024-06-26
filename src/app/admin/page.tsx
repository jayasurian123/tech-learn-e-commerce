import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import db from '@/db/db';
import { formatCurrency, formatNumber } from '@/lib/formatter';

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: data._sum.pricePaidInCents || 0,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [totalUsers, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    totalUsers,
    avgValuePerUser:
      totalUsers === 0
        ? 0
        : (orderData._sum.pricePaidInCents ?? 0) / totalUsers / 100,
  };
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  // await new Promise((resolve) => {
  //   setTimeout(resolve, 2000);
  // });

  return {
    activeCount,
    inactiveCount,
  };
}

const AdminPage = async () => {
  const [salesData, orderData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 mx-2">
      <DashboardCard
        title="Sales"
        desc={`${formatNumber(salesData.numberOfSales)} Orders`}
        content={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customer"
        desc={`${formatCurrency(orderData.avgValuePerUser)} avg value`}
        content={formatNumber(orderData.totalUsers)}
      />
      <DashboardCard
        title="Active Products"
        desc={`${formatNumber(productData.inactiveCount)} Inactive`}
        content={formatNumber(productData.activeCount)}
      />
    </div>
  );
};

type DashboardCardProps = { title: string; desc: string; content: string };

function DashboardCard({ title, desc, content }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}

export default AdminPage;
