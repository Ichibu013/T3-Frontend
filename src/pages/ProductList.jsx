import {useMemo, useState} from "react";
import {Search, Plus, Pencil, Trash2} from 'lucide-react';

export default function ProductsList({products, setPage, selectEntity, deleteProduct}) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    return (
        <div className="space-y-5 w-236">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900">Product Catalog</h2>
                <button onClick={() => {
                    selectEntity(null);
                    setPage('product-add');
                }}
                        className="flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition">
                    <Plus className="w-5 h-5 mr-2"/> Add Product
                </button>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                <input
                    type="text"
                    placeholder="Search by product name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id}
                         className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-blue-400 hover:shadow-xl transition duration-150">
                        <div className="flex justify-between items-start">
                            <h3
                                className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition"
                                onClick={() => {
                                    selectEntity(product);
                                    setPage('product-view');
                                }}
                            >
                                {product.name}
                            </h3>
                            <div className="text-2xl font-extrabold text-blue-600">${product.price.toFixed(2)}</div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                            <p className={`font-medium ${product.stock > 50 ? 'text-green-600' : product.stock > 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                                Stock: {product.stock} units
                            </p>
                            <div className="space-x-2">
                                <button onClick={() => {
                                    selectEntity(product);
                                    setPage('product-edit');
                                }} className="text-indigo-600 hover:text-indigo-800">
                                    <Pencil className="w-4 h-4 inline"/>
                                </button>
                                <button onClick={() => deleteProduct(product.id)}
                                        className="text-red-600 hover:text-red-800">
                                    <Trash2 className="w-4 h-4 inline"/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};