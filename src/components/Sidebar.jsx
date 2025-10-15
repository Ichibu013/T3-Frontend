import { LayoutDashboard, Users, Package, ShoppingCart, Settings } from 'lucide-react';
import NavItem from "./Navitem";
export default function Sidebar({ currentPage, navigateTo }) {
    return (
        <nav className="space-y-2 p-4">
            <NavItem name="Dashboard" pageKey="dashboard" icon={LayoutDashboard} currentPage={currentPage} navigateTo={navigateTo} />
            <NavItem name="Customers" pageKey="customers" icon={Users} currentPage={currentPage} navigateTo={navigateTo} />
            <NavItem name="Products" pageKey="products" icon={Package} currentPage={currentPage} navigateTo={navigateTo} />
            <NavItem name="Orders" pageKey="orders" icon={ShoppingCart} currentPage={currentPage} navigateTo={navigateTo} />
            <hr className="border-blue-800 my-4" />
            <NavItem name="Settings" pageKey="settings" icon={Settings} currentPage={currentPage} navigateTo={navigateTo} />
        </nav>
    );
};