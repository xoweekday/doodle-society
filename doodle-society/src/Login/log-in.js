import React, { useState, useEffect } from 'react'
import './log-in.css'
import {GoogleLogin} from 'react-google-login';
import axios from 'axios';

const Login = (props) => {
    const [ name, setName] = useState("");
    const [ url, setUrl] = useState("");
    const { setUser } = props;
    const responseGoogle = (response) => {
        setName(response.profileObj.name);
        setUrl(response.profileObj.imageUrl);
        axios.post('/api/users', response.profileObj)
            .then(id => {
                return axios.get(`/api/users/${id.data}`);
            })
            .then(user => {
                setUser(user.data);
                console.log(user.data.imageurl);
            })
            .catch(err => console.error(err));
      }

    return (
        <h1>{name}
        <h2><img src={url} alt={name}/></h2>
            <div>
            <GoogleLogin
                clientId="847322546124-r3jf05c1p89vlk3g6jbrbsv0632mh4go.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                />       
            </div>
        </h1>
    )
};

export default Login