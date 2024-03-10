import React, { useState, useEffect } from 'react';
import { useAuth } from "../Auth/AuthProvide";
import { storage } from "../../appwrite/appwrite";
import conf from "../../conf/conf";
import { RiDeleteBin6Line } from "react-icons/ri";
function AdminProduct() {
    const [search, setSearch] = useState("");
    const { imageList, getAllData, allData, image, deleteOneItem } = useAuth();
    const [data, setData] = useState(allData)

    useEffect(() => {
        getAllData();
        imageList();
    }, []);

    const deleteHandler = async(itemID) =>{
      console.log("deleteHandler", itemID);
      deleteOneItem(itemID)
      setData(allData.filter(item => item.$id !== itemID));
    }

    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                <div className="p-4">
                    <div className="bg-white p-4 rounded-md">
                        <form className="max-w-md mx-auto">
                            <label
                                htmlFor="default-search"
                                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="search"
                                    id="default-search"
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search by Id..."
                                    required
                                />
                            </div>
                        </form>
                        <h2 className="mb-4 text-xl font-bold text-gray-700">
                            Product Control page
                        </h2>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white">
                                <tr>
                                    <th className="py-2 px-4">Document_ID</th>
                                    <th className="py-2 px-4">Title</th>
                                    <th className="py-2 px-4">Category</th>
                                    <th className="py-2 px-4">Subcategory</th>
                                    <th className="py-2 px-4">Price</th>
                                    <th className="py-2 px-4">Image</th>
                                    <th className="py-2 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data  &&
                                  data
                                      .filter((i) => (search === "" ? i : i.$id.includes(search)))
                                        .map((item, i) => (
                                            <tr key={i} className="text-sm font-normal">
                                                <td className="py-2 px-4">{item.$id}</td>
                                                <td className="py-2 px-4">{item.title}</td>
                                                <td className="py-2 px-4">{item.category}</td>
                                                <td className="py-2 px-4">{item.subcategory}</td>
                                                <td className="py-2 px-4">{item.price}</td>
                                                <td className="py-2 px-4">
                                                 {
                                                  image && image.map((i,m) => {
                                                    if(i.$id === item.imagekey)  
                                                    {
                                                      const imgData = storage.getFilePreview(conf.appwriteBucketId, i.$id)
                                                      let url = imgData.href
                                                      return (
                                                        <a key={m}
                                                        href= {url}
                                                        target="_blank"> Image Link</a>
                                                      )
                                                    }
                                                    
                                                  })
                                                 }
                                                
                                                </td>
                                                <td className="py-2 px-4">
                                                 <RiDeleteBin6Line 
                                                 onClick={()=> deleteHandler(item.$id)}
                                                 size={20} />
                                                 </td>
                                            </tr>
                                        ))
                                }
                             
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminProduct;
