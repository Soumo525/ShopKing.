import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useNavigate } from "react-router-dom";
import {resetShipping} from '../Shipping/Shipping'
import { resetTotal,resetItem } from "../Cart/CartSlice";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const SuccessPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totals = useSelector((state) => state.cart.total);
  const shipping = useSelector((state) => state.shipping.info);
  const dispatch = useDispatch()
  const Continue = () => {
    navigate('/')
      dispatch(resetShipping());
      dispatch(resetTotal());
      dispatch(resetItem());
  }
  const generatePDF = () => {
    const documentDefinition = {
      content: [
        { text: 'INVOICE', style: 'inv' },
        { text: 'ShopKing', style: 'companyName' },
        { text: 'Dhulagori,Howrah,711302', style: 'address' },
        { text: 'ShopKing@gmail.com', style: 'email' },
        { text: '+91 7980236947', style: 'email' },
        { text: 'Receipt', style: 'header' },
        { text: `OrderID : ${shipping.map((i) => i.id)}`, style: 'orderId' },
        { text: 'Items:', style: 'subheader' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['TITLE', 'QTY', 'UNIT PRICE', 'AMOUNT'],
              ...cartItems.map((item) => [
                item.title,
                item.quantity,
                item.price,
                item.quantity * item.price, // Calculate amount for each item
              ]),
            ],
          },
        },
        { text: `Total With GST(18%) : ${totals}`, style: 'total' },
      ],
      styles: {
        inv: {
          fontSize: 25,
          color: '#002b80',
          bold: true,
          margin: [0, 0, 0, 10],
        },
        companyName: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        address: {
          fontSize: 14,
          margin: [0, 0, 0, 10],
        },
        email: {
          fontSize: 14,
          margin: [0, 0, 0, 10],
        },
        header: {
          fontSize: 24,
          bold: true,
          margin: [0, 20, 0, 10],
        },
        orderId: {
          fontSize: 18,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        total: {
          fontSize: 12,
          bold: true,
          margin: [360, 10, 0, 5],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download('receipt.pdf');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg p-12 shadow-md text-center">
        <div className="bg-gray-200 rounded-full h-32 w-32 flex items-center justify-center mx-auto mb-6">
          <i className="text-green-500 text-6xl">✓</i>
        </div>
        <h1 className="text-green-500 font-bold text-4xl mb-2">Success</h1>
        <p className="text-gray-700 text-lg">
          We received your purchase request;<br/> we'll be in touch shortly!
        </p>
        <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded mt-4 " onClick={Continue}>Continue Shopping</button>
        <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={generatePDF}>Download Receipt</button>
      </div>
    </div>
  );
};

export default SuccessPage;

