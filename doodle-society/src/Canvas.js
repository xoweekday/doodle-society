import React, { useEffect } from 'react';
// import axios from 'axios';
import './App.css';
import { fabric } from 'fabric';

let canvas;

function Canvas() {
  
useEffect(() => {
  canvas = new fabric.Canvas('canvas', {
    isDrawingMode: true,
    hoverCursor: 'pointer',
    height: 375,
    width: 375,
   });
  }, []);

  const handleChange = (event) => {
    let value = event.target.value;
    if (!isNaN(Number(value))){
      value = Number(value);
    }
    canvas.freeDrawingBrush[event.target.name] = value;
  };

  const clearCanvas = () => {
    canvas.clear();
  };

  return (
    <div className="Doodle">
      <header className="Doodle-header">
        <input type='color' name='color' onChange={handleChange}/>
        <input type="range" name='width' min="5" max="50" onChange={handleChange}></input>
        <button onClick={clearCanvas}>Clear</button>
        <canvas id="canvas" />
      </header>
    </div>
  );
}

export default Canvas;
