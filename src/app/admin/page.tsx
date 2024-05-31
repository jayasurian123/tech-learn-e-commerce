import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const AdminPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 mx-2">
      <DashboardCard
        title="Sales"
        desc="sales desc"
        content="I am sales data"
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
