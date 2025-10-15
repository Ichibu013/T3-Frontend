import React, { useState, useEffect, useMemo, useCallback } from 'react';
// Using lucide-react for professional icons
import { LayoutDashboard } from 'lucide-react';

import Dashboard from './pages/Dashboard';
import CustomersList from './pages/CustomerList';
import CustomerView from './pages/CustomerView';
import CustomerForm from './components/CustomerForm';
import ProductsList from './pages/ProductList';
import ProductView from './pages/ProductView';
import ProductForm from './components/ProductForm';
import OrdersList from './pages/OrderList';
import OrderView from './pages/OrderView';
import Sidebar from './components/Sidebar';
import SettingsPage from './pages/Settings';

// --- MOCK DATA & UTILITIES (Simulating Backend/DB) ---

const initialCustomers = [
    { id: 101, name: 'Alice Johnson', email: 'alice@corp.com', phone: '555-0101', city: 'New York', status: 'Active', totalOrders: 5 },
    { id: 102, name: 'Bob Smith', email: 'bob@tech.com', phone: '555-0102', city: 'San Francisco', status: 'Lead', totalOrders: 0 },
    { id: 103, name: 'Charlie Davis', email: 'charlie@biz.com', phone: '555-0103', city: 'London', status: 'Active', totalOrders: 12 },
    { id: 104, name: 'Diana King', email: 'diana@consult.com', phone: '555-0104', city: 'Seattle', status: 'Inactive', totalOrders: 2 },
];

const initialProducts = [
    { id: 201, name: 'Enterprise SSD', category: 'Hardware', price: 299.99, stock: 150 },
    { id: 202, name: 'Cloud Service Sub', category: 'Software', price: 49.99, stock: 999 },
    { id: 203, name: '4K Monitor 32"', category: 'Hardware', price: 450.00, stock: 55 },
    { id: 204, name: 'Security Suite Pro', category: 'Software', price: 99.99, stock: 300 },
];

const initialOrders = [
    { id: 301, customerId: 101, customerName: 'Alice Johnson', date: '2024-09-15', total: 349.98, status: 'Shipped', items: [{ productId: 201, quantity: 1, price: 299.99 }] },
    { id: 302, customerId: 103, customerName: 'Charlie Davis', date: '2024-09-14', total: 99.99, status: 'Processing', items: [{ productId: 204, quantity: 1, price: 99.99 }] },
    { id: 303, customerId: 104, customerName: 'Diana King', date: '2024-09-12', total: 450.00, status: 'Delivered', items: [{ productId: 203, quantity: 1, price: 450.00 }] },
];

// Custom hook to simulate API interaction and state management
const useCRMData = () => {
    const [customers, setCustomers] = useState(initialCustomers);
    const [products, setProducts] = useState(initialProducts);
    const [orders, setOrders] = useState(initialOrders);
    const [lastId, setLastId] = useState(304); // Next order ID

    // Simulates fetching data on load (READ operation)
    useEffect(() => {
        // In a real app, this would be a fetch call to Spring Boot API
        console.log("Simulating initial data fetch from Spring Boot...");
    }, []);

    // Customer CRUD Operations
    const addCustomer = useCallback((newCustomer) => {
        const nextId = customers.reduce((max, c) => Math.max(max, c.id), 100) + 1;
        const customerWithId = { ...newCustomer, id: nextId, totalOrders: 0, status: 'Active' };
        setCustomers((prev) => [...prev, customerWithId]);
        return customerWithId;
    }, [customers]);

    const updateCustomer = useCallback((id, updatedData) => {
        setCustomers((prev) =>
            prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
        );
    }, []);

    const deleteCustomer = useCallback((id) => {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
        // Also simulate deleting related orders (not fully implemented here for brevity)
    }, []);

    // Product CRUD Operations
    const addProduct = useCallback((newProduct) => {
        const nextId = products.reduce((max, p) => Math.max(max, p.id), 200) + 1;
        const productWithId = { ...newProduct, id: nextId };
        setProducts((prev) => [...prev, productWithId]);
        return productWithId;
    }, [products]);

    const updateProduct = useCallback((id, updatedData) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
        );
    }, []);

    const deleteProduct = useCallback((id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    }, []);

    // Order READ Operations
    const getCustomerOrders = useCallback((customerId) => {
        return orders.filter(o => o.customerId === customerId);
    }, [orders]);

    return {
        customers, products, orders,
        addCustomer, updateCustomer, deleteCustomer,
        addProduct, updateProduct, deleteProduct,
        getCustomerOrders,
        loading: false // Mock loading state
    };
};

// --- COMPONENTS ---

// 1. Dashboard Page
// Reusable Form for Customer (Used for Add and Edit)
// 2. Customers List Page (Dynamic Page View 2)

const App = () => {
    const data = useCRMData();
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile menu

    // Helper function to navigate and set the selected entity for detail views
    const navigateTo = (page, entity) => {
        if (entity) {
            setSelectedEntity(entity);
        }
        setCurrentPage(page);
        setIsSidebarOpen(false);
    };

    // 4. Customer Add/Edit Logic (Dynamic Page Views 4 & 10)
    const handleCustomerSave = (formData) => {
        if (currentPage === 'customer-add') {
            // CREATE Operation
            const newCustomer = data.addCustomer(formData);
            navigateTo('customer-view', newCustomer);
        } else if (currentPage === 'customer-edit') {
            // UPDATE Operation
            data.updateCustomer(selectedEntity.id, formData);
            navigateTo('customer-view', { ...selectedEntity, ...formData });
        }
    };

    // 7. Product Add/Edit Logic (Dynamic Page Views 7)
    const handleProductSave = (formData) => {
        if (currentPage === 'product-add') {
            // CREATE Operation
            const newProduct = data.addProduct(formData);
            navigateTo('product-view', newProduct);
        } else if (currentPage === 'product-edit') {
            // UPDATE Operation
            data.updateProduct(selectedEntity.id, formData);
            navigateTo('product-view', { ...selectedEntity, ...formData });
        }
    };


    // Dynamic Content Renderer
    const renderContent = () => {
        if (data.loading) {
            return <div className="text-center p-10 text-xl text-gray-500">Loading data from Spring Boot (Simulated)...</div>;
        }
        switch (currentPage) {
            // 1. Dashboard (Dynamic Page View 1)
            case 'dashboard':
                return <Dashboard data={data} />;

            // 2. Customers List (Dynamic Page View 2)
            case 'customers':
                return <CustomersList customers={data.customers} setPage={navigateTo} selectEntity={setSelectedEntity} deleteCustomer={data.deleteCustomer} />;

            // 3. Customer Detail (View) (Dynamic Page View 3)
            case 'customer-view':
                return selectedEntity && <CustomerView customer={selectedEntity} setPage={navigateTo} data={data} />;

            // 4. Customer Detail (Edit) (Dynamic Page View 4)
            case 'customer-edit':
                return selectedEntity && <CustomerForm initialData={selectedEntity} onSave={handleCustomerSave} onCancel={() => navigateTo('customer-view', selectedEntity)} isNew={false} />;

            // 10. Add New Customer (Dynamic Page View 10)
            case 'customer-add':
                return <CustomerForm initialData={{ name: '', email: '', phone: '', city: '' }} onSave={handleCustomerSave} onCancel={() => navigateTo('customers')} isNew={true} />;

            // 5. Products List (Dynamic Page View 5)
            case 'products':
                return <ProductsList products={data.products} setPage={navigateTo} selectEntity={setSelectedEntity} deleteProduct={data.deleteProduct} />;

            // 6. Product Detail (View) (Dynamic Page View 6)
            case 'product-view':
                return selectedEntity && <ProductView product={selectedEntity} setPage={navigateTo} />;

            // 7. Product Detail (Edit) (Dynamic Page View 7)
            case 'product-edit':
                return selectedEntity && <ProductForm initialData={selectedEntity} onSave={handleProductSave} onCancel={() => navigateTo('product-view', selectedEntity)} isNew={false} />;

            // Product Add Page (For completeness, derived from Product Form)
            case 'product-add':
                return <ProductForm onSave={handleProductSave} onCancel={() => navigateTo('products')} isNew={true} />;

            // 8. Orders List (Dynamic Page View 8)
            case 'orders':
                return <OrdersList orders={data.orders} setPage={navigateTo} selectEntity={setSelectedEntity} />;

            // 9. Order Detail (View) (Dynamic Page View 9)
            case 'order-view':
                return selectedEntity && <OrderView order={selectedEntity} setPage={navigateTo} data={data} />;

            // 10. Settings/Placeholder (Dynamic Page View 11 - technically 10 based on the plan)
            case 'settings':
                return <SettingsPage />;

            default:
                return <div className="text-center p-10 text-red-500">404 Page Not Found</div>;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans antialiased">

            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity ${isSidebarOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar (Desktop & Mobile) */}
            <aside
                className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out 
                   w-64 bg-blue-900 z-30 flex flex-col shadow-2xl`}
            >
                <div className="p-6 text-white text-2xl font-extrabold border-b border-blue-800">
                    Mini-CRM
                </div>
                <div className="flex-grow overflow-y-auto">
                    <Sidebar currentPage={currentPage} navigateTo={navigateTo} />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden w-full">

                {/* Header */}
                <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md z-10 sticky top-0">
                    <button
                        className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <LayoutDashboard className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800 capitalize">
                        {currentPage.split('-')[0]}
                        {currentPage.includes('-view') && ' > View'}
                        {currentPage.includes('-edit') && ' > Edit'}
                        {currentPage.includes('-add') && ' > Add'}
                    </h1>
                    <div className="text-sm text-gray-500 hidden sm:block">
                        (React + Spring Boot + MySQL)
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default App;
