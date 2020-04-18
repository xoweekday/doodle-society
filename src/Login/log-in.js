import React, {useState, useEffect} from 'react';
import './log-in.css'
import {GoogleLogin} from 'react-google-login';
import axios from 'axios';

const Login = (props) => {
    const [ welcome, setWelcome ] = useState("");
    const [ name, setName] = useState("");
    const [ url, setUrl] = useState("");
    const { setUser, setBGImage } = props;
    const oauthGoogle = data => {
        console.log('this is the access token', data.accessToken);
          localStorage.setItem('JWT_Token', data.token);
    }
    const responseGoogle = (response) => {
        setName(response.profileObj.name);
        setUrl(response.profileObj.imageUrl);
        oauthGoogle(response);
        const {accessToken} = response;
        axios.post('/api/users', Object.assign(response.profileObj, {accessToken}))
            .then(id => {
                return axios.get(`/api/users/${id.data}`);
            })
            .then(user => {
                setUser(user.data);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        setBGImage('https://i.pinimg.com/originals/45/f9/66/45f9668e4084ecb365ee24f85ee86744.gif');
    }, [])

    return (
    <h1>{ name }
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
