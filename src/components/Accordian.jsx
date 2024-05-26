import React from "react";
import Images from "./Images";
import Button from "./Button";
import front_shoulder_narrow from "../assets/front_shoulders_narrow.png";
import front_shoulder_wide from "../assets/front_shoulders_wide.png";
import backshouldernarrow from "../assets/backshouldernarrow.png";
import backshoulderwide from "../assets/backshoulderwide.png";
import crew_leftside from "../assets/leftcut/crew_leftside.png";
import crew_noV_leftside from "../assets/leftcut/crew_noV_leftside.png";
import crew_rightside from "../assets/leftcut/crew_rightside.png";
import crew_noV_rightside from "../assets/leftcut/crew_noV_rightside.png";
import ShoulderImages from "./ShoulderImages";
import CutImages from "./CutImages";

const Accordian = ({
  sendDataToParent,
  sendColorDataToParent,
  shapeColors,
  sendShoulderToParent,
  sendCutToParent,
  
}) => {

  // sending data to parent i.e image source
  const handleNeckImageSelection = (imageSrc) => {
    sendDataToParent(imageSrc);
  };

  const handleShapeColor = (color, buttonName) => {
    const updatedColors = { ...shapeColors };
    const rgbaColor = color;
    updatedColors[buttonName] = rgbaColor;
    sendColorDataToParent(updatedColors);
  };

  const handleImageSelect = (type) => {
    if (type === "narrow") {
      sendShoulderToParent({front: front_shoulder_narrow, back: backshouldernarrow});
    } else if (type === "wide") {
      sendShoulderToParent({front : front_shoulder_wide, back: backshoulderwide});
    }
  };

  
  const handleVorNoVImageSelect = (type) => {
    if (type === "v") {
      sendCutToParent({ left: crew_leftside, right: crew_rightside });
    } else if (type === "noV") {
      sendCutToParent({ left: crew_noV_leftside, right: crew_noV_rightside });
    }
  };

 

  return (
    <>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Choose your neck style
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <Images onNeckimageSelect={handleNeckImageSelection} />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Choose Your Shoulder Style
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <ShoulderImages onImageSelect={handleImageSelect} />
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Choose V or No V in Uniform
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <CutImages onImageSelect={handleVorNoVImageSelect} />
              
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Color Uniform
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <h5>Uniform Color</h5>
              <Button
                name="Shirt"
                onChange={(color) => handleShapeColor(color, "Shirt")}
              />
              <Button
                name="Neck"
                onChange={(color) => handleShapeColor(color, "Neck")}
              />

              <Button
                name="FrontShd"
                onChange={(color) => handleShapeColor(color, "FrontShd")}
              />
              <Button
                name="FrontStripes"
                onChange={(color) => handleShapeColor(color, "FrontStripes")}
              />
              <Button
                name="FrontStripes2"
                onChange={(color) => handleShapeColor(color, "FrontStripes2")}
              />

              {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Left side Buttons */}
              <Button
                name="left"
                onChange={(color) => handleShapeColor(color, "left")}
              />
              <Button
                name="leftStripe"
                onChange={(color) => handleShapeColor(color, "leftStripe")}
              />
              <Button
                name="LeftShd"
                onChange={(color) => handleShapeColor(color, "leftShd")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordian;
