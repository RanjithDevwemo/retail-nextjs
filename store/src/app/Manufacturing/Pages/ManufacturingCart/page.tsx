
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        if (!username || !phoneNumber) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/order', {
                username,
                phoneNumber,
                cartItems,
            });

            if (response.data.success) {
                alert('Order placed successfully!');
                // Optionally, clear cart or redirect
                setCartItems([]);
                setUsername('');
                setPhoneNumber('');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert('Error placing order.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold mb-4">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-700">Your cart is empty.</p>
            ) : (
                <div className="flex flex-col items-center justify-center mb-6">
                    {cartItems.map((item) => (
                        <div key={item._id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition mb-4 w-full">
                            <h2 className="text-xl font-semibold">{item.ItemName}</h2>
                            <p className="text-gray-700">Quantity: {item.quantity}</p>
                            <p className="text-gray-700">Amount: ${item.amount}</p>
                            <p className="text-gray-700">Date Added: {new Date(item.dateAdded).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
            <form onSubmit={handleOrderSubmit} className="flex flex-col items-center">
                <div className="mb-4 w-full">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div className="mb-4 w-full">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default CartPage;
