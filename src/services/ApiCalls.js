import axios from 'axios';
import { useState, useEffect, useCallback } from "react";
// Define the base URL for the Spring Boot backend
const API_BASE_URL = 'http://localhost:8080/api';
const useCRMData = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  // Orders are currently mocked as the provided backend only had Customer/Product endpoints
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers`);
      // Simulating a minor data transformation to match old structure (e.g., status, totalOrders)
      const data = response.data.map(c => ({
        ...c,
        status: c.status || 'Active', 
        totalOrders: c.totalOrders || 0
      }));
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to fetch customers from the backend.");
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products from the backend.");
    }
  }, []);

  // Initial Data Fetch on Mount
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([fetchCustomers(), fetchProducts()]);
      
      // MOCK ORDERS DATA: Since the backend doesn't handle orders, we use a simple mock here.
      setOrders([
        { id: 301, customerId: 101, customerName: 'Alice Johnson', date: '2024-09-15', total: 349.98, status: 'Shipped', items: [{ productId: 201, quantity: 1, price: 299.99 }] },
        { id: 302, customerId: 103, customerName: 'Charlie Davis', date: '2024-09-14', total: 99.99, status: 'Processing', items: [{ productId: 204, quantity: 1, price: 99.99 }] },
      ]);
      
      setLoading(false);
    };
    fetchAllData();
  }, [fetchCustomers, fetchProducts]); // Dependencies ensure functions are stable

  // Customer CRUD Operations (Now using Axios)
  const addCustomer = useCallback(async (newCustomer) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/customers`, newCustomer);
      // Optimistically update the state, then refresh the list
      setCustomers((prev) => [...prev, { ...response.data, status: 'Active', totalOrders: 0 }]);
      return { ...response.data, status: 'Active', totalOrders: 0 };
    } catch (err) {
      setError("Failed to create customer.");
      console.error("CREATE Customer Error:", err);
      return null;
    }
  }, []);

  const updateCustomer = useCallback(async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/customers/${id}`, updatedData);
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...response.data, status: c.status, totalOrders: c.totalOrders } : c))
      );
      return { ...response.data };
    } catch (err) {
      setError("Failed to update customer.");
      console.error("UPDATE Customer Error:", err);
      return null;
    }
  }, []);

  const deleteCustomer = useCallback(async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/customers/${id}`);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError("Failed to delete customer. Ensure customer ID exists in the backend.");
      console.error("DELETE Customer Error:", err);
    }
  }, []);

  // Product CRUD Operations (Now using Axios)
  const addProduct = useCallback(async (newProduct) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, newProduct);
      setProducts((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError("Failed to create product.");
      console.error("CREATE Product Error:", err);
      return null;
    }
  }, []);

  const updateProduct = useCallback(async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, updatedData);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...response.data } : p))
      );
      return response.data;
    } catch (err) {
      setError("Failed to update product.");
      console.error("UPDATE Product Error:", err);
      return null;
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError("Failed to delete product. Ensure product ID exists in the backend.");
      console.error("DELETE Product Error:", err);
    }
  }, []);

  const getCustomerOrders = useCallback((customerId) => {
    // Only returning mocked orders for now
    return orders.filter(o => o.customerId === customerId);
  }, [orders]);


  return {
    customers, products, orders,
    addCustomer, updateCustomer, deleteCustomer,
    addProduct, updateProduct, deleteProduct,
    getCustomerOrders,
    loading,
    error,
    clearError: () => setError(null)
  };
};
export default useCRMData