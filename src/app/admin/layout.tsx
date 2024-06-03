import Nav, { NavLink } from '@/components/Nav';

export const dynamic = 'force-dynamic';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/customers">Customers</NavLink>
        <NavLink href="/admin/sales">Sales</NavLink>
      </Nav>
      <div className="mx-5">{children}</div>
    </>
  );
};

export default AdminLayout;

8891492357;
