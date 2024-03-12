import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
const SuccessPage = () => {
  
  const handleDownloadReceipt = () => {
    // Create a Blob object representing the data as a file
    const data = 'Invoice data here';
    const blob = new Blob([data], { type: 'text/plain' });

    // Create a link element to trigger the download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'invoice.txt');
    document.body.appendChild(link);
    link.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg p-12 shadow-md text-center">
        <div className="bg-gray-200 rounded-full h-32 w-32 flex items-center justify-center mx-auto mb-6">
          <i className="text-green-500 text-6xl">✓</i>
        </div>
        <h1 className="text-green-500 font-bold text-4xl mb-2">Success</h1>
        <p className="text-gray-700 text-lg">We received your purchase request;<br/> we'll be in touch shortly!</p>
        <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded mt-4">Continue Shopping</button>
        <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleDownloadReceipt}>Download Receipt</button>
      </div>
    </div>
  );
}

export default SuccessPage;
