import Image from "./components/Image";
import SizeInputBox from "./components/SizeInputBox";
import MaterialSelections from "./components/MaterialSelections";
import { useState, useEffect } from "react";
import gsap from "gsap";

function App() {
  const [color, setColor] = useState("red");
  const [cmWidth, setCmWidth] = useState(50);
  const [cmHeight, setCmHeight] = useState(50);
  const [imageData, setImageData] = useState(null);

  const handleColor = (item) => {
    setColor(item);
  };
  const handleCmWidth = (w) => {
    setCmWidth(w);
  };
  const handleCmHeight = (h) => {
    setCmHeight(h);
  };
  const [image, setImage] = useState("../../red.png");
  const handleImageData = (x, y, pixelHeight, pixelWidth) => {
    setImageData({
      x,
      y,
      pixelHeight,
      pixelWidth,
    });
  };
  useEffect(() => {
    const handleImage = (color) => {
      switch (color) {
        case "red":
          setImage("../red.png");
          break;
        case "green":
          setImage("../green.png");
          break;
        case "blue":
          setImage("../blue.png");
          break;
        case "yellow":
          setImage("../yellow.png");
          break;
        case "orange":
          setImage("../orange.png");
          break;
      }
    };
    handleImage(color);
  }, [color]);

  const handleSubmit = () => {
    console.table({
      color: color,
      width: cmWidth + " cm",
      height: cmHeight + " cm",
      x: imageData.x,
      y: imageData.y,
      width_in_pixels: imageData.pixelWidth,
      height_in_pixels: imageData.pixelHeight,
    });
  };

  useEffect(() => {
    gsap.to(".container", {
      opacity: 1,
      x: 0,
    });
  });

  return (
    <section>
      <div className="h-screen flex flex-col items-center lg:flex-row lg:items-start lg:p-[5%]">
        <div className=" w-auto lg:w-[64%] px-2">
          <Image
            image={image}
            cmHeight={cmHeight}
            cmWidth={cmWidth}
            handleCmHeight={handleCmHeight}
            handleCmWidth={handleCmWidth}
            color={color}
            handleImageData={handleImageData}
          />
        </div>
        <div className="px-2 sm:w-[50%] lg:w-[32%] flex flex-col items-center py-[5%] mx-10 container opacity-0 translate-x-[100px]">
          <SizeInputBox
            cmHeight={cmHeight}
            cmWidth={cmWidth}
            handleCmHeight={handleCmHeight}
            handleCmWidth={handleCmWidth}
          />
          <MaterialSelections color={color} handleColor={handleColor} />
          <button
            className="bg-green-700 text-white text-[20px] py-3 px-5 rounded-xl self-start mt-5"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
