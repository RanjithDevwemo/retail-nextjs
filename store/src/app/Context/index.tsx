// 'use client'

// import { createContext, useState ,useContext,useEffect} from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const AppContext=createContext('Hello');

// export function AppWrapper({children}:{
//     children: React.ReactNode;
//   }) {
//     let [state,setState]=useState('hello world');
//     const [auth,setAuth]=useState({isAuthenticated:false,user:null});
//     const[token,setToken]=useState(localStorage.getItem('auth-token')||'');
//     const[storeId,SetStoreId]=useState('');
//     const [storeName,setStoreName]=useState('');
//     const [products, setProducts] = useState([]);
//     const [cartItems, setCartItems] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [getAllOrders,setGetAllOrders]=useState('');
  

//     useEffect(() => {
//       const verifyToken = async () => {
//           if (token) {
//               try {
//                   const response = await axios.get('http://localhost:4000/store/verify-token', {
//                       headers: { 'Authorization': `Bearer ${token}` }
//                   });
//                   const { success, user } = response.data;
//                   if (success) {
//                       setAuth({ isAuthenticated: true, user });
//                   } else {
//                       localStorage.removeItem('auth-token');
//                       setAuth({ isAuthenticated: false, user: null });
//                   }
//               } catch (error) {
//                   console.error("Token verification error:", error);
//                   localStorage.removeItem('auth-token');
//                   setAuth({ isAuthenticated: false, user: null });
//               }
//           }
//       };
//       verifyToken();
//   }, [token]);

// useEffect(()=>{
// if(token){
// try{
// const decodedToken=jwtDecode(token);
// SetStoreId(decodedToken.store.id);
// }catch(error){
// console.log(error);
// }
// }
// },[token])
  

// // console.log(storeId);


//   // Fetch all products
//   useEffect(() => {
//       const fetchProducts = async () => {
//           try {
//               const response = await axios.get('http://localhost:4000/allproducts');
//               setProducts(response.data);
//           } catch (err) {
//               console.error('Error fetching products:', err.message);
//           }
//       };

//       fetchProducts();
//   }, []);

//   // Filter products based on search term
//   useEffect(() => {
//       if (searchTerm) {
//           const filtered = products.filter(product =>
//               product.name.toLowerCase().includes(searchTerm.toLowerCase())
//           );
//           setFilteredProducts(filtered);
//       } else {
//           setFilteredProducts(products);
//       }
//   }, [searchTerm, products]);

//   // Handle search input change
//   const handleSearchChange = (event) => {
//       setSearchTerm(event.target.value);
//   };

//   // Add product to the bill
//   const billCart = async (productId, productName, productPrice, category, gst,reorderPoint, sku) => {

//     console.log("product page : ",reorderPoint);

//       try {
//           const response = await axios.post('http://localhost:4000/addtobill', {
//               productId,
//               productName,
//               productPrice,
              
//               category,
//               gst,
//               reorderPoint,
//               sku
//           });
//           console.log('Add to bill response:', response.data);
//           fetchCartItems(); // Refresh cart items after adding
//       } catch (err) {
//           console.error('Error adding to bill:', err.message);
//       }
//   };

//   // Fetch cart items
//   const fetchCartItems = async () => {
//       try {
//           const response = await axios.get('http://localhost:4000/getall/Cartproducts');
//           setCartItems(response.data);
//       } catch (err) {
//           console.error('Error fetching cart items:', err.message);
//       }
//   };

//   // Update cart items when component mounts
//   useEffect(() => {
//       fetchCartItems();
//   }, []);

// const getAllorderDetails=async()=>{
//   try{
//       const response=await axios.get('http://localhost:4000/fetch/graph');
//       setGetAllOrders(response.data);
//   }catch(error){
//       console.log("Fetching data error",error);
      
//   }
// }

// useEffect(()=>{
//   getAllorderDetails();
// },[])

// const login=(token,user)=>{
// localStorage.setItem('auth-token',token);
// setAuth({isAuthenticated:true,user});
// }

// useEffect(()=>{
//   const fetchuserName=async()=>{
//       try{
         
//           const response = await axios.get(`http://localhost:4000/storename/${storeId}`);
//           if(response.data.success){
//           // console.log(response.data.store.name);
//           setStoreName(response.data.store.name);
//           }else{
//               console.log("error");
              
//           }
          
//       }
//       catch(error){
//   console.log("catch block error"+error);
  
//       }
//   }
  
//   if(storeId){
//       fetchuserName();
//   }
  
//   },[storeId])

// const logout=()=>{
//   localStorage.removeItem('auth-token');
//   setAuth({isAuthenticated:false,user:null});
//   window.location.href='/login';
// }

//     return(
//         <AppContext.Provider value={{state,auth,login,logout, products, setFilteredProducts,
//           filteredProducts, searchTerm, handleSearchChange, billCart, cartItems,getAllOrders,
//           storeId,storeName}}>
//             {children}
//         </AppContext.Provider>
//     )

//   }

//   export function useAppContext(){

//     return useContext(AppContext);
//   }






// 'use client';

// import { createContext, useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const AppContext = createContext('Hello');

// export function AppWrapper({ children }) {
//     const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
//     const [token, setToken] = useState(localStorage.getItem('auth-token') || '');
//     const [storeId, setStoreId] = useState('');
//     const [storeName, setStoreName] = useState('');
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [getAllOrders, setGetAllOrders] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('All');

//     useEffect(() => {
//         const verifyToken = async () => {
//             if (token) {
//                 try {
//                     const response = await axios.get('http://localhost:4000/store/verify-token', {
//                         headers: { 'Authorization': `Bearer ${token}` }
//                     });
//                     const { success, user } = response.data;
//                     if (success) {
//                         setAuth({ isAuthenticated: true, user });
//                     } else {
//                         localStorage.removeItem('auth-token');
//                         setAuth({ isAuthenticated: false, user: null });
//                     }
//                 } catch (error) {
//                     console.error("Token verification error:", error);
//                     localStorage.removeItem('auth-token');
//                     setAuth({ isAuthenticated: false, user: null });
//                 }
//             }
//         };
//         verifyToken();
//     }, [token]);

//     useEffect(() => {
//         if (token) {
//             try {
//                 const decodedToken = jwtDecode(token);
//                 setStoreId(decodedToken.store.id);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     }, [token]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/allproducts');
//                 setProducts(response.data);
//             } catch (err) {
//                 console.error('Error fetching products:', err.message);
//             }
//         };

//         fetchProducts();
//     }, []);

//     useEffect(() => {
//         if (selectedCategory === 'All') {
//             setFilteredProducts(products);
//         } else {
//             setFilteredProducts(products.filter(product => product.category === selectedCategory));
//         }
//     }, [products, selectedCategory]);

//     useEffect(() => {
//         if (searchTerm) {
//             const filtered = products.filter(product =>
//                 product.name.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//             setFilteredProducts(filtered);
//         } else {
//             setFilteredProducts(products);
//         }
//     }, [searchTerm, products]);

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const handleCategoryChange = (category) => {
//         setSelectedCategory(category);
//     };

//     const login = (token, user) => {
//         localStorage.setItem('auth-token', token);
//         setAuth({ isAuthenticated: true, user });
//     };

//     const logout = () => {
//         localStorage.removeItem('auth-token');
//         setAuth({ isAuthenticated: false, user: null });
//         window.location.href = '/login';
//     };

//     return (
//         <AppContext.Provider value={{
//             auth,
//             login,
//             logout,
//             products,
//             setFilteredProducts,
//             filteredProducts,
//             searchTerm,
//             handleSearchChange,
//             handleCategoryChange,
//             getAllOrders,
//             storeId,
//             storeName
//         }}>
//             {children}
//         </AppContext.Provider>
//     );
// }

// export function useAppContext() {
//     return useContext(AppContext);
// }




'use client';

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AppContext = createContext('Hello');

export function AppWrapper({ children }) {
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
    const [token, setToken] = useState(localStorage.getItem('auth-token') || '');
    const [storeId, setStoreId] = useState('');
    const [storeName, setStoreName] = useState('');
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [getAllOrders, setGetAllOrders] = useState('');
    // const [cartItems, setCartItems] = useState([]);

    // Token verification
    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:4000/store/verify-token', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const { success, user } = response.data;
                    if (success) {
                        setAuth({ isAuthenticated: true, user });
                    } else {
                        localStorage.removeItem('auth-token');
                        setAuth({ isAuthenticated: false, user: null });
                    }
                } catch (error) {
                    console.error("Token verification error:", error);
                    localStorage.removeItem('auth-token');
                    setAuth({ isAuthenticated: false, user: null });
                }
            }
        };
        verifyToken();
    }, [token]);

    // Decode token to get store ID
    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setStoreId(decodedToken.store.id);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [token]);




    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/allproducts');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };
        fetchProducts();
    }, []);

    // Filter products based on search term
    useEffect(() => {
        const filtered = searchTerm
            ? products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : products;
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    // Fetch cart items
    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:4000/getall/Cartproducts');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error.message);
        }
    };

    // Update cart items on component mount
    useEffect(() => {
        fetchCartItems();
    }, []);

    // Fetch all order details
    const getAllOrderDetails = async () => {
        try {
            const response = await axios.get('http://localhost:4000/fetch/graph');
            setGetAllOrders(response.data);
        } catch (error) {
            console.error("Fetching orders error:", error);
        }
    };

    useEffect(() => {
        getAllOrderDetails();
    }, []);

    // User login
    const login = (token, user) => {
        localStorage.setItem('auth-token', token);
        setAuth({ isAuthenticated: true, user });
    };

    // Fetch store name
    useEffect(() => {
        const fetchStoreName = async () => {
            if (storeId) {
                try {
                    const response = await axios.get(`http://localhost:4000/storename/${storeId}`);
                    if (response.data.success) {
                        setStoreName(response.data.store.name);
                    } else {
                        console.error("Error fetching store name");
                    }
                } catch (error) {
                    console.error("Error fetching store name:", error);
                }
            }
        };
        fetchStoreName();
    }, [storeId]);

    // User logout
    const logout = () => {
        localStorage.removeItem('auth-token');
        setAuth({ isAuthenticated: false, user: null });
        window.location.href = '/login';
    };

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Add product to the bill
    const billCart = async (productId, productName, productPrice, category, gst, reorderPoint, sku) => {
        try {
            const response = await axios.post('http://localhost:4000/addtobill', {
                productId,
                productName,
                productPrice,
                category,
                gst,
                reorderPoint,
                sku
            });
            console.log('Add to bill response:', response.data);
            fetchCartItems(); // Refresh cart items after adding
        } catch (error) {
            console.error('Error adding to bill:', error.message);
        }
    };
    

    return (
        <AppContext.Provider value={{
            auth,
            login,
            logout,
            products,
            setFilteredProducts,
            filteredProducts,
            searchTerm,
            handleSearchChange,
            billCart,
            cartItems,
            setCartItems,
            getAllOrders,
            storeId,
            storeName
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
