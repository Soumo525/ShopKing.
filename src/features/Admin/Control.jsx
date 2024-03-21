import React, { useEffect } from "react";
import { useAuth } from "../Auth/AuthProvide";
import { useNavigate } from "react-router";
import { useState } from "react";

function Control() {
  const { getShipping, shipping } = useAuth();

  useEffect(() => {
    getShipping();
  }, []);
  const navi = useNavigate();
  const adminVerify = () => {
    navi("/admin/Verified");
  };

  // Filter  for mobile devices
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(shipping);

  let filters = ["Pending", "Successful"];
  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  useEffect(() => {
    setSelectedFilters([]);
    setFilteredItems([...shipping]);
  }, [shipping]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = shipping.filter((item) => item.status === selectedCategory);
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...shipping]);
    }
  };

  return (
    <>
      <div className="buttons-container">
        {filters.map((category, idx) => (
          <button
            onClick={() => handleFilterButtonClick(category)}
            className={`button ${
              selectedFilters?.includes(category) ? "active" : ""
            }`}
            key={`filters-${idx}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 min-h-screen">
        <div className="p-4">
          <div className="bg-white p-4 rounded-md">
            <h2 className="mb-4 text-xl font-bold text-gray-700">
              Shipping Control page
            </h2>
            <button
              onClick={adminVerify}
              type="button"
              className="text-white bg-blue-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Verified the Payment
            </button>

            
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="py-2 px-4">Id</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Phone</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">State</th>
                  <th className="py-2 px-4">Pin</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total</th>
                  <th className="py-2 px-4">Product Id</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems &&
                  filteredItems.map((item, i) => (
                    <tr key={i} className="text-sm font-normal">
                      <td className="py-2 px-4">{item.id}</td>
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4">{item.phone}</td>
                      <td className="py-2 px-4">{item.email}</td>
                      <td className="py-2 px-4">{item.add}</td>
                      <td className="py-2 px-4">{item.state}</td>
                      <td className="py-2 px-4">{item.pin}</td>
                      <td className="py-2 px-4">{item.status}</td>
                      <td className="py-2 px-4">{item.title.join(", ")}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">{item.total}</td>
                      <td className="py-2 px-4">
                        {item.Document_ID.join(", ")}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Control;
