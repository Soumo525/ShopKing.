import React, { useEffect } from "react";
import { useAuth } from "../../features/Auth/AuthProvide";
import conf from "../../conf/conf";
import { storage } from "../../appwrite/appwrite";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
function TshirtC() {
  const { getTshirt, postTshirt, imageList, image } = useAuth();

  useEffect(() => {
    getTshirt();
    imageList();
  }, []);
  const isMobile = useMediaQuery({ maxWidth: 480 }); // Changed maxWidth to 480 for both 360 and 480

  return (
    <>
      <div className="mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {postTshirt &&
          postTshirt.slice(0, 4).map((post, index) => (
            <Link
              to={`/view/${post.$id}`}
              key={index}
              className="rounded-md border flex flex-col w-full"
            >
              {image &&
                image.map((img, i) => {
                  if (img.$id === post.imagekey) {
                    return (
                      <div
                        
                        key={i}
                        className="aspect-w-16 aspect-h-9"
                      >
                        <img
                          src={storage.getFilePreview(
                            conf.appwriteBucketId_1,
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
              </div>
            </Link>
          ))}
      </div>
      <Link to={`/tshirt`}>
        <div className="mt-4 text-center">
          <button className=" bg-black text-white rounded-sm px-4 py-2 text-sm font-semibold shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
            View More
          </button>
        </div>
      </Link>
    </>
  );
}

export default TshirtC;
