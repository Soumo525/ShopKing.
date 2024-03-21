import React from 'react';
import { IoShirtOutline } from "react-icons/io5";
import { CiMobile3 } from "react-icons/ci";
import { TfiGift } from "react-icons/tfi";
import { Navigate, useNavigate } from 'react-router';
function Box() {
  const navigate = useNavigate()
  const handlePhone = () => {
    //console.log("Click");
    navigate('/tshirt');
  }
  const handleTshirt = () => {
    //console.log("Click");
    navigate('/phone');
  }
  const handleGift = () => {
    //console.log("Click");
    navigate('/gift');
  }
  return (
    <div className="flex justify-center">
      <div className="flex space-x-4">
        <div onClick={handlePhone}
        className="relative h-20 w-20 p-4 flex border-0 flex-col justify-center items-center hover:bg-gray-700">
          <IoShirtOutline size={30}  />
          <p>T-Shirt</p>
        </div>
        <div onClick={handleTshirt}
        className="relative h-20 w-20 p-4 flex border-0 flex-col justify-center items-center hover:bg-gray-700">
        <CiMobile3 size={30} />
        <p>Mobile</p>
        </div>
        <div onClick={handleGift}
        className="relative h-20 w-20 p-4 flex border-0 flex-col justify-center items-center hover:bg-gray-700">
          <TfiGift  size={30}  />
          <p>Gift </p>
        </div>
      </div>
    </div>
  );
}

export default Box;
