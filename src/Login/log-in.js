import React, {useState} from 'react';
import './log-in.css'
import {GoogleLogin} from 'react-google-login';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const [ welcome, setWelcome ] = useState("");
    const [ name, setName] = useState("");
    const [ url, setUrl] = useState("");
    const { setUser } = props;
    const history = useHistory();
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
                history.push("/Home");
            })
            .catch(err => console.error(err));
    }

    return (
    <div className="login">
        <h1>Doodle Society</h1>
        <div className="log-form">
        <h2>Login to continue</h2>
        <h3>{ name }
            <h3><img src={url} alt={name}/></h3>
            <div>
            <GoogleLogin
                clientId="847322546124-r3jf05c1p89vlk3g6jbrbsv0632mh4go.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                />
            </div>
        </h3>
        </div>
    </div>
    )
};

export default Login
