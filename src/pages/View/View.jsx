import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to access URL parameters
import { useAuth } from "../../features/Auth/AuthProvide";
import { storage } from "../../appwrite/appwrite";
import conf from "../../conf/conf";
import { useDispatch } from "react-redux";
import { addItem } from "../Cart/CartSlice";
import SkeletonLoading from "../../features/SkeletonLoading/SkeletonLoading";

function View() {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [num, setNum] = useState(1);
  const {
    getpost,
    post,
    image,
    imageList,
    getTshirt,
    postTshirt,
    getGift,
    gift,
  } = useAuth();
  //const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await getpost();
      await getTshirt();
      await getGift();
      await imageList();
      setLoading(false);
    }
    fetchData();
  }, []);
  const incrementNum = () => {
    if (num < 5) {
      setNum(num + 1);
    }
  };

  const decrementNum = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };

  const handleChange = (e) => {
    setNum(e.target.value);
  };

  const navigate = useNavigate();
  const handleAddToCart = (item) => {
    const itemWithQuantity = { ...item, quantity: num };
    dispatch(addItem(itemWithQuantity));
    navigate("/cartitem");
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <>
          {post &&
            post.map((p, i) => {
              if (p.$id === id) {
                return (
                  <section className="overflow-hidden">
                    <div key={i} className="mx-auto max-w-5xl px-5 py-24">
                      <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
                        {image &&
                          image.map((img, i) => {
                            if (img.$id === p.imagekey) {
                              return (
                                <img
                                  key={i}
                                  alt="Nike Air Max 21A"
                                  className="h-50 w-50 rounded object-cover lg:h-full lg:w-1/2"
                                  src={storage.getFilePreview(
                                    conf.appwriteBucketId,
                                    img.$id
                                  )}
                                />
                              );
                            }
                            return null;
                          })}
                        <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                          <h1 className="my-4 text-3xl font-semibold text-black">
                            {p.title}
                          </h1>
                          <div className="my-4 flex items-center">
                            <span className="flex items-center space-x-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <span className="ml-3 inline-block text-xs font-semibold">
                                4 Reviews
                              </span>
                            </span>
                          </div>
                          <p className="leading-relaxed">{p.content}</p>
                          <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
                            <div className="flex items-center">
                              <span className="mr-3 text-sm font-semibold">
                                Category
                              </span>
                              <span className="mr-3 text-sm font-semibold">
                                {p.subcategory}
                              </span>
                            </div>
                            <div className="ml-auto flex items-center">
                              <span className="mr-3 text-sm font-semibold">
                                Size
                              </span>
                              <div className="box-border h-10 w-32 p-4 border-2 rounded-md  flex items-center">
                                <button
                                  onClick={decrementNum}
                                  className="text-center w-10 h-10 border-[#bfbfbf] text-xl"
                                >
                                  -
                                </button>
                                <input
                                  type="readOnly"
                                  value={num}
                                  onChange={handleChange}
                                  className="w-10 text-center border-l border-r border-[#bfbfbf] outline-none text-sm"
                                />
                                <button
                                  onClick={incrementNum}
                                  className="text-center w-10 h-10 border-[#bfbfbf] text-xl"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="title-font text-xl font-bold text-gray-900">
                              {p.price}
                            </span>
                            <button
                              onClick={() => handleAddToCart(p)}
                              type="button"
                              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              }
              return null;
            })}

            {postTshirt &&
              postTshirt.map((p, i) => {
              if (p.$id === id) {
                return (
                  <section className="overflow-hidden">
                    <div key={i} className="mx-auto max-w-5xl px-5 py-24">
                      <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
                        {image &&
                          image.map((img, i) => {
                            if (img.$id === p.imagekey) {
                              return (
                                <img
                                  key={i}
                                  alt="Nike Air Max 21A"
                                  className="h-50 w-50 rounded object-cover lg:h-full lg:w-1/2"
                                  src={storage.getFilePreview(
                                    conf.appwriteBucketId,
                                    img.$id
                                  )}
                                />
                              );
                            }
                            return null;
                          })}
                        <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                          <h1 className="my-4 text-3xl font-semibold text-black">
                            {p.title}
                          </h1>
                          <div className="my-4 flex items-center">
                            <span className="flex items-center space-x-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <span className="ml-3 inline-block text-xs font-semibold">
                                4 Reviews
                              </span>
                            </span>
                          </div>
                          <p className="leading-relaxed">{p.content}</p>
                          <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
                            <div className="flex items-center">
                              <span className="mr-3 text-sm font-semibold">
                                Category
                              </span>
                              <span className="mr-3 text-sm font-semibold">
                                {p.subcategory}
                              </span>
                            </div>
                            <div className="ml-auto flex items-center">
                              <span className="mr-3 text-sm font-semibold">
                                Size
                              </span>
                              <div className="box-border h-10 w-32 p-4 border-2 rounded-md  flex items-center">
                                <button
                                  onClick={decrementNum}
                                  className="text-center w-10 h-10 border-[#bfbfbf] text-xl"
                                >
                                  -
                                </button>
                                <input
                                  type="readOnly"
                                  value={num}
                                  onChange={handleChange}
                                  className="w-10 text-center border-l border-r border-[#bfbfbf] outline-none text-sm"
                                />
                                <button
                                  onClick={incrementNum}
                                  className="text-center w-10 h-10 border-[#bfbfbf] text-xl"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="title-font text-xl font-bold text-gray-900">
                              {p.price}
                            </span>
                            <button
                              onClick={() => handleAddToCart(p)}
                              type="button"
                              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              }
              return null;
            })}

            {gift &&
              gift.map((p, i) => {
              if (p.$id === id) {
                return (
                  <section className="overflow-hidden">
                    <div key={i} className="mx-auto max-w-5xl px-5 py-24">
                      <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
                        {image &&
                          image.map((img, i) => {
                            if (img.$id === p.imagekey) {
                              return (
                                <img
                                  key={i}
                                  alt="Nike Air Max 21A"
                                  className="h-50 w-50 rounded object-cover lg:h-full lg:w-1/2"
                                  src={storage.getFilePreview(
                                    conf.appwriteBucketId,
                                    img.$id
                                  )}
                                />
                              );
                            }
                            return null;
                          })}
                        <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                          <h1 className="my-4 text-3xl font-semibold text-black">
                            {p.title}
                          </h1>
                          <div className="my-4 flex items-center">
                            <span className="flex items-center space-x-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <span className="ml-3 inline-block text-xs font-semibold">
                                4 Reviews
                              </span>
                            </span>
                          </div>
                          <p className="leading-relaxed">{p.content}</p>
                          <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
                            <div className="flex items-center">
                              <span className="mr-3 text-sm font-semibold">
                                Category
                              </span>
                              <span className="mr-3 text-sm font-semibold">
                                {p.subcategory}
                              </span>
                            </div>
                            <div className="ml-auto flex items-center">
                              <span className="mr-3 text-sm font-semibold">
                                Size
                              </span>
                              <div className="box-border h-10 w-32 p-4 border-2 rounded-md  flex items-center">
                                <button
                                  onClick={decrementNum}
                                  className="text-center w-10 h-10 border-[#bfbfbf] text-xl"
                                >
                                  -
                                </button>
                                <input
                                  type="readOnly"
                                  value={num}
                                  onChange={handleChange}
                                  className="w-10 text-center border-l border-r border-[#bfbfbf] outline-none text-sm"
                                />
                                <button
                                  onClick={incrementNum}
                                  className="text-center w-10 h-10 border-[#bfbfbf] text-xl"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="title-font text-xl font-bold text-gray-900">
                              {p.price}
                            </span>
                            <button
                              onClick={() => handleAddToCart(p)}
                              type="button"
                              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              }
              return null;
            })}
        </>
      )}
    </>
  );
}

export default View;
