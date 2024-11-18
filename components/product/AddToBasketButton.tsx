"use client";

import { Product } from "@/sanity.types";
import useBasketStore from "@/store/store";
import React, { useEffect, useState } from "react";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);

  // Use useEffect to set isClient to true after component mounts
  // This ensures that the component only renders on the client-side,
  // preventing hydration errors due to server/client mismatch
  // Example written below this snippet

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
          itemCount === 0
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        disabled={itemCount === 0 || disabled}
      >
        <span
          className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}
        >
          -
        </span>
      </button>
      <span className="w-8 text-center font-semibold">{itemCount}</span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={disabled}
      >
        <span className="text-xl font-bold text-white">+</span>
      </button>
    </div>
  );
}

export default AddToBasketButton;

// Preventing Hydration Errors with useEffect

// 	•	Hydration Error: Occurs when server-rendered HTML doesn’t match the client DOM.
// 	•	Solution: Use isClient state and useEffect to control client-side rendering.

// Steps:

// 	1.	Initialize isClient as false.
// 	2.	Use useEffect to set isClient to true after mounting.
// 	3.	Render a placeholder (e.g., null) on the server, full content on the client.

// Example:

// import { useState, useEffect } from 'react';

// const ClientOnly = () => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => setIsClient(true), []);

//   return isClient ? <div>Client content</div> : null;
// };

// export default ClientOnly;
