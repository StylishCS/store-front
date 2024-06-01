import React from 'react'
import http from '../http'

function CartCard({data}) {
    function removeFromCart(id){
        http.DELETE(`/cart/${id}`)
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {
            alert("Something Went Wrong");
        })
    }
  return (
    <>
        <div className="rounded-lg md:w-2/3">
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src={data.prodId.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">{data.prodId.name}</h2>
              <p className="mt-1 text-xs text-gray-700">{data.sellPrice}</p>
            </div>
            <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                
                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={data.quantity} min="1" disabled/>
                
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">{data.sellPrice * data.quantity} EGP</p>
                <svg onClick={() => removeFromCart(data.prodId._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartCard