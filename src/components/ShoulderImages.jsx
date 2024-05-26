import React from "react";
import narrow_shoulder from "../assets/narrow_shoulder.png";
import wide_shoulder from "../assets/wide_shoulder.png";

const ShoulderImages = ({ onImageSelect }) => {
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          <button className="button" onClick={() => onImageSelect("narrow")}>
            <img src={narrow_shoulder} height={50} width={50} alt="one" />
          </button>
        </div>

        <div className="col">
          <button className="button" onClick={() => onImageSelect("wide")} >
            <img src={wide_shoulder} height={50} width={50} alt="two" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoulderImages;
