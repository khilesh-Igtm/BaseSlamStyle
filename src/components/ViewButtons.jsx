// importing necesaary dependencies from React and Material-UI , including components like 'Tabs', 'Tab', 'Box' and 'Avatar'

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";

// these are Jersey component for each side
import JerseyFront from "./JerseyFront";
import JerseyLeft from "./JerseyLeft";
import JerseyRight from "./JerseyRight";
import JerseyBack from "./JerseyBack";

// these are 4 tabs based on these necessary component opens
import back from "../assets/jersey-images/back.png";
import front from "../assets/jersey-images/front.png";
import left from "../assets/jersey-images/left.png";
import right from "../assets/jersey-images/right.png";


// TabPanel is a helper component for rendering the content of each tab.It only shows the content if the 'value' prop matches the 'index' prop
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      // The aria attributes are for accessibility, linking the tab with its panel.
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}


// this component manages the state and logic for the tabs and their content
export default function ViewButtons({
  shapeColors,
  selectedNeckImage,
  selectedShoulderImage,
  selectedvorNovImg,
  selectedImage,
}) {

  // the value holds the index of currently selected tab
  const [value, setValue] = useState(0);

  // initialRender is used to handle some initialization logic for tab selection
  const [initialRender, setInitialRender] = useState(true);

  // State to store the image position and dimensions
  // initiall position and dimension of an image
  const [imagePosition, setImagePosition] = useState({ top: 50, left: 50 });
  const [imageDimensions, setImageDimensions] = useState({
    width: 100,
    height: 100,
  });


  // event handler for changing tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  // The first one sets the initial tab based on selectedvorNovImg
  useEffect(() => {
    if (!initialRender && selectedvorNovImg) { //skip on initial render
      if (value === 2 && selectedvorNovImg.left) {
        setValue(2);
      } else if (value === 3 && selectedvorNovImg.right) {
        setValue(3);
      } else {
        setValue(2);
      }
    } else {
      setInitialRender(false); //mark initial render as false after first run
    }
  }, [selectedvorNovImg]);


  // The second one ensures the front view is selected if certain shoulder images are present.
  useEffect(() => {
    if (selectedShoulderImage) {
      if (
        (value === 2 || value === 3) &&
        (selectedShoulderImage.front || selectedShoulderImage.back)
      ) {
        setValue(0);
      }
    }
  }, [selectedShoulderImage]);


  // The third one ensures the front view is selected if a neck image is present.
  useEffect(() => {
    if (selectedNeckImage && value !== 0) {
      setValue(0);
    }
  }, [selectedNeckImage]);

  return (
    <Box
      sx={{
        flexGrow: 1, //allow box to grow
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
      }}
    >
      {/* Tabs component is used to create vertical tabs with icons */}
     
      <TabPanel value={value} index={0}>
        <JerseyFront
          shapeColors={shapeColors}
          selectedNeckImage={selectedNeckImage}
          selectedShoulderImage={selectedShoulderImage.front}
          selectedImage={selectedImage}
          imagePosition={imagePosition} //pass image position
          setImagePosition={setImagePosition} //pass function to set img position
          imageDimensions={imageDimensions} //pass img dimension
          setImageDimensions={setImageDimensions} //pass fun to set img dimesnion
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <JerseyBack
          shapeColors={shapeColors}
          selectedShoulderImage={selectedShoulderImage.back}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <JerseyLeft
          shapeColors={shapeColors}
          selectedvorNovImg={selectedvorNovImg.left}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <JerseyRight
          shapeColors={shapeColors}
          selectedvorNovImg={selectedvorNovImg.right}
        />
      </TabPanel>
      <Tabs
        orientation="vertical" //vertical tabs
        value={value} //control tab value
        onChange={handleChange} //handle tab change
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          style={{ minHeight: 100 }} //mini height for tab
          icon={<Avatar style={{ minHeight: 100, minWidth: 70 }} src={front} />}
          {...a11yProps(0)}
        />
        <Tab
          style={{ minHeight: 100 }}
          icon={<Avatar style={{ minHeight: 100, minWidth: 70 }} src={back} />}
          {...a11yProps(1)}
        />
        <Tab
          style={{ minHeight: 100 }}
          icon={<Avatar style={{ minHeight: 100, minWidth: 70 }} src={left} />}
          {...a11yProps(2)}
        />
        <Tab
          style={{ minHeight: 100 }}
          icon={<Avatar style={{ minHeight: 100, minWidth: 70 }} src={right} />}
          {...a11yProps(3)}
        />
      </Tabs>
    </Box>
  );
}
