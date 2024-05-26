import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import ViewButtons from "./components/ViewButtons";
import Loader from "./components/Loader";
import Accordian from "./components/Accordian";
import neckimg from "./assets/neck-lines/N1_poster.png";
import front_shoulder_narrow from "./assets/front_shoulders_narrow.png";
import backshouldernarrow from "./assets/backshouldernarrow.png";
import crew_noV_leftside from "./assets/leftcut/crew_noV_leftside.png";
import crew_noV_rightside from "./assets/leftcut/crew_noV_rightside.png";

function App() {
  const [selectedNeckImage, setSelectedNeckImage] = useState(neckimg);
  const [selectedShoulderImage, setSelectedShoulderImage] = useState({
    front: front_shoulder_narrow,
    back: backshouldernarrow,
  });
  const [selectedvorNovImg, setSelectedvorNovImg] = useState({
    left: crew_noV_leftside,
    right: crew_noV_rightside,
  });

  const [isLoading, setIsLoading] = useState(true);

  const [shapeColors, setShapeColors] = useState({
    Shirt: "#ef9abe",
    Neck: "#000000",
    Front: "#9eed46",
    FrontShd: "#a183f0",
    Shoulder: "9eed46",
    FrontStripes: "#a43764",
    FrontStripes2: "#0f3ea3",
    left: "#0f3ea3",
    leftStripe: "#9eed46",
    leftShd: "#a43764",
  });

  // getting data from child component (Accordian) for selecting the neck options
  function handleDataFromChild(data) {
    setSelectedNeckImage(data);
  }

  // getting data from child component (Accordian) for selecting the color options
  function handleShapeColorsFromChild(colors) {
    setShapeColors(colors);
  }

  // getting data from child component (Accordian) for selecting the shoulder option
  function handleShoulderOptionFromChild(shoulder) {
    setSelectedShoulderImage(shoulder);
  }

  function handleVorNovOptionFromChild(vorNoV) {
    setSelectedvorNovImg(vorNoV);
  }

  // function for uploading and previewing images
  let [image, setImage] = useState();

  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // Loader
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container my-4">
          <div className="row">
            <div className="col-4">
              <Accordian
                sendDataToParent={handleDataFromChild}
                sendColorDataToParent={handleShapeColorsFromChild}
                shapeColors={shapeColors}
                sendShoulderToParent={handleShoulderOptionFromChild}
                sendCutToParent={handleVorNovOptionFromChild}
              />
            </div>
            <div className="col-2">
              <input type="file" id="img" onChange={handleChange} />
            </div>

            <div className="col-6">
              <ViewButtons
                shapeColors={shapeColors}
                selectedNeckImage={selectedNeckImage}
                selectedShoulderImage={selectedShoulderImage}
                selectedvorNovImg={selectedvorNovImg}
                selectedImage={image}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
