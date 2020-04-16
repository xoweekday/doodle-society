import React, { useEffect } from 'react';
// import axios from 'axios';
import './App.css';
import { fabric } from 'fabric';
import axios from 'axios';

let canvas;

function Canvas(props) {
const { url, original_id, user, getDoods } = props;
useEffect(() => {
  canvas = new fabric.Canvas('canvas', {
    isDrawingMode: true,
    hoverCursor: 'pointer',
    height: 375,
    width: 375,
   });
   document.getElementById('canvas-container').style.backgroundImage = `url(${url})`;

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

  const save = () => {
    const dataUrl = document.getElementById('canvas').toDataURL();
    axios.post('/api/doodles', { url: dataUrl, original_id, doodler_id: user.id })
      .then(id => {
        console.log(id.data);
        getDoods();
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="Doodle">
      <header className="Doodle-header">
        <input type='color' name='color' onChange={handleChange}/>
        <input type="range" name='width' min="5" max="50" onChange={handleChange}></input>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={save}>Save</button>
      </header>
      <div className="canvas-container" id="canvas-container">
        <canvas className="canvas" id="canvas" />
      </div>
    </div>
  );
}

export default Canvas;
