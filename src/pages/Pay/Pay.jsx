import React, { useRef, useState } from "react";
import QR from "./QR.png";
import { useDispatch, useSelector } from 'react-redux';
import {resetShipping} from '../Shipping/Shipping'
import { useEffect } from "react";
import { useAuth } from "../../features/Auth/AuthProvide";
import { resetTotal,resetItem } from "../Cart/CartSlice";
import { useNavigate } from "react-router-dom";
import PayCount from "../../features/Countdown/PayCount";
function Pay() {
  const cartItems = useSelector(state => state.cart.items);
  const shipping = useSelector(state => state.shipping.info)
  const totals = useSelector (state => state.cart.total)
  const [statuss, setStatuss] = useState("Pending")
  const [lastShippingAddress, setLastShippingAddress] = useState(null);
  const [last4, setLast4]  = useState('');
  const [date,setDate] = useState('')
  const image = useRef(null)
  const {uploadImage} = useAuth()

const utcDateString = "2024-03-06";
const utcDate = new Date(utcDateString);
const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' };
const localDateString = utcDate.toLocaleDateString('en-IN', options);

console.log(localDateString);

const navigate = useNavigate();


  useEffect(() => {
    // Set the last shipping address when the shipping info changes
    if (shipping.length > 0) {
      const lastAddress = shipping[shipping.length - 1];
      setLastShippingAddress(lastAddress);
    }
  }, [shipping]);

  const {uploadShipp} = useAuth()
  const dispatch = useDispatch()
  console.log("CART",cartItems);
  console.log("SHIP",shipping);
  console.log("TOTAL", totals);
  
  if (lastShippingAddress) {
    console.log("Last Shipping Address:", lastShippingAddress);
  }
  console.log(statuss);



  let titles = [];
  cartItems.forEach((item) => {
    titles.push(item.title);


  });
  
  let quantities = cartItems.map((item) => parseInt(item.quantity)).join(',');
  let Document_ID = cartItems.map((item) => (item.$id));



  //console.log("Titles:", titles);
  //console.log("quantities:", quantities);
  //console.log("Document_ID:", Document_ID);
  //console.log("T:", last4);
  





const  handleSubmit= async(e) => {
  e.preventDefault();
  setDate(localDateString)
  const fileInput = image.current.querySelector('input[type="file"]');
  const file = fileInput.files[0];
  try {
    //image 
    const fileId = await uploadImage(file);
    console.log("File ID: ", fileId);
    // Upload shipping 
    await uploadShipp({
      name:lastShippingAddress.name,
      phone:lastShippingAddress.phone,
      email:lastShippingAddress.email,
      add:lastShippingAddress.address,
      state:lastShippingAddress.state,
      pin:lastShippingAddress.pincode,
      id:lastShippingAddress.id,
      title:titles,
      quantity:quantities,
      Document_ID:Document_ID,
      status:statuss,
      total:totals,
      transaction:last4,
      date:date,
      ssKey:fileId
    });
    setLast4('')
}catch (error) {
    console.error(error);
  }

   
  } 
  // 1800000
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(resetShipping());
      dispatch(resetTotal());
      dispatch(resetItem());
      navigate('/')
    }, 1200000);
  
    return () => clearTimeout(timeoutId);
  }, [dispatch]);


  return (
    <form   onSubmit={handleSubmit} ref={image}
    className="w-full max-w-xs">
      <div className="flex justify-center items-center">
        <div className="w-1/2">
          <img src={QR} alt="Mobile" />
          <label
            className="block text-gray-700 text-sm font-bold mx-4"
            htmlFor="name"
          >
            UPI QR CODE OR PAY VIA MOBILE NO:- 900##09#47
          </label>
        </div>
        <div className="w-1/2">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Write Transaction Last 4 Digits
            </label>
            <input
              onChange={(e) => setLast4(e.target.value)}
              className="shadow appearance-none border rounded w-17 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              id="name"
              type="text"
              required
            />

          </div>
          <PayCount/>
        </div>
      </div>
      <label
        className="block text-gray-700 text-sm font-bold mb-1 my-6 mx-4"
        htmlFor="name"
      >
        Upload payment screenshot
      </label>
      <input className="py-2 mx-4" type="file" id="myFile" name="filename" />
      <div className="flex justify-center items-center py-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button
        </button>
      </div>
    </form>
  );
}

export default Pay;
