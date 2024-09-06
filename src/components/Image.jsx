import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Image = ({
  image,
  color,
  circles,
  setCircles,
  isColliding,
  areCirclesColliding,
  handleChildRef,
  handleParentDimensions,
}) => {
  const [parentDimensions, setParentDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [dragging, setDragging] = useState(null);
  const [resizing, setResizing] = useState(null);
  const [hovering, setHovering] = useState(null);

  const parentRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (handleChildRef) {
      handleChildRef(canvasRef.current);
    }
  }, [handleChildRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawCircles(ctx);
  }, [circles]);

  useEffect(() => {
    handleParentDimensions(parentDimensions);
  }, [parentDimensions]);

  const constrainCircle = (circle) => {
    const canvas = canvasRef.current;

    const constrainedCircle = { ...circle };

    constrainedCircle.radius = Math.min(circle.radius, canvas.height / 2);

    return constrainedCircle;
  };

  const constrainCirclePosition = (circle) => {
    const canvas = canvasRef.current;
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

  const canCreateCircle = (newCircle) => {
    return !circles?.some((circle) => isColliding(newCircle, circle));
  };

  const drawCircles = (ctx) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    circles?.forEach((circle) => {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fill();
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(circle.id + 1, circle.x, circle.y);

      ctx.closePath();
    });
  };

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const clickedCircle = circles?.find(
      (circle) =>
        Math.sqrt((circle.x - offsetX) ** 2 + (circle.y - offsetY) ** 2) <=
        circle.radius
    );
    if (clickedCircle) {
      if (
        Math.sqrt(
          (clickedCircle.x - offsetX) ** 2 + (clickedCircle.y - offsetY) ** 2
        ) >
        clickedCircle.radius - 10
      ) {
        setResizing(clickedCircle.id);
        canvasRef.current.style.cursor = "nwse-resize";
      } else {
        setDragging(clickedCircle.id);
        canvasRef.current.style.cursor = "move";
      }
    }
  };
  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    const hoveredCircle = circles?.find(
      (circle) =>
        Math.sqrt((circle.x - offsetX) ** 2 + (circle.y - offsetY) ** 2) <=
        circle.radius
    );

    if (hoveredCircle) {
      canvasRef.current.style.cursor = "pointer";
      setHovering(hoveredCircle.id);
    } else if (!dragging && !resizing) {
      canvasRef.current.style.cursor = "default";
      setHovering(null);
    }

    if (dragging !== null) {
      const updatedCircles = circles.map((circle) => {
        if (circle.id === dragging) {
          const newCircle = { ...circle, x: offsetX, y: offsetY };
          const constrainedCircle = constrainCirclePosition(newCircle);
          const allCircles = circles.map((c) =>
            c.id === dragging ? constrainedCircle : c
          );
          if (!areCirclesColliding(allCircles)) {
            return constrainedCircle;
          }
        }
        return circle;
      });
      setCircles(updatedCircles);
    }

    if (resizing !== null) {
      const updatedCircles = circles.map((circle) => {
        if (circle.id === resizing) {
          const newRadius = Math.sqrt(
            (circle.x - offsetX) ** 2 + (circle.y - offsetY) ** 2
          );
          const newCircle = { ...circle, radius: newRadius };
          newCircle.area = Math.PI * newCircle.radius * newCircle.radius;
          const constrainedCircle = constrainCircle(newCircle);
          const allCircles = circles.map((c) =>
            c.id === resizing ? constrainedCircle : c
          );
          if (!areCirclesColliding(allCircles)) {
            return constrainedCircle;
          }
        }
        return circle;
      });
      setCircles(updatedCircles);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
    canvasRef.current.style.cursor = "default";
  };

  const handleDoubleClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const newCircle = {
      id: circles?.length,
      x: offsetX,
      y: offsetY,
      radius: 10,
      area: Math.PI * 10 * 10,
      color: "rgba(0, 0, 0, 0.2)",
    };

    if (canCreateCircle(newCircle)) {
      const updatedCircles = [...(circles ?? []), newCircle];
      if (!areCirclesColliding(updatedCircles)) {
        setCircles(updatedCircles);
      } else {
        alert(
          "Hier kann kein Kreis erstellt werden, da er sich mit einem vorhandenen Kreis überschneidet."
        );
      }
    } else {
      alert(
        "Hier kann kein Kreis erstellt werden, da er sich mit einem vorhandenen Kreis überschneidet."
      );
    }
  };

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
      <canvas
        className=" absolute top-0 overflow-clip"
        width={parentDimensions.width}
        height={parentDimensions.height}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleDoubleClick}
      />
    </div>
  );
};

export default Image;
