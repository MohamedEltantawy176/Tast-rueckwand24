import { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import ResizeHandler from "./ResizeHandler";
import gsap from "gsap";

const Image = ({
  image,
  cmHeight,
  cmWidth,
  handleCmHeight,
  handleCmWidth,
  handleImageData,
  color,
}) => {
  const [renderedDimensions, setRenderedDimensions] = useState({
    width: 50,
    height: 50,
  });
  const [renderedPosition, setRenderedPosition] = useState({
    x: 0,
    y: 0,
  });
  const [parentDimensions, setParentDimensions] = useState({
    width: 0,
    height: 0,
  });
  const parentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const parent = parentRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setParentDimensions({ width, height });
      }
    });

    if (parent) {
      resizeObserver.observe(parent);
    }

    return () => {
      if (parent) {
        resizeObserver.unobserve(parent);
      }
    };
  }, []);
  useEffect(() => {
    setRenderedDimensions({
      width: (50 * parentDimensions.width) / 900,
      height: (50 * parentDimensions.height) / 300,
    });
  }, [parentDimensions]);

  useEffect(() => {
    let w = Math.floor(
      (renderedDimensions.width * 900) / parentDimensions.width <= 900
        ? (renderedDimensions.width * 900) / parentDimensions.width
        : 900
    );
    let h = Math.floor(
      (renderedDimensions.height * 300) / parentDimensions.height <= 300
        ? (renderedDimensions.height * 300) / parentDimensions.height
        : 300
    );
    handleCmHeight(h);

    handleCmWidth(w);
    handleImageData(
      renderedPosition.x,
      renderedPosition.y,
      renderedDimensions.height,
      renderedDimensions.width
    );
  }, [parentDimensions, renderedDimensions, renderedPosition]);

  useEffect(() => {
    parent = gsap.to(parentRef.current, {
      opacity: 1,
      y: 0,
    });
  }, []);

  useEffect(() => {
    parent.restart();
  }, [color]);

  return (
    <div
      className="mt-10 relative overflow-hidden parent opacity-0 translate-y-[-100px]"
      ref={parentRef}
    >
      <img
        className="rounded-xl h-full- w-full"
        src={image}
        alt="not found"
        ref={imageRef}
      />
      <Rnd
        default={{
          x: 0,
          y: 0,
          height: 50,
          width: 50,
        }}
        size={{
          width: (cmWidth * parentDimensions.width) / 900,
          height: (cmHeight * parentDimensions.height) / 300,
        }}
        bounds={".parent"}
        resizeHandleComponent={{
          bottomLeft: <ResizeHandler />,
          bottomRight: <ResizeHandler />,
          topLeft: <ResizeHandler />,
          topRight: <ResizeHandler />,
        }}
        maxWidth={parentDimensions.width}
        maxHeight={parentDimensions.height}
        onResizeStop={(_, __, ref, ___, { x, y }) => {
          setRenderedDimensions({
            height: parseInt(ref.style.height.slice(0)),
            width: parseInt(ref.style.width.slice(0)),
          });
          setRenderedPosition({
            x,
            y,
          });
        }}
        onDragStop={(_, data) => {
          const { x, y } = data;
          setRenderedPosition({ x, y });
        }}
        className="z-20 border-[2px] border-green-700 h-[100%] w- [100] "
      >
        <div className="w-full h-full bg-black opacity-50 cursor-pointer" />
      </Rnd>
    </div>
  );
};

export default Image;
