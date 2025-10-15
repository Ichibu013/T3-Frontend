import {ArrowLeft,Pencil} from 'lucide-react';
// 6. Product Detail Page (View) (Dynamic Page View 6)
export default function ProductView({ product, setPage }) {
    return (
        <div className="space-y-5 w-236">
            <button onClick={() => setPage('products')} className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
            </button>
            <div className="flex justify-between items-start">
                <h2 className="text-3xl font-extrabold text-gray-900">{product.name}</h2>
                <button
                    onClick={() => setPage('product-edit')}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    <Pencil className="w-5 h-5 mr-2" /> Edit Product
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-xl font-semibold border-b pb-2 mb-4">Product Specs</h3>
                    <p className="text-gray-700"><span className="font-medium">ID:</span> {product.id}</p>
                    <p className="text-gray-700"><span className="font-medium">Category:</span> {product.category}</p>
                    <p className="text-gray-700"><span className="font-medium">Price:</span> <span className="text-green-600 font-bold text-lg">${product.price.toFixed(2)}</span></p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold border-b pb-2 mb-4">Inventory</h3>
                    <p className="text-gray-700"><span className="font-medium">In Stock:</span> {product.stock}</p>
                    <p className={`text-gray-700 ${product.stock < 20 ? 'text-red-600 font-bold' : ''}`}><span className="font-medium">Alert:</span> {product.stock < 20 ? 'Low Stock Warning!' : 'Stock is healthy'}</p>
                </div>
            </div>
        </div>
    );
}