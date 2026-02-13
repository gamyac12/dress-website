const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = {
    getProducts: async () => {
        try {
            const response = await fetch(`${BASE_URL}/products/`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    },

    login: async (username, password) => {
        const response = await fetch(`${BASE_URL}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.non_field_errors || "Login failed");
        }
        return await response.json();
    },

    register: async (username, email, password) => {
        const response = await fetch(`${BASE_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }
        return await response.json();
    },

    createOrder: async (orderData, token) => {
        const response = await fetch(`${BASE_URL}/orders/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to create order");
        }
        return await response.json();
    },

    getOrders: async (token) => {
        const response = await fetch(`${BASE_URL}/orders/my-orders/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }
        return await response.json();
    },

    getPaymentMethods: async () => {
        const response = await fetch(`${BASE_URL}/orders/payment-methods/`);
        if (!response.ok) {
            throw new Error("Failed to fetch payment methods");
        }
        return await response.json();
        return await response.json();
    },

    cancelOrder: async (orderId, token) => {
        const response = await fetch(`${BASE_URL}/orders/cancel/${orderId}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to cancel order");
        }
        return await response.json();
    }
};

export default api;
