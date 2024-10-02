
// export default function page() {
//   return (
//     <div>
//      <div className="bg-blue-700 h-screen pl-5 flex items-center ">
//       <ul className="text-white font-bold flex items-center gap-4 flex-col">
//         <li>Cloths :00</li>
//         <li>Electronics :00</li>
//         <li>Stationaries :00</li>
//         <li>Dry fruits :00</li>
//         <li>Tourist Bags :00</li>
//       </ul>
//      </div>
//     </div>
//   )
// }


// import { GoHomeFill } from "react-icons/go";

// export default function Filter() {
//   return (
//     <div>
//      <div className="bg-blue-700 h-screen pl-5 flex justify-center rounded-3xl">
//       <ul className="text-white font-bold flex gap-4 flex-col ">
//         <li className="flex text-black"><GoHomeFill/> Home</li>
//         <li>DashBoard</li>
//         <li>Sales</li>
//       </ul>
//      </div>
//     </div>
//   )
// }






export default function page() {
  return (
    <div className="flex flex-col bg-light-gray h-screen w-full">
      <div className="pb-10">
      <h1 className="text-2xl font-bold">Admin Dash Board</h1>
      </div>
      <div className="flex items-center justify-start gap-x-20">
        <div className="bg-white p-3 rounded-xl">
          <h3>Product Details</h3>
         <ul className="flex text-red-600 gap-4">
          <li>Low items</li>
          <li>00</li>
         </ul>
         <ul className="flex text-orange-600 gap-4">
          <li>Category</li>
          <li>00</li>
         </ul>
         <ul className="flex text-green-600 gap-4">
          <li>All items</li>
          <li>00</li>
         </ul>
        </div>

        <div className="bg-white p-3 rounded-xl">
          <h3>Product Details</h3>
         <ul className="flex text-red-600  gap-4">
          <li>Low items</li>
          <li>00</li>
         </ul>
         <ul className="flex text-orange-600 gap-4">
          <li>Category</li>
          <li>00</li>
         </ul>
         <ul className="flex text-green-600 gap-4">
          <li>All items</li>
          <li>00</li>
         </ul>
        </div>

        <div className="bg-white p-3 rounded-xl">
          <h3>Product Details</h3>
         <ul className="flex text-red-600 gap-4">
          <li>Low items</li>
          <li>00</li>
         </ul>
         <ul className="flex text-orange-600 gap-4">
          <li>Category</li>
          <li>00</li>
         </ul>
         <ul className="flex text-green-600 gap-4">
          <li>All items</li>
          <li>00</li>
         </ul>
        </div>
      </div>
    </div>
  )
}

