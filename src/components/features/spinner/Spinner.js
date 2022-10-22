import React from "react";

function Spinner({ loading }) {
  return (
    <span className="opacity-70 text-white bg-indigo-600 py-2 px-6 my-10 rounded hover:bg-indigo-700">
      Loading...
    </span>
  );
}

export default Spinner;
