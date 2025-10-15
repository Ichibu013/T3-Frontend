import { useState } from "react";
// Reusable Form for Customer (Used for Add and Edit)
export default function CustomerForm ({ initialData, onSave, onCancel, isNew = false }) {
  const [formData, setFormData] = useState(initialData || { name: '', email: '', phone: '', city: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Name and Email are required.');
      return;
    }
    setError('');
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">{isNew ? 'Add New Customer' : `Edit Customer: ${initialData.name}`}</h3>
      {error && <p className="text-red-500 mb-4 bg-red-100 p-2 rounded">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (Backend Key)</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" required />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input type="text" name="city" id="city" value={formData.city} onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={onCancel}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            <X className="w-4 h-4 mr-2" /> Cancel
          </button>
          <button type="submit"
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition">
            <CheckCircle className="w-4 h-4 mr-2" /> {isNew ? 'Create Customer' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};