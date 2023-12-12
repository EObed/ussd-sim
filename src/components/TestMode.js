import React from "react";

const TestMode = () => {
  return (
    <div className="flex flex-col">
      <div className="w-[400px] h-[400px] border-[3px] p-2"></div>
      <div className="flex flex-col p-4 w-auto justify-between">
        <div> <input className="border-2 border-black text-black p-1 w-[350px] "/> </div>
         <div className="flex w-auto justify-between p-3">
          <button className="p-1 bg-blue-400 text-white h-[50px] w-[80px] rounded hover:bg-blue-800">
          Cancel
           </button>
          <button className="p-1 bg-blue-400 text-white h-[50px] w-[80px] rounded hover:bg-blue-800">
           Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestMode;
