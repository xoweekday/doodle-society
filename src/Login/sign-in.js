import React from 'react'
import './log-in.css'

const Signin = () => (
          <form>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>First name:</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>
                <div className="form-group">
                    <label>Last name:</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="email" className="form-control" placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="form-group">
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>
);

export default Signin;