import Image from "./components/Image";
import SizeInputBox from "./components/SizeInputBox";
import MaterialSelections from "./components/MaterialSelections";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

function App() {
  const [color, setColor] = useState("red");
  const [imageData, setImageData] = useState(null);
  const [circles, setCircles] = useState([]);
  const [sharedParentDimensions, setSharedParentDimensions] = useState();

  const imageCanvas = useRef(null);

  const handleChildRef = (node) => {
    if (node) {
      imageCanvas.current = node;
    }
  };

  const handleColor = (item) => {
    setColor(item);
  };
  const handleChangeInput = (index, field, value) => {
    const updatedCircles = [...circles];
    updatedCircles[index] = constrainCirclePosition({
      ...updatedCircles[index],
      [field]: value,
    });
    if (!areCirclesColliding(updatedCircles)) {
      return setCircles(updatedCircles);
    }
  };

  const handleParentDimensions = (value) => {
    setSharedParentDimensions(value);
  };

  const isColliding = (circle1, circle2) => {
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circle1.radius + circle2.radius;
  };

  const areCirclesColliding = (circles) => {
    for (let i = 0; i < circles.length; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        if (isColliding(circles[i], circles[j])) {
          return true;
        }
      }
    }
    return false;
  };

  const constrainCirclePosition = (circle) => {
    const canvas = imageCanvas.current;
    const minRadius = 10;
    const constrainedCircle = { ...circle };

    constrainedCircle.x = Math.max(
      constrainedCircle.radius,
      Math.min(canvas.width - constrainedCircle.radius, constrainedCircle.x)
    );
    constrainedCircle.y = Math.max(
      constrainedCircle.radius,
      Math.min(canvas.height - constrainedCircle.radius, constrainedCircle.y)
    );

    return constrainedCircle;
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
    });
    circles.map((circle, index) => {
      console.table({
        index: index + 1,
        x: Math.floor(circle.x) + "px",
        y: Math.floor(circle.y) + "px",
        area: Math.floor(circle.area) + "px",
        ratio_to_parent:
          (circle.area /
            (sharedParentDimensions.width * sharedParentDimensions.height)) *
            100 +
          "px",
      });
    });
  };

  useEffect(() => {
    gsap.to(".container", {
      opacity: 1,
      x: 0,
    });
  });

  useEffect(() => {
    const handleResize = () => {
      setCircles([]);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:p-[5%] h-[250vh]">
        <div className=" w-[100%] lg:w-[64%] px-2">
          <Image
            image={image}
            color={color}
            circles={circles}
            setCircles={setCircles}
            isColliding={isColliding}
            areCirclesColliding={areCirclesColliding}
            handleChildRef={handleChildRef}
            handleParentDimensions={handleParentDimensions}
          />
        </div>
        <div className="px-2 sm:w-[50%] lg:w-[32%] flex flex-col items-center py-[5%] mx-10 container opacity-0 translate-x-[100px] h-[250vh]">
          <SizeInputBox
            circles={circles}
            handleChangeInput={handleChangeInput}
            sharedParentDimensions={sharedParentDimensions}
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
