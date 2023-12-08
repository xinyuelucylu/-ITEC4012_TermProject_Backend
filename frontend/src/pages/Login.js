import React, { useState } from 'react';
import { login } from '../services/apiService';
import {Link, useNavigate} from "react-router-dom";

function Login(props)  {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        login(username, password)
            .then(({ username }) => {
                localStorage.setItem('isAuthenticated', 'true');
                props.onLoginSuccess(username);
                navigate('/');
            })
            .catch(error => {
                console.error('Login failed:', error);
                setLoginError('Login failed. Username and/or password is wrong. Please check your information and try again.');
            });

    };

    return (
        <div style={{padding:"150px"}}>
            <h2>Login</h2>
            <input type="hidden" name="csrfmiddlewaretoken" value="your-csrf-token-here" />
            <form onSubmit={handleFormSubmit} className="my-4">
                <div className="form-group my-3 w-25">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control form-control-lg"
                        placeholder="Enter username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group my-3 w-25">
                    <label htmlFor="password" >Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                <button type="submit" className="btn btn-primary btn-lg my-3">Login</button><br/>
                <Link to="/Register" className="btn btn-warning btn-lg">Register</Link>

            </form>

        </div>
    );
};

export default Login;