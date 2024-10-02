// // // // 'use client'
// // // // import { Line } from "react-chartjs-2";
// // // // import {
// // // //     Chart as ChartJs,
// // // //     LineElement,
// // // //     CategoryScale,
// // // //     LinearScale,
// // // //     PointElement,
// // // //     Legend,
// // // //     Tooltip,
// // // //     Filler // Import Filler plugin
// // // // } from 'chart.js';

// // // // import { useState, useEffect} from "react";
// // // // import { useAppContext } from "@/app/Context";

// // // // ChartJs.register(
// // // //     LineElement,
// // // //     CategoryScale,
// // // //     LinearScale,
// // // //     PointElement,
// // // //     Legend,
// // // //     Tooltip,
// // // //     Filler // Register Filler plugin
// // // // );

// // // // export default function Graph() {
// // // //     const { getAllOrders } = useAppContext();
// // // //     const [data, setData] = useState({
// // // //         labels: [],
// // // //         datasets: [
// // // //             {
// // // //                 label: "Sales Over Time",
// // // //                 data: [],
// // // //                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
// // // //                 borderColor: 'rgba(255, 99, 132, 1)',
// // // //                 pointBorderColor: 'blue',
// // // //                 fill: true,
// // // //                 tension: 0.5
// // // //             }
// // // //         ]
// // // //     });

// // // //     const fetchAndProcessData = (filterFunction) => {
// // // //         if (!getAllOrders || !getAllOrders.message) return;

// // // //         const filteredData = getAllOrders.message.filter(filterFunction);
// // // //         processOrders(filteredData);
// // // //     };

// // // //     const processOrders = (orders) => {
// // // //         const totalValuesPerDay = {};

// // // //         orders.forEach(order => {
// // // //             const date = new Date(order.createdAt).toISOString().split('T')[0];
// // // //             totalValuesPerDay[date] = (totalValuesPerDay[date] || 0) + order.totalValue;
// // // //         });

// // // //         const labels = Object.keys(totalValuesPerDay);
// // // //         const dataPoints = Object.values(totalValuesPerDay);

// // // //         setData({
// // // //             labels,
// // // //             datasets: [{
// // // //                 label: "Sales Over Time",
// // // //                 data: dataPoints,
// // // //                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
// // // //                 borderColor: 'rgba(255, 99, 132, 1)',
// // // //                 pointBorderColor: 'green',
// // // //                 fill: true,
// // // //                 tension: 0.5
// // // //             }]
// // // //         });
// // // //     };

// // // //     useEffect(() => {
// // // //         if (getAllOrders) {
// // // //             processOrders(getAllOrders.message);
// // // //         }
// // // //     }, [getAllOrders]);

// // // //     const lastMonthFilter = (order) => {
// // // //         const last30Days = new Date();
// // // //         last30Days.setDate(last30Days.getDate() - 30);
// // // //         return new Date(order.createdAt) >= last30Days;
// // // //     };

// // // //     const lastWeekFilter = (order) => {
// // // //         const last7Days = new Date();
// // // //         last7Days.setDate(last7Days.getDate() - 7);
// // // //         return new Date(order.createdAt) >= last7Days;
// // // //     };

// // // //     const options = {
// // // //         plugins: {
// // // //             legend: {
// // // //                 display: true
// // // //             }
// // // //         },
// // // //         scales: {
// // // //             y: {
// // // //                 beginAtZero: true,
// // // //                 suggestedMax: Math.max(...data.datasets[0].data) || 100
// // // //             }
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div>
// // // //             <h2>
// // // //                 <button onClick={() => fetchAndProcessData(() => true)}>All Values</button>
// // // //                 <button onClick={() => fetchAndProcessData(lastMonthFilter)}>Last 30 Days</button>
// // // //                 <button onClick={() => fetchAndProcessData(lastWeekFilter)}>Last 7 Days</button>
// // // //             </h2>
// // // //             <h1>This is a Demo Chart</h1>
// // // //             <div style={{ height: 300, width: 600 }}>
// // // //                 <Line data={data} options={options} />
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }








// // // 'use client';
// // // import { Line } from "react-chartjs-2";
// // // import {
// // //     Chart as ChartJs,
// // //     LineElement,
// // //     CategoryScale,
// // //     LinearScale,
// // //     PointElement,
// // //     Legend,
// // //     Tooltip,
// // //     Filler
// // // } from 'chart.js';
// // // import { useState, useEffect, useRef } from "react";
// // // import { useAppContext } from "@/app/Context";

// // // ChartJs.register(
// // //     LineElement,
// // //     CategoryScale,
// // //     LinearScale,
// // //     PointElement,
// // //     Legend,
// // //     Tooltip,
// // //     Filler
// // // );

// // // export default function Graph() {
// // //     const { getAllOrders } = useAppContext();
// // //     const [data, setData] = useState({
// // //         labels: [],
// // //         datasets: [
// // //             {
// // //                 label: "Sales Over Time",
// // //                 data: [],
// // //                 backgroundColor: 'rgba(255, 99, 132, 0.5)', // Fallback for non-gradient
// // //                 borderColor: 'rgba(255, 99, 132, 1)',
// // //                 pointBorderColor: 'blue', // Set point border color to blue
// // //                 pointBackgroundColor: 'white', // Optional: set background color of points
// // //                 pointRadius: 6, // Increase point size
// // //                 pointHoverRadius: 8, // Increase size on hover
// // //                 fill: true,
// // //                 tension: 0.5
// // //             }
// // //         ]
// // //     });

// // //     const canvasRef = useRef(null);

// // //     const createGradient = (ctx, chartArea) => {
// // //         const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
// // //         gradient.addColorStop(0, 'rgba(80,112,248,255)'); // Start color
// // //         gradient.addColorStop(1, 'rgba(183,196,252,255)'); // End color
// // //         return gradient;
// // //     };

// // //     const fetchAndProcessData = (filterFunction) => {
// // //         if (!getAllOrders || !getAllOrders.message) return;

// // //         const filteredData = getAllOrders.message.filter(filterFunction);
// // //         processOrders(filteredData);
// // //     };

// // //     const processOrders = (orders) => {
// // //         const totalValuesPerDay = {};

// // //         orders.forEach(order => {
// // //             const date = new Date(order.createdAt).toISOString().split('T')[0];
// // //             totalValuesPerDay[date] = (totalValuesPerDay[date] || 0) + order.totalValue;
// // //         });

// // //         const labels = Object.keys(totalValuesPerDay);
// // //         const dataPoints = Object.values(totalValuesPerDay);

// // //         setData({
// // //             labels,
// // //             datasets: [{
// // //                 label: "Sales Over Time",
// // //                 data: dataPoints,
// // //                 backgroundColor: createGradient(canvasRef.current.getContext('2d'), { top: 0, bottom: 300 }),
// // //                 borderColor: 'rgba(80,112,248,255)',
// // //                 pointBorderColor: 'blue', // Set point border color to blue
// // //                 pointBackgroundColor: 'white', // Optional: set background color of points
// // //                 pointRadius: 6, // Increase point size
// // //                 pointHoverRadius: 8, // Increase size on hover
// // //                 fill: true,
// // //                 tension: 0.5
// // //             }]
// // //         });
// // //     };

// // //     useEffect(() => {
// // //         if (getAllOrders) {
// // //             processOrders(getAllOrders.message);
// // //         }
// // //     }, [getAllOrders]);

// // //     const lastMonthFilter = (order) => {
// // //         const last30Days = new Date();
// // //         last30Days.setDate(last30Days.getDate() - 30);
// // //         return new Date(order.createdAt) >= last30Days;
// // //     };

// // //     const lastWeekFilter = (order) => {
// // //         const last7Days = new Date();
// // //         last7Days.setDate(last7Days.getDate() - 7);
// // //         return new Date(order.createdAt) >= last7Days;
// // //     };

// // //     const options = {
// // //         plugins: {
// // //             legend: {
// // //                 display: true
// // //             }
// // //         },
// // //         scales: {
// // //             y: {
// // //                 beginAtZero: true,
// // //                 suggestedMax: Math.max(...data.datasets[0].data) || 100
// // //             }
// // //         }
// // //     };

// // //     return (
// // //         <div>
// // //             <h2>
// // //                 <button onClick={() => fetchAndProcessData(() => true)}>All Values</button>
// // //                 <button onClick={() => fetchAndProcessData(lastMonthFilter)}>Last 30 Days</button>
// // //                 <button onClick={() => fetchAndProcessData(lastWeekFilter)}>Last 7 Days</button>
// // //             </h2>
// // //             <h1>This is a Demo Chart</h1>
// // //             <div style={{ height: 300, width: 600 }}>
// // //                 <canvas ref={canvasRef} />
// // //                 <Line data={data} options={options} />
// // //             </div>
// // //         </div>
// // //     );
// // // }



// // 'use client';
// // import { Line } from "react-chartjs-2";
// // import {
// //     Chart as ChartJs,
// //     LineElement,
// //     CategoryScale,
// //     LinearScale,
// //     PointElement,
// //     Legend,
// //     Tooltip,
// //     Filler
// // } from 'chart.js';
// // import { useState, useEffect, useRef } from "react";
// // import { useAppContext } from "@/app/Context";

// // ChartJs.register(
// //     LineElement,
// //     CategoryScale,
// //     LinearScale,
// //     PointElement,
// //     Legend,
// //     Tooltip,
// //     Filler
// // );

// // export default function Graph() {
// //     const { getAllOrders } = useAppContext();
// //     const [data, setData] = useState({
// //         labels: [],
// //         datasets: [
// //             {
// //                 label: "Sales Over Time",
// //                 data: [],
// //                 backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fallback for non-gradient
// //                 borderColor: 'rgba(119,144,250,255)',
// //                 pointBorderColor: 'blue', // Set point border color to blue
// //                 pointBackgroundColor: 'white', // Optional: set background color of points
// //                 pointRadius: 6, // Increase point size
// //                 pointHoverRadius: 8, // Increase size on hover
// //                 borderWidth: 2, // Increase point border width
// //                 fill: true,
// //                 tension: 0.5
// //             }
// //         ]
// //     });
    
// //     const canvasRef = useRef(null);

// //     const createGradient = (ctx, chartArea) => {
// //         const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
// //         gradient.addColorStop(0, 'rgba(226,231,254,255)'); 
// //         gradient.addColorStop(0.5, 'rgba(166,182,252,255)'); 
// //         gradient.addColorStop(1, 'rgba(116,141,250,255)');

// //         return gradient;
// //     };

// //     const fetchAndProcessData = (filterFunction) => {
// //         if (!getAllOrders || !getAllOrders.message) return;

// //         const filteredData = getAllOrders.message.filter(filterFunction);
// //         processOrders(filteredData);
// //     };

// //     const processOrders = (orders) => {
// //         const totalValuesPerDay = {};

// //         orders.forEach(order => {
// //             const date = new Date(order.createdAt).toISOString().split('T')[0];
// //             totalValuesPerDay[date] = (totalValuesPerDay[date] || 0) + order.totalValue;
// //         });

// //         const labels = Object.keys(totalValuesPerDay);
// //         const dataPoints = Object.values(totalValuesPerDay);

// //         setData({
// //             labels,
// //             datasets: [{
// //                 label: "Sales Over Time",
// //                 data: dataPoints,
// //                 backgroundColor: createGradient(canvasRef.current.getContext('2d'), { top: 0, bottom: 300 }),
// //                 borderColor: 'rgba(119,144,250,255)',
// //                 pointBorderColor: 'blue', 
// //                 pointBackgroundColor: 'white',
// //                 pointRadius: 6,
// //                 pointHoverRadius: 8, 
// //                 borderWidth: 2,
// //                 fill: true,
// //                 tension: 0.5
// //             }]
// //         });
// //     };

// //     useEffect(() => {
// //         if (getAllOrders) {
// //             processOrders(getAllOrders.message);
// //         }
// //     }, [getAllOrders]);

// //     const lastMonthFilter = (order) => {
// //         const last30Days = new Date();
// //         last30Days.setDate(last30Days.getDate() - 30);
// //         return new Date(order.createdAt) >= last30Days;
// //     };

// //     const lastWeekFilter = (order) => {
// //         const last7Days = new Date();
// //         last7Days.setDate(last7Days.getDate() - 7);
// //         return new Date(order.createdAt) >= last7Days;
// //     };

// //     const options = {
// //         plugins: {
// //             legend: {
// //                 display: true
// //             }
// //         },
// //         scales: {
// //             y: {
// //                 beginAtZero: true,
// //                 suggestedMax: Math.max(...data.datasets[0].data) || 100
// //             }
// //         }
// //     };

// //     return (
// //         <div>
// //             <h2>
// //                 <button onClick={() => fetchAndProcessData(() => true)}>All Values</button>
// //                 <button onClick={() => fetchAndProcessData(lastMonthFilter)}>Last 30 Days</button>
// //                 <button onClick={() => fetchAndProcessData(lastWeekFilter)}>Last 7 Days</button>
// //             </h2>
// //             <h1>This is a Demo Chart</h1>
// //             <div style={{ height: 300, width: 600 }}>
// //                 <canvas ref={canvasRef} />
// //                 <Line data={data} options={options} />
// //             </div>
// //         </div>
// //     );
// // }


// 'use client';
// import { Line } from "react-chartjs-2";
// import {
//     Chart as ChartJs,
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Legend,
//     Tooltip,
//     Filler
// } from 'chart.js';
// import { useState, useEffect, useRef } from "react";
// import { useAppContext } from "@/app/Context";

// ChartJs.register(
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Legend,
//     Tooltip,
//     Filler
// );

// export default function Graph() {
//     const { getAllOrders } = useAppContext();
//     const [data, setData] = useState({
//         labels: [],
//         datasets: [
//             {
//                 label: "Sales Over Time",
//                 data: [],
//                 backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fallback for non-gradient
//                 borderColor: 'rgba(119,144,250,255)',
//                 pointBorderColor: 'blue',
//                 pointBackgroundColor: 'white',
//                 pointRadius: 6,
//                 pointHoverRadius: 8,
//                 borderWidth: 2,
//                 fill: true,
//                 tension: 0.5
//             }
//         ]
//     });

//     const canvasRef = useRef(null);

//     const createGradient = (ctx, chartArea) => {
//         const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
//         gradient.addColorStop(0, 'rgba(226,231,254,255)');
//         gradient.addColorStop(0.5, 'rgba(166,182,252,255)');
//         gradient.addColorStop(1, 'rgba(116,141,250,255)');
//         return gradient;
//     };

//     const fetchAndProcessData = (filterFunction) => {
//         if (!getAllOrders || !getAllOrders.message) return;

//         const filteredData = getAllOrders.message.filter(filterFunction);
//         processOrders(filteredData);
//     };

//     const processOrders = (orders) => {
//         const totalValuesPerDay = {};

//         orders.forEach(order => {
//             const date = new Date(order.createdAt).toISOString().split('T')[0];
//             totalValuesPerDay[date] = (totalValuesPerDay[date] || 0) + order.totalValue;
//         });

//         const labels = Object.keys(totalValuesPerDay);
//         const dataPoints = Object.values(totalValuesPerDay);

//         setData({
//             labels,
//             datasets: [{
//                 label: "Sales Over Time",
//                 data: dataPoints,
//                 backgroundColor: createGradient(canvasRef.current.getContext('2d'), { top: 0, bottom: 300 }),
//                 borderColor: 'rgba(119,144,250,255)',
//                 pointBorderColor: 'blue',
//                 pointBackgroundColor: 'white',
//                 pointRadius: 6,
//                 pointHoverRadius: 8,
//                 borderWidth: 2,
//                 fill: true,
//                 tension: 0.5
//             }]
//         });
//     };

//     useEffect(() => {
//         if (getAllOrders) {
//             processOrders(getAllOrders.message);
//         }
//     }, [getAllOrders]);

//     const lastMonthFilter = (order) => {
//         const last30Days = new Date();
//         last30Days.setDate(last30Days.getDate() - 30);
//         return new Date(order.createdAt) >= last30Days;
//     };

//     const lastWeekFilter = (order) => {
//         const last7Days = new Date();
//         last7Days.setDate(last7Days.getDate() - 7);
//         return new Date(order.createdAt) >= last7Days;
//     };

//     const options = {
//         plugins: {
//             legend: {
//                 display: true
//             }
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 suggestedMax: Math.max(...data.datasets[0].data) || 100
//             }
//         }
//     };

//     return (
//         <div className="p-4 h-3/4 w-3/4">
//             <h2 className="mb-2">
//                 <button onClick={() => fetchAndProcessData(() => true)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">All Values</button>
//                 <button onClick={() => fetchAndProcessData(lastMonthFilter)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Last 30 Days</button>
//                 <button onClick={() => fetchAndProcessData(lastWeekFilter)} className="px-4 py-2 bg-blue-500 text-white rounded">Last 7 Days</button>
//             </h2>
//             <h1 className="text-lg font-semibold mb-4">This is a Demo Chart</h1>
//             <div className="flex justify-center mb-4">
//                 <div className="relative" style={{ height: '250px', width: '400px' }}>
//                     <canvas ref={canvasRef} />
//                 </div>
//             </div>
//             <Line data={data} options={options} />
//         </div>
//     );
// }




// 'use client';
// import { Line } from "react-chartjs-2";
// import {
//     Chart as ChartJs,
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Legend,
//     Tooltip,
//     Filler
// } from 'chart.js';
// import { useState, useEffect, useRef } from "react";
// import { useAppContext } from "@/app/Context";

// ChartJs.register(
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Legend,
//     Tooltip,
//     Filler
// );

// export default function Graph() {
//     const { getAllOrders } = useAppContext();
//     const [data, setData] = useState({
//         labels: [],
//         datasets: [
//             {
//                 label: "Sales Over Time",
//                 data: [],
//                 backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fallback for non-gradient
//                 borderColor: 'rgba(119,144,250,255)',
//                 pointBorderColor: 'blue',
//                 pointBackgroundColor: 'white',
//                 pointRadius: 6,
//                 pointHoverRadius: 8,
//                 borderWidth: 2,
//                 fill: true,
//                 tension: 0.5
//             }
//         ]
//     });

//     const canvasRef = useRef(null);

//     const createGradient = (ctx, chartArea) => {
//         const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
//         gradient.addColorStop(0, 'rgba(226,231,254,255)');
//         gradient.addColorStop(0.5, 'rgba(166,182,252,255)');
//         gradient.addColorStop(1, 'rgba(116,141,250,255)');
//         return gradient;
//     };

//     const fetchAndProcessData = (filterFunction) => {
//         if (!getAllOrders || !getAllOrders.message) return;

//         const filteredData = getAllOrders.message.filter(filterFunction);
//         processOrders(filteredData);
//     };

//     const processOrders = (orders) => {
//         const totalValuesPerDay = {};

//         orders.forEach(order => {
//             const date = new Date(order.createdAt).toISOString().split('T')[0];
//             totalValuesPerDay[date] = (totalValuesPerDay[date] || 0) + order.totalValue;
//         });

//         const labels = Object.keys(totalValuesPerDay);
//         const dataPoints = Object.values(totalValuesPerDay);

//         setData({
//             labels,
//             datasets: [{
//                 label: "Sales Over Time",
//                 data: dataPoints,
//                 backgroundColor: createGradient(canvasRef.current.getContext('2d'), { top: 0, bottom: 300 }),
//                 borderColor: 'rgba(119,144,250,255)',
//                 pointBorderColor: 'blue',
//                 pointBackgroundColor: 'white',
//                 pointRadius: 6,
//                 pointHoverRadius: 8,
//                 borderWidth: 2,
//                 fill: true,
//                 tension: 0.5
//             }]
//         });
//     };

//     useEffect(() => {
//         if (getAllOrders) {
//             processOrders(getAllOrders.message);
//         }
//     }, [getAllOrders]);

//     const lastMonthFilter = (order) => {
//         const last30Days = new Date();
//         last30Days.setDate(last30Days.getDate() - 30);
//         return new Date(order.createdAt) >= last30Days;
//     };

//     const lastWeekFilter = (order) => {
//         const last7Days = new Date();
//         last7Days.setDate(last7Days.getDate() - 7);
//         return new Date(order.createdAt) >= last7Days;
//     };

//     const options = {
//         plugins: {
//             legend: {
//                 display: true
//             }
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 suggestedMax: Math.max(...data.datasets[0].data) || 100
//             }
//         }
//     };

//     return (
//         <div className="p-4 max-w-4xl mx-auto flex items-center justify-center flex-col">
//             <h2 className="mb-2">
//                 <button onClick={() => fetchAndProcessData(() => true)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">All Values</button>
//                 <button onClick={() => fetchAndProcessData(lastMonthFilter)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Last 30 Days</button>
//                 <button onClick={() => fetchAndProcessData(lastWeekFilter)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Last 7 Days</button>
//             </h2>
//             <h1 className="text-lg font-semibold mb-4">This is a Demo Chart</h1>
//             <div className="flex justify-center mb-4 ">
//                 <div className="relative b" style={{ height: '250px', width: '100%', maxWidth: '400px' }}>
//                     <canvas ref={canvasRef} />

//                 </div>
//             <Line data={data} options={options}  />
//             </div>
//         </div>
//     );
// }




'use client';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJs,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler
} from 'chart.js';
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/app/Context";

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler
);

export default function Graph() {
    const { getAllOrders } = useAppContext();
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Sales Over Time",
                data: [],
                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fallback for non-gradient
                borderColor: 'rgba(119,144,250,255)',
                pointBorderColor: 'blue',
                pointBackgroundColor: 'white',
                pointRadius: 6,
                pointHoverRadius: 8,
                borderWidth: 2,
                fill: true,
                tension: 0.5
            }
        ]
    });

    const canvasRef = useRef(null);

    const createGradient = (ctx, chartArea) => {
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(226,231,254,255)');
        gradient.addColorStop(0.5, 'rgba(166,182,252,255)');
        gradient.addColorStop(1, 'rgba(116,141,250,255)');
        return gradient;
    };

    const fetchAndProcessData = (filterFunction) => {
        if (!getAllOrders || !getAllOrders.message) return;

        const filteredData = getAllOrders.message.filter(filterFunction);
        processOrders(filteredData);
    };

    const processOrders = (orders) => {
        const totalValuesPerDay = {};

        orders.forEach(order => {
            const date = new Date(order.createdAt).toISOString().split('T')[0];
            totalValuesPerDay[date] = (totalValuesPerDay[date] || 0) + order.totalValue;
        });

        const labels = Object.keys(totalValuesPerDay);
        const dataPoints = Object.values(totalValuesPerDay);

        setData({
            labels,
            datasets: [{
                label: "Sales Over Time",
                data: dataPoints,
                backgroundColor: createGradient(canvasRef.current.getContext('2d'), { top: 0, bottom: 300 }),
                borderColor: 'rgba(119,144,250,255)',
                pointBorderColor: 'blue',
                pointBackgroundColor: 'white',
                pointRadius: 6,
                pointHoverRadius: 8,
                borderWidth: 2,
                fill: true,
                tension: 0.5
            }]
        });
    };

    useEffect(() => {
        if (getAllOrders) {
            processOrders(getAllOrders.message);
        }
    }, [getAllOrders]);

    const lastMonthFilter = (order) => {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        return new Date(order.createdAt) >= last30Days;
    };

    const lastWeekFilter = (order) => {
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
        return new Date(order.createdAt) >= last7Days;
    };

    const options = {
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: Math.max(...data.datasets[0].data) || 100
            }
        }
    };

    return (
        // <div className="p-4 max-w-4xl mx-auto flex items-center justify-center flex-col">
        //     <h2 className="mb-2 flex flex-wrap justify-center">
        //         <button onClick={() => fetchAndProcessData(() => true)} className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">All Values</button>
        //         <button onClick={() => fetchAndProcessData(lastMonthFilter)} className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Last 30 Days</button>
        //         <button onClick={() => fetchAndProcessData(lastWeekFilter)} className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Last 7 Days</button>
        //     </h2>
        //     <h1 className="text-lg font-semibold mb-2">This is a Demo Chart</h1>
        //     <div className="flex justify-center mb-4 w-full">
        //         <div className="relative" style={{ height: '250px', minWidth: '200px', width: '100%', maxWidth: '400px' }}>
        //             <canvas ref={canvasRef} />
        //         </div>
        //     <Line data={data} options={options} />

        //     </div>
        // </div>
        <div className="p-4 max-w-4xl mx-auto flex items-center justify-center flex-col">
    <h2 className="mb-2 flex flex-wrap justify-center w-full">
        <button 
            onClick={() => fetchAndProcessData(() => true)} 
            className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
        >
            All Values
        </button>
        <button 
            onClick={() => fetchAndProcessData(lastMonthFilter)} 
            className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
        >
            Last 30 Days
        </button>
        <button 
            onClick={() => fetchAndProcessData(lastWeekFilter)} 
            className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
        >
            Last 7 Days
        </button>
    </h2>
    <h1 className="text-lg font-semibold mb-2 text-center w-full">This is a Demo Chart</h1>
    <div className="flex justify-center mb-4 w-full">
        <div 
            className="relative" 
            style={{ height: '250px', minWidth: '200px', maxWidth: '400px', width: '100%' }}
        >
            <canvas ref={canvasRef} />
        </div>
        <Line data={data} options={options} />
    </div>
</div>

    );
}
