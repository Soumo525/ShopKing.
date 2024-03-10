import React, { useEffect, useState } from "react";
import { useAuth } from "../../features/Auth/AuthProvide";
import conf from "../../conf/conf";
import { storage } from "../../appwrite/appwrite";
import { useMediaQuery } from "react-responsive";
import Box from "../Box/Box";
import { Link } from "react-router-dom";
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';
import  "./style.css"
function PhoneCat() {
  const { getpost, post, imageList, image } = useAuth();

  useEffect(() => {
    getpost();
    imageList();
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0)
},[])

// Filter  for mobile devices
const [selectedFilters, setSelectedFilters] = useState([]);
const [filteredItems, setFilteredItems] = useState(post);
  
let filters = ["AnimeCover", "CoustomeCover",];
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
  setFilteredItems([...post]);
}, [post]);


const filterItems = () => {
  if (selectedFilters.length > 0) {
    let tempItems = selectedFilters.map((selectedCategory) => {
      let temp = post.filter((item) => item.subcategory === selectedCategory);
      return temp;
    });
    setFilteredItems(tempItems.flat());
  } else {
    setFilteredItems([...post]);
  }
};

  const isMobile = useMediaQuery({ maxWidth: 480 }); // Changed maxWidth to 480 for both 360 and 480

  return (
    <>
      <Box />

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



<br/>

      <div className="mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {filteredItems &&
          filteredItems.map((post, index) => (
            <Link to={`/view/${post.$id}`} key={index} className="rounded-md border flex flex-col w-full">
              {image &&
                image.map((img, i) => {
                  if (img.$id === post.imagekey) {
                    return (
                      <div
                        onClick={() => handleView(post)}
                        key={i}
                        className="aspect-w-16 aspect-h-9"
                      >
                        <img
                          src={storage.getFilePreview(
                            conf.appwriteBucketId,
                            img.$id
                          )}
                          alt="Product"
                          className="object-cover w-full h-full rounded-t-md"
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              <div className="p-4 flex-grow">
                <h1
                  className={`inline-flex items-center font-semibold ${
                    isMobile ? "text-sm" : "text-lg"
                  }`}
                  style={{ fontSize: isMobile ? "15px" : "18px" }}
                >
                  {post.title.length > 15 && isMobile
                    ? `${post.title.substring(0, 15)}..`
                    : post.title}
                </h1>
                {!isMobile && (
                  <p className="mt-3 text-sm text-gray-600">
                    {post.productDes}
                  </p>
                )}
                <div className="mt-5 flex items-center space-x-2">
                  <span className="block text-sm font-semibold">
                    RS: {post.price}
                  </span>
                </div>
                <Link to={`/view/${post.$id}`}>
                  {" "}
                  {/* Pass the selected value as a URL parameter */}
                  <button
                    type="button"
                    className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Product View
                  </button>
                </Link>
              </div>
            </Link>
          ))}
      </div>
      <div className="fixed bottom-4 right-4 z-50">
                <WhatsAppWidget phoneNumber="+919007209647" />
        </div>
    </>
  );
}

export default PhoneCat;
