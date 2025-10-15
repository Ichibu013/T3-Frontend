import NavItem from "./Navitem";
export default function Sidebar() {
    return (
      <nav className="space-y-2 p-4">
        <NavItem name="Dashboard" pageKey="dashboard" icon={LayoutDashboard} />
        <NavItem name="Customers" pageKey="customers" icon={Users} />
        <NavItem name="Products" pageKey="products" icon={Package} />
        <NavItem name="Orders" pageKey="orders" icon={ShoppingCart} />
        <hr className="border-blue-800 my-4" />
        <NavItem name="Settings" pageKey="settings" icon={Settings} />
      </nav>
    );
  };