

'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/cart');
                if (response.data.success) {
                    setCartItems(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Error fetching cart items.');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold mb-4">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-700">Your cart is empty.</p>
            ) : (
                <div className="flex flex-col items-center justify-center ">
                    {cartItems.map((item) => (
                        <div key={item._id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold">{item.ItemName}</h2>
                            <p className="text-gray-700">Quantity: {item.quantity}</p>
                            <p className="text-gray-700">Amount: ${item.amount}</p>
                            <p className="text-gray-700">Date Added: {new Date(item.dateAdded).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartPage;
