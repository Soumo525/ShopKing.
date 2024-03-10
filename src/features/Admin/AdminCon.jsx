import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../Auth/AuthProvide';

function AdminCon() {
  const { adminLogout,addToDatabse,user,uploadImage } = useAuth();
  const [category, setCategory] = useState('T-Shirt');
  const [subCategory, setSubCategory] = useState('AnimeTshirt');
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('');
  const [price, setPrice] = useState(0);
  const img = useRef(null)
  const handleSubmit = async(e) => {
     e.preventDefault();
     const fileInput = img.current.querySelector('input[type="file"]');
     const file = fileInput.files[0];



     if (user) {
      try{
        const fileId = await uploadImage(file);
        console.log("File ID: ", fileId);
        await addToDatabse({ title,content,category,subcategory:subCategory, price, imagekey: fileId});
      }
     catch(error) {
      console.error(error);
     }
     setCategory('')
     setSubCategory('')
     setTitle('')
     setContent('')
     setPrice(0)

    }
  }
 
  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory('');
  }
  // console.log(category);
  // console.log(subCategory);
  // console.log(title);
  // console.log(content);
  // console.log(price);
  const navi = useNavigate ()
  const adminCoupon = ()=>{
    navi('/admin/control/coupon')
  }

  const adminShipping = () => {
    navi('/admin/control/shipping')
  }

  const adminProduct = () => {
    navi('/admin/productcontrol')
  }
  return (
    <div className="min-h-screen flex justify-center dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-xl font-bold text-center mb-4 dark:text-gray-200">
          Welcome to  the Admin page
        </h1>
        <button
          onClick={adminLogout}
          type="button"
          className="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Logout
        </button>
        <button
          onClick={adminCoupon}
          type="button"
          className="text-white bg-blue-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Coupon
        </button>
        <button
          onClick={adminShipping}
          type="button"
          className="text-white bg-blue-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Shipping
        </button>
        <button
          onClick={adminProduct}
          type="button"
          className="text-white bg-blue-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Product
        </button>
      <form onSubmit={handleSubmit} ref={img} >
        <div className="flex flex-col gap-6 w-72">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
             onChange={(e) => setTitle(e.target.value)}
              placeholder="Product Title"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            <label className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Product Title
            </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
            onChange={(e) => setContent(e.target.value)}
              placeholder="Product Description"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            <label className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Product Description
            </label>
          </div>

          <div className="relative h-11 w-full min-w-[200px]">
            <select
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              <option value="Tshirt">T-Shirt</option>
              <option value="Mobile">Mobile</option>
              <option value="Gift">Gift</option>
            </select>
          </div>

          {category && (
            <div className={`relative h-11 w-full min-w-[200px] ${category && 'sub-category show'}`}>
              <select
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="">Select Sub Category</option>
                {category === 'Tshirt' && (
                  <>
                    <option value="AnimeTshirt">AnimeTshirt</option>
                    <option value="CustomizedTShirts">Customized T-Shirts</option>
                  </>
                )}
                {category === 'Mobile' && (
                   <>
                   <option value="AnimeCover">AnimeCover</option>
                    <option value="CoustomeCover">CoustomeCover</option>
                   </>
                )}
                {category === 'Gift' && (
                  <>
                    <option value="PhotoFrame">PhotoFrame</option>
                    <option value="CoustomeGift">CoustomeGift</option>
                  </>
                )}
              </select>
            </div>
          )}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Product Price 500"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            <label className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Product Price
            </label>
          </div>
          <input type="file" id="myFile" name="filename"/>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      Submit
    </button> 
        </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCon;
