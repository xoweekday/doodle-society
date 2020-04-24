import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import './App.css';
import { fabric } from 'fabric';
import axios from 'axios';
import { store } from 'react-notifications-component';
import Button from 'react-bootstrap/Button';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import 'fabric-history';

let canvas;

function Canvas(props) {
const { url, original_id, user, getAllDoods } = props;

useEffect(() => {
  canvas = new fabric.Canvas('canvas', {
    isDrawingMode: true,
    hoverCursor: 'pointer',
    height: 375,
    width: 375,
   });
   document.getElementById('canvas-container').style.backgroundImage = `url(${url})`;

  }, [url]);

  const options = {
    title: 'SUCCESS!',
    message: 'Doods saved!',
    type: 'success',                         // 'default', 'success', 'info', 'warning'
    container: 'center',                // where to position the notifications
    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
    dismiss: {
      duration: 1500 
    }
  };

  const history = useHistory();
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

  const undo = () => {
    canvas.undo();
  }

  const redo = () => {
    canvas.redo();
  }

  const save = () => {
    const dataUrl = document.getElementById('canvas').toDataURL();
    const caption = document.getElementById('caption').value;
    axios.post('/api/doodles', { url: dataUrl, caption, original_id, doodler_id: user.id })
      .then(id => {
        getAllDoods();
        setTimeout(function(){store.addNotification(options);},0);
        history.push('/profile');
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="Doodle">
      <h2>Doodle Page</h2>
      <div className="Doodle-header">
        <div className="Doodle-tools">
        <input type='color' name='color' onChange={handleChange}/>
        <input type="range" name='width' min="5" max="50" onChange={handleChange}></input>
        </div>
        <div className="canvasButtons">
        <Button variant="danger" onClick={clearCanvas}>Clear</Button>
        <Button variant="primary"onClick={undo}>Undo</Button>
        <Button variant="warning"onClick={redo}>Redo</Button>
        </div>
        <div className="Doodle-caption">
        <b>Caption:</b>
        <input id="caption" type="text" />
        <Button variant="success" onClick={save} >Save</Button>
        </div>
      </div>
      <div className="canvas-container" id="canvas-container">
        <canvas className="canvas" id="canvas" />
      </div>
    </div>
  );
}

export default Canvas;
