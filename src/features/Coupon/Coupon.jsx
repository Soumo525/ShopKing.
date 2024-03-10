import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthProvide";


function Coupon() {
  const [Newcoupon, setNewCoupon] = useState("");
  const { updateCoupon, getCoupon, couponold } = useAuth();
  const [id, setId] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    //console.log(Newcoupon);


    await updateCoupon(id,{couponCodeAll: Newcoupon}) 

    setNewCoupon('');
  }

  const handleInputChange = (e) => {
    setNewCoupon(e.target.value);
  }

  useEffect(() => {
    getCoupon();
  }, [])

  useEffect(() => {
    if (couponold && couponold.length > 0) {
      const itemIds = couponold.map(i => i.$id);
      setId(itemIds.join(', '));
    }
  }, [couponold])

  //console.log("Id",id);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 w-72 py-8 mx-5">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              value={Newcoupon}
              onChange={handleInputChange}
              placeholder="Select a coupon"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            <label className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select a coupon
            </label>
          </div>
        </div>
   
        <button 
          type="submit"
          className="mx-5 my-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default Coupon;
