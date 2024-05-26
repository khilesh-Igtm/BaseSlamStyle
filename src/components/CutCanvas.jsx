import React, { useRef, useEffect } from "react";

const CutCanvas = ({ selectedImage, defaultLeft }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });

    const drawImages = async () => {
      const loadImages = (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = reject;
        });

      try {
        const [defaultImg] = await Promise.all([loadImages(defaultLeft)]);

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(defaultImg, 0, 0, canvas.width, canvas.height);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    drawImages();
  }, [selectedImage, defaultLeft]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={600}
      style={{ border: "1px solid black" }}
    />
  );
};

export default CutCanvas;
