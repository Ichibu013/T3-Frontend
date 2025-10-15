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

import useCRMData from './services/ApiCalls'
import StatusMessage from "./components/StatusMessage.jsx";

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

    // 4. Customer Add/Edit Logic (Page Views 4 & 10)
    const handleCustomerSave = async (formData) => {
        if (currentPage === 'customer-add') {
            // CREATE Operation
            const newCustomer = await data.addCustomer(formData);
            if (newCustomer) {
                navigateTo('customer-view', newCustomer);
            } else {
                navigateTo('customers');
            }
        } else if (currentPage === 'customer-edit') {
            // UPDATE Operation
            await data.updateCustomer(selectedEntity.id, formData);
            navigateTo('customer-view', { ...selectedEntity, ...formData });
        }
    };

    // 7. Product Add/Edit Logic ( Page Views 7)
    const handleProductSave = async (formData) => {
        if (currentPage === 'product-add') {
            // CREATE Operation
            const newProduct = await data.addProduct(formData);
            if (newProduct) {
                navigateTo('product-view', newProduct);
            } else {
                navigateTo('products');
            }
        } else if (currentPage === 'product-edit') {
            // UPDATE Operation
            await data.updateProduct(selectedEntity.id, formData);
            navigateTo('product-view', { ...selectedEntity, ...formData });
        }
    };


    // Dynamic Content Renderer
    const renderContent = () => {
        if (data.loading) {
            return <div className="text-center p-10 text-xl text-gray-500">Loading data from MySQL...</div>;
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
            {/* Status Message */}
            <StatusMessage message={data.error} type="error" onClose={data.clearError} />

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
                <div className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-2 sm:p-6 lg:p-8 w-256">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default App;
