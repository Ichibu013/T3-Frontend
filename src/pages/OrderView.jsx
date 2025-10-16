import { ArrowLeft } from "lucide-react";

export default function OrderView ({ order, setPage, data }){
    data.customers.find(c => c.id === order.customerId);
    return (
        <div className="space-y-5 w-236">
            <button onClick={() => setPage('orders')} className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900">Order #{order.id}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Order Summary */}
                <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-lg space-y-3">
                    <h3 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-700">Summary</h3>
                    <p className="text-gray-700"><span className="font-medium">Date:</span> {order.date}</p>
                    <p className="text-gray-700"><span className="font-medium">Total:</span> <span className="text-green-600 font-bold">${order.total.toFixed(2)}</span></p>
                    <p className="text-gray-700"><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-3 py-1 text-sm font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                        {order.status}
                      </span>
                    </p>
                    <p className="text-gray-700"><span className="font-medium">Customer:</span> {order.customerName}</p>
                </div>
                
                {/* Items List */}
                <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-700">Items Ordered ({order.items.length})</h3>
                    <ul className="space-y-3">
                        {order.items.map((item, index) => {
                            const product = data.products.find(p => p.id === item.productId);
                            return (
                                <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                    <span className="font-medium text-gray-800">{product?.name || 'Unknown Product'}</span>
                                    <span className="text-sm text-gray-600">Qty: {item.quantity} | Unit Price: ${item.price.toFixed(2)}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};