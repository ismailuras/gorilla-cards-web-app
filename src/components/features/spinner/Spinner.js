import React from "react";

function Spinner({ isLoading }) {
  return (
    <span
      className={`${
        isLoading
          ? "opacity-70 text-white"
          : "bg-indigo-600 text-white py-2 px-6 my-10 rounded hover:bg-indigo-700"
      }`}>
      Loading...
    </span>
  );
}

export default Spinner;
