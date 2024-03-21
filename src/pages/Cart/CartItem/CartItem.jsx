import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../features/Auth/AuthProvide';
import { storage } from '../../../appwrite/appwrite';
import conf from '../../../conf/conf';
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeItem, setTotal } from '../CartSlice';
import { useNavigate } from 'react-router-dom';
function CartItem() {
  const cartItems = useSelector(state => state.cart.items);
  const { imageList, image } = useAuth();
  const dispatch = useDispatch(); 
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigateTo = useNavigate();



  
  const {getCoupon,couponold} = useAuth()

  useEffect(() => {
    getCoupon()
  },[])
  
  
  const applyCoupon = () => {
    console.log("click");
    //console.log(couponold);
    if (couponold.length > 0) {
      const value = couponold[0].couponCodeAll;
      if (couponCode === value) {
        setDiscount(0.1); // Apply 10% discount
      }
    }
  };

useEffect(() => {
  if (cartItems.length === 0) {
    navigateTo('/')
   
  }
},[])

  useEffect(() => {
    imageList();
  }, []);

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem({ id: itemId }));
  };

  useEffect(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const gst = subtotal * 0.18;
  }, [cartItems]);
  const final = Math.round(cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0) * (1 - discount) + (cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0) * 0.18)).toFixed(2)
  dispatch(setTotal(final));
  
  // shipping
  const handleShipping = () =>{
    navigateTo('/cartitem/Shipping')
  } 

  useEffect (() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.map((item,i) => (
          <div key={i} className="flex justify-between mb-4">
            {image && image.map((img) => {
              if (item.imagekey === img.$id) {
                return (
                 <>
                  <div key={img.$id} className="flex items-center">
                    <img
                      src={storage.getFilePreview(conf.appwriteBucketId_1, img.$id)}
                      alt="Product Image"
                      className="mr-4"
                      style={{ maxWidth: '50px', maxHeight: '50px' }} // Adjust the values as needed
                    />
                  </div>
                  {/* <div key={i} className="flex items-center">
                    <img
                      src={item.imageData}
                      alt="your Image"
                      className="mr-4"
                      style={{ maxWidth: '50px', maxHeight: '50px' }} // Adjust the values as needed
                    />
                  </div> */}
                  </>
                )
              }
              return null;
            })}
            <div>
              <h3 className="font-bold" style={{ fontSize: '12px', marginTop: '15px' }}>{item.title}</h3>
            </div>

            <div className="flex items-center">
             
            <span className="font-bold px-5" style={{ fontSize: '14px' }}>
                {item.quantity }
              </span> 
              <button className="text-red-500 hover:text-red-700" 
              onClick={() => handleRemoveItem(item.$id)}>
                <RiDeleteBin6Line />
              </button>

              
            
              
              <span className="font-bold px-2" style={{ fontSize: '14px' }}>
                Rs:{((item.quantity * item.price)).toFixed(2)}
              </span> {/* Calculate total price after discount */}
            </div>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between items-center">
          <span className="font-bold">Subtotal:</span>
          <span className="font-bold">
            Rs: {cartItems.reduce((acc, item) => acc + (item.quantity * item.price)  , 0).toFixed(2)}
          </span> {/* Calculate subtotal */}
        </div>
        <div className="flex justify-between items-center mt-4">
          <span>GST (18%):</span>
          <span>Rs: {(cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0) * 0.18).toFixed(2)}</span> {/* Calculate GST */}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between items-center">
          <span className="font-bold">Total (incl. GST):</span>
          <span className="font-bold">
            Rs: {Math.round(cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)  + (cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0) * 0.18))}
          </span> {/* Calculate total including GST */}
        </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Total (After Discount):</span>
            <span className="font-bold">
              Rs: {Math.round(cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0) * (1 - discount) + (cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0) * 0.18)).toFixed(2)}
            </span>
            {/* Total (After Discount): */}
          </div>
        <div className="flex justify-center mt-6">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ fontSize: '14px' }} onClick={applyCoupon}>
            Apply Coupon
          </button>
          {/* Use this button to apply the coupon */}
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={handleShipping}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
