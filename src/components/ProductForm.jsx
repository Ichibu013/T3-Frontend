import { useState } from "react";
import {CheckCircle} from "lucide-react";
// Reusable Component for Product Form
export default function ProductForm ({ initialData, onSave, onCancel, isNew = false }){
    const [formData, setFormData] = useState(initialData || { name: '', category: '', price: 0.00, stock: 0 });
    
    const handleChange = (e) => {
        let value = e.target.value;
        if (e.target.name === 'price' || e.target.name === 'stock') {
            value = parseFloat(value) || 0;
        }
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">{isNew ? 'Add New Product' : `Edit Product: ${initialData.name}`}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price (Backend Key)</label>
                    <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" onClick={onCancel} className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                        <X className="w-4 h-4 mr-2" /> Cancel
                    </button>
                    <button type="submit" className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition">
                        <CheckCircle className="w-4 h-4 mr-2" /> {isNew ? 'Create Product' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
  };