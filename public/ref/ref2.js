import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import shirtImage from "../assets/16/crew_front_narrow_shoulder.png";
import frontStripes from "../assets/frontStripes.png";
import frontStripes2 from "../assets/frontStripes2.png";

const JerseyFront = ({
  shapeColors,
  selectedNeckImage,
  selectedShoulderImage,
  selectedImage,
}) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);


  // function for  loading images
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


  // this drawImages function for drawing the image and we are returning the final image generated 
  // in the canvas
  const drawImages = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 700;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const [
      shirt,
      shoulderImg,
      frontStripesImg,
      frontStripes2Img,
      selectedImg,
    ] = await Promise.all([
      loadImages(shirtImage),
      loadImages(selectedShoulderImage),
      loadImages(frontStripes),
      loadImages(frontStripes2),
      loadImages(selectedNeckImage),
    ]);

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw shirt
    context.drawImage(shirt, 60, 40, 300, 600);
    let imageData = context.getImageData(60, 40, 300, 600);
    imageData = changeColor(imageData, shapeColors.Shirt);
    context.putImageData(imageData, 60, 40);

    // Draw other images
    const images1 = [
      {
        image: shoulderImg,
        color: shapeColors.FrontShd,
        position: [60, 40],
      },
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
      const tempCanvasbackStr = document.createElement("canvas");
      tempCanvasbackStr.width = 180;
      tempCanvasbackStr.height = 120;
      const textContextbackStr = tempCanvasbackStr.getContext("2d");
      textContextbackStr.drawImage(selectedImg, -20, -3, 180, 120);
      const tempImagebackStr = textContextbackStr.getImageData(-20, -3, 180, 120);
      const updatedTempImagebackStr = changeColor(tempImagebackStr, shapeColors.Neck);
      textContextbackStr.putImageData(updatedTempImagebackStr, -20, -3);
      context.drawImage(tempCanvasbackStr, 140, 40);
    }

    images1.forEach(({ image, color, position }) => {
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

    const data = canvas.toDataURL();
    return data;
  };
 

  useEffect(() => {
    const initCanvas = async () => { 
      const dataURL = await drawImages();

      if (!fabricCanvasRef.current) {
        fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);
      }

      fabricCanvasRef.current.clear();
      
      fabric.Image.fromURL(dataURL, (shtImg) => {
        shtImg.set({
          left: 5,
          top: 0,
          selectable: false,
        });
        fabricCanvasRef.current.add(shtImg);
      });

      if (selectedImage) {
        fabric.Image.fromURL(selectedImage, (selectedIg) => {
          selectedIg.set({
            left: 40,
            top: 50,
            angle: 0,
            padding: 10,
            cornerSize: 10,
            selectable: true,
          });

          fabricCanvasRef.current.add(selectedIg);
          fabricCanvasRef.current.setActiveObject(selectedIg);
        });
      }
    };

    initCanvas();
  }, [shapeColors, selectedNeckImage, selectedShoulderImage, selectedImage]);

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

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={700}
      style={{ border: "1px solid black" }}
    />
  );
};

export default JerseyFront;


