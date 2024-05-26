import React, { useRef, useEffect } from "react";
import interact from "interactjs";
import shirtImage from "../assets/16/crew_front_narrow_shoulder.png";
import frontStripes from "../assets/frontStripes.png";
import frontStripes2 from "../assets/frontStripes2.png";

const JerseyFront = ({
  shapeColors,
  selectedNeckImage,
  selectedShoulderImage,
  selectedImage,
  imagePosition,
  setImagePosition,
  imageDimensions,
  setImageDimensions,
}) => {
  const baseCanvasRef = useRef(null);

  const loadImages = async (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (error) => {
        console.error("Image loading failed:", img);
        reject(error);
      };
    });
  };

  const changeColor = (imageData, color) => {
    const { data } = imageData;
    const hexColor = color.replace(/^#/, "");
    const [r, g, b] = hexColor.match(/.{1,2}/g).map((c) => parseInt(c, 16));

    for (let i = 0; i < data.length; i += 4) {
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }
    return imageData;
  };

  const drawBaseImages = async (context) => {
    const [shirt, shoulderImg, frontStripesImg, frontStripes2Img, neckImg] =
      await Promise.all([
        loadImages(shirtImage),
        loadImages(selectedShoulderImage),
        loadImages(frontStripes),
        loadImages(frontStripes2),
        loadImages(selectedNeckImage),
      ]);

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.drawImage(shirt, 60, 40, 300, 600);
    let imageData = context.getImageData(60, 40, 300, 600);
    imageData = changeColor(imageData, shapeColors.Shirt);
    context.putImageData(imageData, 60, 40);

    const images = [
      { image: shoulderImg, color: shapeColors.FrontShd, position: [60, 40] },
      {
        image: frontStripesImg,
        color: shapeColors.FrontStripes,
        position: [60, 40],
      },
      {
        image: frontStripes2Img,
        color: shapeColors.FrontStripes2,
        position: [60, 40],
      },
    ];

    if (selectedNeckImage) {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = 180;
      tempCanvas.height = 120;
      const tempContext = tempCanvas.getContext("2d");
      tempContext.drawImage(neckImg, -20, -3, 180, 120);
      const tempImageData = tempContext.getImageData(-20, -3, 180, 120);
      const updatedTempImageData = changeColor(tempImageData, shapeColors.Neck);
      tempContext.putImageData(updatedTempImageData, -20, -3);
      context.drawImage(tempCanvas, 140, 40);
    }

    images.forEach(({ image, color, position }) => {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = 300;
      tempCanvas.height = 600;
      const tempContext = tempCanvas.getContext("2d");
      tempContext.drawImage(image, 0, 0, 300, 600);
      let tempImageData = tempContext.getImageData(0, 0, 300, 600);
      tempImageData = changeColor(tempImageData, color);
      tempContext.putImageData(tempImageData, 0, 0);
      context.drawImage(tempCanvas, ...position);
    });
  };

  useEffect(() => {
    const baseCanvas = baseCanvasRef.current;
    const context = baseCanvas.getContext("2d", { willReadFrequently: true });
    drawBaseImages(context);
  }, [selectedNeckImage, selectedShoulderImage, shapeColors]);

  useEffect(() => {
    if (selectedImage) {
      interact(".draggable") //intializes interact js on elements with class 'draggable'
      // this draggable sets up draggable functionality
        .draggable({
          // inside listerners defines what happens when the draggable element is moved
          listeners: {
            // inside move event listener , the position of img is updated based on drag movement
            move(event) {

              // update the position state of image
              setImagePosition((prev) => {

                // calculating the newLeft and Top after dragging
                // calculate new left pos based on prev pos and change in x (event.dx)
                // Math.max(...,0) ensudre new pos doesn't go outside left/top boundaries
                // Math.min(...,400-imageDimension.width) ensure it doesn't fo outside right/bottom voundaries
                const newLeft = Math.min(
                  Math.max(prev.left + event.dx, 0),
                  400 - imageDimensions.width
                );
                const newTop = Math.min(
                  Math.max(prev.top + event.dy, 0),
                  700 - imageDimensions.height
                );
                return { left: newLeft, top: newTop };
              });
            },
          },
        })

        // sets the resizing functioanlty
        .resizable({
          // defines which edge can be resized
          edges: { left: true, right: true, bottom: true, top: true },
          listeners: {
            move(event) {
              setImageDimensions((prev) => {
                // prev.width + event.deltaRect.width: Calculates the new width based on the previous width and the change in width (event.deltaRect.width)
                // Math.max(..., 20): Ensures the new width/height does not go below a minimum size of 20 pixels.
// Math.min(..., 400 - imagePosition.left): Ensures the new width/height does not exceed the container boundaries.
                const newWidth = Math.min(
                  Math.max(prev.width + event.deltaRect.width, 20),
                  400 - imagePosition.left
                );
                const newHeight = Math.min(
                  Math.max(prev.height + event.deltaRect.height, 20),
                  700 - imagePosition.top
                );
                return { width: newWidth, height: newHeight };
              });

              // when image is resized its position also get changed
              setImagePosition((prev) => {
                //  Calculates the new left position based on the previous position and the change in left position (event.deltaRect.left).
                const newLeft = Math.min(
                  Math.max(prev.left + event.deltaRect.left, 0),
                  400 - imageDimensions.width
                );
                const newTop = Math.min(
                  Math.max(prev.top + event.deltaRect.top, 0),
                  700 - imageDimensions.height
                );
                return { left: newLeft, top: newTop };
              });
            },
          },
        });
    }
  }, [selectedImage]);

  return (
    <div style={{ position: "relative", width: 400, height: 700 }}>
      <canvas
        ref={baseCanvasRef}
        width={400}
        height={700}
        style={{
          // border: "1px solid #ddd",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      {selectedImage && (
        <img
          src={selectedImage}
          className="draggable"
          alt="Selected"
          style={{
            position: "absolute",
            top: imagePosition.top,
            left: imagePosition.left,
            width: imageDimensions.width,
            height: imageDimensions.height,
            // border: "1px solid #ddd",
          }}
        />
      )}
    </div>
  );
};

export default JerseyFront;
