import React from "react";
import SizeInputBoxChild from "./SizeInputBoxChild";

const SizeInputBox = ({
  circles,
  handleChangeInput,
  sharedParentDimensions,
}) => {
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
      <ul>
        {circles.map((circle, index) => (
          <SizeInputBoxChild
            key={index}
            circle={circle}
            index={index}
            handleChangeInput={handleChangeInput}
            sharedParentDimensions={sharedParentDimensions}
          />
        ))}
      </ul>

      <hr className="h-[2px] bg-green-700 mt-5" />
    </div>
  );
};

export default SizeInputBox;
