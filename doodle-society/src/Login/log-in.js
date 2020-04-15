import React from 'react'
import './log-in.css'
import {GoogleLogin} from 'react-google-login';

    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [url, setUrl] = useState("");
  
    const responseGoogle = (response) => {

        // in this function we can set up an axios post to save the data
        //being sent from google

        //   setName(response.profileObj.name);
        //   setEmail(response.profileObj.email);
        //   setUrl(response.profileObj.imageUrl);
          console.log(response);
        }

const Login = () => (


    <form>
        <h3>Sign In</h3>
            <div className="form-group">
                <label>Username:</label>
                <input type="email" className="form-control" placeholder="Enter username" />
            </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <div>
                    <GoogleLogin
                        clientId="847322546124-r3jf05c1p89vlk3g6jbrbsv0632mh4go.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />          
                    </div>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
);

export default Login