import StatCard from "../components/StatCard";
import {CheckCircle, Users, ShoppingCart, LayoutDashboard} from 'lucide-react'

export default function Dashboard({data}) {
    const totalCustomers = data.customers.length;
    const activeCustomers = data.customers.filter(c => c.status === 'Active').length;
    const totalOrders = data.orders.length;
    const totalRevenue = data.orders.reduce((sum, o) => sum + o.total, 0).toFixed(2);


    return (
        <div className="space-y-5">
            <h2 className="text-3xl font-extrabold text-gray-900">CRM Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Customers" value={totalCustomers} icon={Users} color="border-blue-500"/>
                <StatCard title="Active Leads" value={activeCustomers} icon={CheckCircle} color="border-green-500"/>
                <StatCard title="Total Orders" value={totalOrders} icon={ShoppingCart} color="border-yellow-500"/>
                <StatCard title="Total Revenue" value={`$${totalRevenue}`} icon={LayoutDashboard}
                          color="border-purple-500"/>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h3>
                <ul className="divide-y divide-gray-200">
                    {data.orders.slice(0, 5).map(order => (
                        <li key={order.id} className="py-3 flex justify-between items-center">
                            <span className="font-medium text-blue-600">Order #{order.id}</span>
                            <span className="text-gray-700">{order.customerName}</span>
                            <span
                                className={`px-2 py-0.5 text-xs font-medium rounded-full ${order.status === 'Shipped' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {order.status}
                </span>
                            <span className="text-gray-900 font-bold">${order.total.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};