import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { fabric } from 'fabric';

function Doodle() {
   const canvas = window._canvas = new fabric.Canvas('canvas', {
    isDrawingMode: true,
    hoverCursor: 'pointer',
    height: 375,
    width: 375
   }, []);
   
   const [ color, changeColor ] = useState('black');
   const [ width, changeWidth ] = useState(5);
   const [ backgroundImage, changeBackgroundImage ] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Dr.Phil2013.jpg/220px-Dr.Phil2013.jpg');

   canvas.freeDrawingBrush.color = color;
   canvas.freeDrawingBrush.width = width;
   canvas.backgroundImage = backgroundImage;

// useEffect(() => {
//     canvasCall();
//   });

  return (
    <div className="Doodle">
      <header className="Doodle-header">
        <canvas id="canvas" />
      </header>
    </div>
  );
}

export default Doodle;
