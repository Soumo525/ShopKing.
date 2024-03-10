import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthProvide";
import { storage } from "../../appwrite/appwrite";
import conf from "../../conf/conf";

function Verified() {
  const { getShipping, shipping, updatepay, image, imageList } = useAuth();

  const [data, setData] = useState("Pending");
  const [search, setSarch] = useState("");

  useEffect(() => {
    getShipping();
    imageList();
  }, []);

  const handleUpdate = async (updateId) => {
    try {
      const document = await updatepay(updateId, { status: data });
      console.log("Update");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4">
        <div className="bg-white p-4 rounded-md">
          <form className="max-w-md mx-auto">
            <label
              for="default-search"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => setSarch(e.target.value)}
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by Id..."
                required
              />
            </div>
          </form>

          <h2 className="mb-4 text-xl font-bold text-gray-700">
            Shipping Control Pay page
          </h2>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="py-2 px-4">Id</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Transaction ID</th>
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {shipping &&
                shipping
                  .filter((i) => {
                    return search === "" ? i : i.id.toString().includes(search);
                  })
                  .map((item, index) => (
                    <tr key={item.id} className="text-sm font-normal">
                      <td className="py-2 px-4">{item.id}</td>
                      <td className="py-2 px-4">{item.date}</td>
                      <td className="py-2 px-4">
                        <select
                          onChange={(e) => {
                            setData(e.target.value);
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Successful">Successful</option>
                        </select>
                      </td>
                      <td className="py-2 px-4">{item.transaction}</td>
                      <td className="py-2 px-4">
                        {image &&
                          image.map((i) => {
                            if (i.$id === item.ssKey) {
                              const imgData = storage.getFilePreview(
                                conf.appwriteBucketId,
                                i.$id
                              );
                              let url = imgData.href;
                              return (
                                <a href={url} target="_blank">
                                  {" "}
                                  Image Link
                                </a>
                              );
                            }
                          })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          onClick={() => {
                            handleUpdate(item.$id);
                          }}
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Verified;
