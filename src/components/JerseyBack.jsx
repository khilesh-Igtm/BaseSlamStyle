import React, { useRef, useEffect } from "react";
// front side view
import shirtImage from "../assets/crew_back_narrow_shoulder.png";
import backStripes from "../assets/16/backstripes.png";
import backStripes2 from "../assets/backStripes2.png";




const JerseyBack = ({shapeColors, selectedShoulderImage}) => {

  

  const canvasRef = useRef(null);

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


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });

    const drawImages = async () => {
      try {
       
          
          const [defaultShirt, defaultShoulder, defaultBackStripes,defaultBackStripes2] = await Promise.all([
            loadImages(shirtImage),
            loadImages(selectedShoulderImage),
            loadImages(backStripes),
            loadImages(backStripes2),
           

          ]);


          context.clearRect(0, 0, canvas.width, canvas.height);
          
          // default shirt
          context.drawImage(defaultShirt, 60, 40, 300, 600);
          let imageData = context.getImageData(60, 40, 300, 600);
          imageData = changeColor(imageData, shapeColors.Shirt);
          context.putImageData(imageData, 60, 40);

          // Draw other default images
          const defaultImages = [
            {
              image: defaultShoulder,
              color: shapeColors.FrontShd,
              position: [60, 40],
            },
            {
              image: defaultBackStripes,
              color: shapeColors.FrontStripes,
              position: [58, 35],
            },
            {
              image: defaultBackStripes2,
              color: shapeColors.FrontStripes2,
              position: [58, 35],
            },
          ];

         

          defaultImages.forEach(({ image, color, position }) => {
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
             
        
   
        } catch (error) {
          console.error("Error loading images:", error);
        }
      };
  
      drawImages();
  
    }, [shapeColors, selectedShoulderImage]);
  
    const changeColor = (imageData, color) => {
      const { data } = imageData;
      const hexColor = color.replace(/^#/, ""); // Remove '#' if present
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
  
  export default JerseyBack;