import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../services/apiService';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationError, setRegistrationError] = useState(null);
    const [passwordMatchError, setPasswordMatchError] = useState(false);


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            setPasswordMatchError(true);
            return;
        }

        setPasswordMatchError(false);

        register(username, password, confirmPassword)
            .then(response  => {
                if (response && response.message === 'Registration successful') {
                    console.log('Registration successful');
                    setRegistrationSuccess(true);
                } else {
                    console.error('Registration failed:', response);
                    setRegistrationError('Registration failed. Please check your information and try again.');
                }
            })
            .catch(error => {
                console.error('Registration failed:', error);
                setRegistrationError('Registration failed. Please try again later.');

            });
    };

    const renderRegisterForm = () => (
        <form onSubmit={handleFormSubmit} className="my-4 form-inline">
            <div className="form-group my-3 w-25">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control form-control-lg"
                    placeholder="Enter Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    aria-describedby="passwordHelpInline"
                    required
                />
                <small id="passwordHelpInline" className="text-muted">
                    150 characters or fewer. Letters, digits and @/./+/-/_ only.
                </small>
            </div>
            <div className="form-group my-3 w-25">
                <label htmlFor="password1">Password:</label>
                <input
                    type="password"
                    id="password1"
                    name="password1"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <small id="passwordHelpInline" className="text-muted">
                    Must contain at least 8 characters. Cannot be entirely numeric.
                </small>
            </div>
            <div className="form-group my-3 w-25">
                <label htmlFor="password2">Confirm Password:</label>
                <input
                    type="password"
                    id="password2"
                    name="password2"
                    className="form-control form-control-lg"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
                {passwordMatchError && (
                    <p style={{ color: 'red', marginTop: '5px' }}>Passwords do not match</p>
                )}
            </div>
            {registrationError && <p style={{ color: 'red' }}>{registrationError}</p>}
            <button type="submit" className="btn btn-primary btn-lg">Register</button>
        </form>
    );

    const renderRegisterSuccess = () => (
        <div>
            <p>Registration successful! You can now log in.</p>
            <Link to="/Login" className="btn btn-success btn-lg">Go to Login</Link>
        </div>
    );

    return (
        <div style={{padding:"150px"}}>
            <h2>Register</h2>
            {registrationSuccess ? renderRegisterSuccess() : renderRegisterForm()}
        </div>
    );
};

export default Register;