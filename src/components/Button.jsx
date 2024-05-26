// Button.js
import React, { useState } from "react";
import { CirclePicker } from "react-color";

const Button = ({ name, onChange }) => {
  const [showColor, setShowColor] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    onChange(color.hex); // Pass the selected color to the parent component
  };

  const handleClick = () => {
    setShowColor(!showColor);
  };

  return (
    <>
      <div className="my-3">
        <button className="btn btn-primary" onClick={handleClick}>
          {name}
        </button>
        {showColor && <CirclePicker color={selectedColor} onChange={handleColorChange} />}
      </div>
    </>
  );
};

export default Button;
