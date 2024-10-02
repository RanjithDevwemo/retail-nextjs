
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


import { GoHomeFill } from "react-icons/go";

export default function Filter() {
  return (
    <div>
     <div className="bg-blue-700 h-screen pl-5 flex justify-center rounded-3xl">
      <ul className="text-white font-bold flex gap-4 flex-col ">
        <li className="flex text-black"><GoHomeFill/> Home</li>
        <li>DashBoard</li>
        <li>Sales</li>
      </ul>
     </div>
    </div>
  )
}
