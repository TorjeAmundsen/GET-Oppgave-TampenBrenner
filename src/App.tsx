import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const colorsArray = [
    "hsl(12, 87%, 47%)",
    "hsl(36, 100%, 40%)",
    "hsl(56, 100%, 50%)",
    "hsl(209, 100%, 50%)",
  ];

  const [randomPointX, setRandomPointX] = useState(0);
  const [randomPointY, setRandomPointY] = useState(0);
  const [gradientString, setGradientString] = useState("");

  const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  const getColorIndex = (distance: number) => {
    if (distance < 75) {
      return 0;
    } else if (distance < 180) {
      return 1;
    } else if (distance < 360) {
      return 2;
    } else {
      return 3;
    }
  };

  const generateRandomCoords = (e?: React.MouseEvent) => {
    const randomX = Math.floor(Math.random() * (window.innerWidth - 67 + 1) + 34);
    const randomY = Math.floor(Math.random() * (window.innerHeight - 67 + 1) + 34);
    setRandomPointX(randomX);
    setRandomPointY(randomY);
    if (e) handleMouseMove(e, randomX, randomY);
  };
  useEffect(() => {
    generateRandomCoords();
  }, []);

  const handleMouseMove = (e: React.MouseEvent, newX?: number, newY?: number) => {
    const [mouseX, mouseY] = [e.clientX, e.clientY];
    let distance;
    if (newX && newY) {
      distance = getDistance(mouseX, mouseY, newX, newY);
    } else {
      distance = getDistance(mouseX, mouseY, randomPointX, randomPointY);
    }
    const colorIndex = getColorIndex(distance);
    setGradientString(`radial-gradient(
      ${80 + colorIndex * 130}px circle at ${mouseX}px ${mouseY}px,
      ${colorsArray[colorIndex]},
      transparent 40%`);
  };

  return (
    <>
      <div
        className={"tampen-brenner-container"}
        onMouseMove={handleMouseMove}
        style={{
          background: gradientString,
        }}
      >
        <div
          className={"random-point"}
          onClick={generateRandomCoords}
          style={{ top: `${randomPointY}px`, left: `${randomPointX}px` }}
        ></div>
      </div>
    </>
  );
}

export default App;
