
  
// pages/index.js
import { MdOutlineArrowDropDown } from "react-icons/md";

export default function Product1() {
  return (
    <div className="p-5">
      <div className="flex justify-center gap-4 pb-5">
        <div className="bg-blue-600 flex justify-center items-center rounded-xl flex-col text-white p-3 w-full max-w-xs" style={{height:'145', width:'250'}}>
          <h1 className=" text-base  font-bold">Total Products</h1>
          <h1 className="text-2xl font-semibold">00</h1>
        </div>
        <div className="bg-blue-600 flex justify-center items-center flex-col text-white p-3 w-full max-w-xs rounded-xl" style={{height:'145', width:'250'}}>
          <h1 className="text-base font-bold">Total Categories</h1>
          <h1 className="text-2xl font-semibold">00</h1>
        </div>
        <div className="bg-blue-600 flex justify-center items-center flex-col text-white p-3 rounded-xl w-full max-w-xs"style={{height:'145', width:'250'}}>
          <h1 className="text-base font-bold">Products</h1>
          <div className="flex justify-center gap-4">
            <span className="block text-sm rounded-2xl bg-white text-blue-600 p-1 font-bold">In Stock</span>
            <span className="block text-sm rounded-2xl bg-slate-200 text-slate-500 p-1 font-bold">Out of Stock</span>
          </div>
          <h1 className="text-2xl font-semibold">00</h1>
        </div>
        
        <button className="bg-blue-600 text-white rounded-lg flex items-center justify-center pl-3 pr-3 mt-20 font-semibold" style={{ height: '40px', width: 'auto' }}>
          Filter <MdOutlineArrowDropDown/>
        </button>

      </div>

      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr className="flex justify-between gap-2">
            <th className="bg-blue-400 flex items-center justify-center rounded p-3 font-bold flex-1">Product Name</th>
            <th className="bg-blue-400 flex items-center justify-center rounded p-3 font-bold flex-1">Product Price</th>
            <th className="bg-blue-400 flex items-center justify-center rounded p-3 font-bold flex-1">No. Of Stock</th>
            <th className="bg-blue-400 flex items-center justify-center rounded p-3 font-bold flex-1">In Stock / Out Stock</th>
            <th className="bg-blue-400 flex items-center justify-center rounded p-3 font-bold flex-1">SKU</th>
          </tr>
        </thead>
        <tbody className="flex flex-col">
          <tr className="flex justify-between bg-white border-b flex-1 text-center">
            <td className="flex-1 p-3">Product Name 1</td>
            <td className="flex-1 p-3">00</td>
            <td className="flex-1 p-3">00</td>
            <td className="flex-1 p-3 text-red-500">Out Stock</td>
            <td className="flex-1 p-3">453231</td>
          </tr>
          <tr className="flex justify-between bg-white border-b flex-1 text-center">
            <td className="flex-1 p-3">Product Name 2</td>
            <td className="flex-1 p-3">100</td>
            <td className="flex-1 p-3">100</td>
            <td className="flex-1 p-3 text-green-500">In Stock</td>
            <td className="flex-1 p-3">3042093</td>
          </tr>
          <tr className="flex justify-between bg-white border-b flex-1 text-center">
            <td className="flex-1 p-3">Product Name 1</td>
            <td className="flex-1 p-3">00</td>
            <td className="flex-1 p-3">00</td>
            <td className="flex-1 p-3 text-red-500">Out Stock</td>
            <td className="flex-1 p-3">453231</td>
          </tr>
          <tr className="flex justify-between bg-white border-b flex-1 text-center">
            <td className="flex-1 p-3">Product Name 2</td>
            <td className="flex-1 p-3">100</td>
            <td className="flex-1 p-3">100</td>
            <td className="flex-1 p-3 text-green-500">In Stock</td>
            <td className="flex-1 p-3">3042093</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
