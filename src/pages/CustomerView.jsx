import {ArrowLeft, Pencil} from 'lucide-react';
// 3. Customer Detail Page (View) (Dynamic Page View 3)
export default function CustomerView({customer, setPage, updateCustomer, data}) {
    const customerOrders = data.getCustomerOrders(customer.id);

    return (
        <div className="space-y-5">
            <button onClick={() => setPage('customers')}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4">
                <ArrowLeft className="w-4 h-4 mr-2"/> Back to Customers
            </button>
            <div className="flex justify-between items-start">
                <h2 className="text-3xl font-extrabold text-gray-900">{customer.name} Details</h2>
                <button
                    onClick={() => setPage('customer-edit', customer)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    <Pencil className="w-5 h-5 mr-2"/> Edit Customer
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Customer Info Card */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg space-y-4">
                    <h3 className="text-xl font-semibold border-b pb-2 mb-4">Contact Information</h3>
                    <p className="text-gray-700"><span className="font-medium">ID:</span> {customer.id}</p>
                    <p className="text-gray-700"><span className="font-medium">Email:</span> {customer.email}</p>
                    <p className="text-gray-700"><span className="font-medium">Phone:</span> {customer.phone}</p>
                    <p className="text-gray-700"><span className="font-medium">City:</span> {customer.city}</p>
                    <p className="text-gray-700"><span className="font-medium">Status:</span>
                        <span className={`ml-2 px-3 py-1 text-sm font-semibold rounded-full ${
                            customer.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                        {customer.status}
                      </span>
                    </p>
                </div>

                {/* Order History Card */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold border-b pb-2 mb-4">Order History
                        ({customerOrders.length})</h3>
                    {customerOrders.length > 0 ? (
                        <ul className="space-y-3">
                            {customerOrders.map(order => (
                                <li key={order.id} className="bg-gray-50 p-3 rounded-md border border-gray-200">
                                    <p className="font-medium text-gray-800">Order #{order.id}</p>
                                    <p className="text-sm text-gray-600">${order.total.toFixed(2)} on {order.date}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No orders placed yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};