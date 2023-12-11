import React from "react";

const TestMode = () => {
  return (
    <div className="flex flex-col">
      <div></div>
      <div className="flex">
        <input />
        <button className="p-1 bg-blue-400 text-white h-[50px] w-[80px] rounded hover:bg-blue-800">
          Submit
        </button>
      </div>
    </div>
  );
};

export default TestMode;
