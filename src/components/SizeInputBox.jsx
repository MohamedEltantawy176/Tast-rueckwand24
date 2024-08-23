import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const SizeInputBox = ({ cmHeight, cmWidth, handleCmHeight, handleCmWidth }) => {
  const [bufferWidth, setBufferWidth] = useState(cmWidth);
  const [bufferHeight, setBufferHeight] = useState(cmHeight);
  const handleCmHeightChange = (e) => {
    setBufferHeight(e.target.value);
    if (e.target.value <= 300 && e.target.value >= 10) {
      handleCmHeight(e.target.value);
    }
  };

  const handleCmWidthChange = (e) => {
    setBufferWidth(e.target.value);
    if (e.target.value <= 900 && e.target.value >= 10) {
      handleCmWidth(e.target.value);
    }
  };
  useEffect(() => {
    setBufferHeight(cmHeight);
    setBufferWidth(cmWidth);
  }, [cmHeight, cmWidth]);
  return (
    <div className="flex flex-col mb-5 w-[100%]">
      <h3 className="text-left">
        <span className="bg-green-700 text-white px-2 mr-1 text-center rounded">
          1
        </span>
        Wähle Deine Maße
      </h3>
      <a href="#" className="text-gray-500 hover:text-black">
        Wie findest Du die richtigen Maße?
      </a>
      <div>
        <div className="flex p-5 items-center border rounded-lg my-5">
          <div className="w-[50%]">
            <div className="flex justify-between text-[10px] ">
              <span>Breite</span>
              <span className="text-gray-500">10 - 900 cm</span>
            </div>
            <div className="flex w-[100%] border rounded-lg h-10 items-center overflow-hidden">
              <input
                type="text"
                className="text-center w-[80%] border-r outline-none h-[100%] 
                "
                value={bufferWidth ? bufferWidth : cmWidth}
                onChange={handleCmWidthChange}
              />
              <span className="text-center px-2">cm</span>
            </div>
            <div>
              {bufferWidth <= 900 && bufferWidth >= 10 ? (
                <p className="text-center text-[12px] text-gray-500">
                  {bufferWidth * 10 + " mm"}
                </p>
              ) : (
                <p className="text-center text-[12px] text-red-600">
                  falsche Bereite !
                </p>
              )}
            </div>
          </div>
          <span className="px-2 pb-[5px]"> x </span>
          <div className="w-[50%]">
            <div className="flex justify-between text-[10px]">
              <span>Höhe</span>
              <span className="text-gray-500">10 - 300 cm</span>
            </div>
            <div className="flex w-[100%] border rounded-lg h-10 items-center overflow-hidden">
              <input
                type="text"
                className="text-center w-[80%] border-r outline-none h-[100%] 
                "
                value={bufferHeight ? bufferHeight : cmHeight}
                onChange={handleCmHeightChange}
              />
              <span className="text-center px-2"> cm </span>
            </div>
            <div>
              {bufferHeight <= 300 && bufferHeight >= 10 ? (
                <p className="text-center text-[12px] text-gray-500">
                  {bufferHeight * 10 + " mm"}
                </p>
              ) : (
                <p className="text-center text-[12px] text-red-600">
                  falsche Höhe !
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="h-[2px] bg-green-700 mt-5" />
    </div>
  );
};

export default SizeInputBox;
