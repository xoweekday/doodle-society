import React, { useState, useEffect } from 'react'
import './log-in.css'
import {GoogleLogin} from 'react-google-login';
import axios from 'axios';

const Login = (props) => {
    const { setUser } = props;
    const responseGoogle = (response) => {
        axios.post('/api/users', response.profileObj)
            .then(id => {
                return axios.get(`/api/users/${id.data}`);
            })
            .then(user => {
                setUser(user.data);
            })
            .catch(err => console.error(err));
      }

    return (
        // <form>
        //     <h3>Sign In</h3>
        //         <div className="form-group">
        //             <label>Username:</label>
        //             <input type="email" className="form-control" placeholder="Enter username" />
        //         </div>
        //             <div className="form-group">
        //                 <label>Password:</label>
        //                 <input type="password" className="form-control" placeholder="Enter password" />
        //             </div>
        //             <div className="form-group">
        //                 <div className="custom-control custom-checkbox">
        //                     <input type="checkbox" className="custom-control-input" id="customCheck1" />
        //                     <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
        //                 </div>
        //             </div>
        //             <button type="submit" className="btn btn-primary btn-block">Submit</button>
        //                 <div>
        //                 <GoogleLogin
        //                     clientId="847322546124-r3jf05c1p89vlk3g6jbrbsv0632mh4go.apps.googleusercontent.com"
        //                     buttonText="Login"
        //                     onSuccess={responseGoogle}
        //                     onFailure={responseGoogle}
        //                     cookiePolicy={'single_host_origin'}
        //                 />          
        //                 </div>
        //             <p className="forgot-password text-right">
        //                 Forgot <a href="#">password?</a>
        //             </p>
        // </form>
        <div>
            <GoogleLogin
                clientId="847322546124-r3jf05c1p89vlk3g6jbrbsv0632mh4go.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />       
        </div>
    )
};

export default Login