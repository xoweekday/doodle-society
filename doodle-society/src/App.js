import React, { useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './App.css';
import { GoogleLogin } from 'react-google-login';
function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  const responseGoogle = (response) => {
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    console.log(response);
  }

  const [text, setText] = useState('hello');
  return (
    <div className="App">
      <header className="App-header">
        <h1>Google Login </h1>
        <h2>Welcome: {name} </h2>
        <h2>Email: {email}</h2>
        <div><img src={url} alt={name}/></div>
        <GoogleLogin
    clientId="847322546124-r3jf05c1p89vlk3g6jbrbsv0632mh4go.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
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
