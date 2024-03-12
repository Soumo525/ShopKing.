import React, { useEffect, useState } from "react";
import { useAuth } from "../../features/Auth/AuthProvide";
import { useNavigate } from "react-router";
import { storage } from "../../appwrite/appwrite";
import conf from "../../conf/conf";
import AliceCarousel from "react-alice-carousel";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

export default function PhoneDis() {
  const { getpost, post, image, imageList } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getpost();
    imageList();
  }, []);
  const responsive = {
    0: { items: 1 },
    360: { items: 2 }, // Change the breakpoint to 640 to target mobile view and show 2 items per slide
    1024: { items: 3 },
  };
  const isMobile = useMediaQuery({ maxWidth: 360 && 480 });
  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="carousel-container">
          <AliceCarousel
            mouseTracking
            responsive={responsive}
            autoPlayInterval={5000}
            autoPlayDirection="lrt"
            autoPlay
            infinite
          >
            {post &&
              post.map((post, index) => (
                <Link to={`/view/${post.$id}`} key={index} className="rounded-md border flex flex-col w-full">
                  {image &&
                    image.map((img, i) => {
                      if (img.$id === post.imagekey) {
                        return (
                          <div key={i} className="aspect-w-16 aspect-h-9">
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
                    {/* <h1 className={`inline-flex items-center font-semibold ${isMobile ? 'text-sm' : 'text-lg'}`} style={{ fontSize: isMobile ? '15px' : '18px' }}>
                  {post.productTitle.length > 15 && isMobile ? `${post.productTitle.substring(0, 15)}..` : post.productTitle}
                </h1> */}

                    <h1 className="inline-flex items-center text-lg font-semibold">
                      {post.title}
                    </h1>
                    {/* Hide description in mobile view */}
                    {/* {!isMobile && (
                      <p className="mt-3 text-sm text-gray-600">
                        {post.content}
                      </p>
                    )} */}
                    {/* <div className="mt-5 flex items-center space-x-2">
                    <span className="block text-sm font-semibold">
                     Category: {post.category}
                    </span>
                  </div> */}
                    {/* <div className="mt-2 flex items-center space-x-2">
                    <span className="block text-sm font-semibold">
                    Sub Category: {post.subcategory}
                    </span>
                  </div> */}
                    {/* <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      {/* Additional rating stars */}
                    {/* </div>  */}

                    <div className="mt-5 flex items-center space-x-2">
                      <span className="block text-sm font-semibold">
                        RS. {post.price}
                      </span>
                    </div>
                    {/* <button
                      type="button"
                      className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Add Cart
                    </button> */}
                  </div>
                </Link>
              ))}
          </AliceCarousel>
        </div>
      </div>
    </>
  );
}
