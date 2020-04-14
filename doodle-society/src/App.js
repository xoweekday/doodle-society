import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('hello');
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {text}
        </p>
        <button onClick={() => {
          axios.get('/api/doodle')
            .then((text) => {
              setText(text.data);
            })
        }}>change to doodle</button>
        <button onClick={() => {
          axios.get('/api/noodle')
            .then((text) => {
              setText(text.data);
            })
        }}>change to noodle</button>
      </header>
    </div>
  );
}

export default App;
