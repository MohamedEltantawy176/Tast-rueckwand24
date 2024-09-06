import React from "react";
import { useState, useEffect } from "react";

const SizeInputBoxChild = ({
  sharedParentDimensions,
  circle,
  index,
  handleChangeInput,
}) => {
  const [wrongX, setWrongX] = useState(circle.x);
  const [wrongY, setWrongY] = useState(circle.y);

  useEffect(() => {
    setWrongX(circle.x);
    setWrongY(circle.y);
  }, [circle]);
  return (
    <li>
      <div>
        <div className="flex p-5 items-center border rounded-lg my-5">
          <div className="self-center">
            <div className="flex w-[100%] border rounded-lg h-10 items-center overflow-hidden">
              <input
                type="text"
                className="text-center w-[80%] border-r outline-none h-[100%]
                "
                value={Math.floor(wrongX)}
                onChange={(e) =>
                  e.target.value > sharedParentDimensions.width ||
                  e.target.value < 10
                    ? setWrongX(e.target.value)
                    : handleChangeInput(index, "x", e.target.value) &&
                      setWrongX(e.target.value)
                }
              />
              <span className="text-center px-2">px</span>
            </div>
            <div>
              {wrongX <= sharedParentDimensions.width && wrongX >= 10 ? (
                <p className="text-center text-[12px] text-gray-500">
                  y = {Math.floor(wrongX)} px
                </p>
              ) : (
                <p className="text-center text-[12px] text-red-600">
                  falsche X!
                </p>
              )}
            </div>
          </div>
          <span className="px-2 pb-[20px]"> x </span>
          <div>
            <div className="flex justify-between text-[10px]"></div>
            <div className="flex w-[100%] border rounded-lg h-10 items-center overflow-hidden">
              <input
                type="text"
                className="text-center w-[80%] border-r outline-none h-[100%]
                "
                value={Math.floor(wrongY)}
                onChange={(e) =>
                  e.target.value > sharedParentDimensions.height ||
                  e.target.value < 10
                    ? setWrongY(e.target.value)
                    : handleChangeInput(index, "y", e.target.value) &&
                      setWrongY(e.target.value)
                }
              />
              <span className="text-center px-2"> px </span>
            </div>
            <div>
              {wrongY <= sharedParentDimensions.height && wrongY >= 10 ? (
                <p className="text-center text-[12px] text-gray-500">
                  y = {Math.floor(wrongY)} px
                </p>
              ) : (
                <p className="text-center text-[12px] text-red-600">
                  falsche Y !
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SizeInputBoxChild;
