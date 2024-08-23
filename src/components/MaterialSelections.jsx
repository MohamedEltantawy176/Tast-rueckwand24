import React from "react";
import { useState, useEffect } from "react";

const MaterialSelections = ({ color, handleColor }) => {
  const [active, setActive] = useState(0);

  const menuItems = ["red", "green", "blue", "yellow", "orange"];
  const handleActive = (index) => {
    setActive(index);
  };
  const handleColorText = (color) => {
    switch (color) {
      case "red":
        return (
          <div className="p-5 border rounded-lg my-5">
            <h3>When in doubt, wear red.</h3>
            <p className="text-gray-500">
              Red is a bold and confident color that can make a statement in any
              situation.
            </p>
          </div>
        );
      case "green":
        return (
          <div className="p-5 border rounded-lg my-5">
            <h3>
              Green is the prime color of the world, and that from which its
              loveliness arises.
            </h3>
            <p className="text-gray-500">
              Green symbolizes nature, growth, and renewal.
            </p>
          </div>
        );
      case "blue":
        return (
          <div className="p-5 border rounded-lg my-5">
            <h3>
              Let the blue sky meet the blue sea, and all is blue for a time.
            </h3>
            <p className="text-gray-500">
              Blue embodies calmness, serenity, and the boundless connection
              between nature and tranquility.
            </p>
          </div>
        );
      case "yellow":
        return (
          <div className="p-5 border rounded-lg my-5">
            <h3>How wonderful yellow is. It stands for the sun</h3>
            <p className="text-gray-500">
              Yellow represents warmth, optimism, and the brightness of life.
            </p>
          </div>
        );
      case "orange":
        return (
          <div className="p-5 border rounded-lg my-5">
            <h3>Orange is the happiest color.</h3>
            <p className="text-gray-500">
              The color orange is often associated with energy and enthusiasm.
            </p>
          </div>
        );
    }
  };
  const [colorText, setColorText] = useState();
  useEffect(() => {
    setColorText(() => handleColorText(color));
  }, [color]);
  return (
    <div className="flex flex-col mb-5 items-start w-[100%] ">
      <h3 className="text-left">
        <span className="bg-green-700 text-white px-2 mr-1 text-center rounded">
          2
        </span>
        Wähle Deine Material
      </h3>
      <a href="#" className="text-gray-500 hover:text-black block">
        Welches Material ist das richtige für Dich?
      </a>
      <div className="flex flex-col justify-center">
        {colorText}
        <ul className="flex gap-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={
                active === index
                  ? "active material_container"
                  : "material_container"
              }
            >
              <li
                className="material_color"
                style={{
                  backgroundColor:
                    item === "red"
                      ? "#a84b3a"
                      : item === "green"
                      ? "#0e6129"
                      : item === "blue"
                      ? "#0065a3"
                      : item === "yellow"
                      ? "#fffe70"
                      : "#ff7d01",
                }}
                onClick={() => {
                  handleActive(index);
                  handleColor(item);
                }}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MaterialSelections;
