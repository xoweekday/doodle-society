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
        <button onClick={() => {
          const username = prompt('enter username');
          const fullname = prompt('enter full name');
          axios.post('/api/users', { username, fullname })
            .then(id => console.log(id.data))
            .catch(err => console.error(err));
        }}>new user</button>
      </header>
    </div>
  );
}

export default App;
