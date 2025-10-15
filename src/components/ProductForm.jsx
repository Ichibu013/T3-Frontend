import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const ProductForm = ({ initialData = {}, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        category: initialData.category || '',
        price: initialData.price || '',
        stock: initialData.stock || 0,
    });

    const isNew = !initialData.id;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(formData);
    };

    const LABEL_STYLE = "block text-sm font-medium text-gray-700";
    const INPUT_STYLE = "mt-1 block w-full text-gray-600 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border";

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">{isNew ? 'Add New Product' : `Edit Product: ${initialData.name}`}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className={LABEL_STYLE}>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required
                        className={INPUT_STYLE} />
                </div>
                <div>
                    <label className={LABEL_STYLE}>Category</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} required
                        className={INPUT_STYLE} />
                </div>
                <div>
                    <label className={LABEL_STYLE}>Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required
                        className={INPUT_STYLE} />
                </div>
                <div>
                    <label className={LABEL_STYLE}>Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} required
                        className={INPUT_STYLE} />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onCancel} className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition">
                        <XCircle className="w-4 h-4 mr-2" /> Cancel
                    </button>
                    <button type="submit" className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition">
                        <CheckCircle className="w-4 h-4 mr-2" /> {isNew ? 'Create Product' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
