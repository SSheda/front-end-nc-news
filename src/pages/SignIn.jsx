import axios from 'axios';
import React, { useState } from 'react';


function SignIn() {
    const [user, setUser] = useState("")
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleEmailChange = (event) => {
        setUserEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setUserPassword(event.target.value);
        setIsValid(true); // Reset validation status.    
        if (userPassword.length < 8) {
            setIsValid(false);
            setMessage("min of 8 characters");
        } else if (!/[A-Z]/.test(userPassword)) {
            setIsValid(false);
            setMessage(" min of 1 upper case");
        } else if (!/[a-z]/.test(userPassword)) {
            setIsValid(false);
            setMessage("min of 1 lower case");
        } else if (!/\d/.test(userPassword)) {
            setIsValid(false);
            setMessage("min of 1 number");
        } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(userPassword)) {
            setIsValid(false);
            setMessage("min of 1 special character");
        } else if (/^\s|\s$/.test(userPassword)) {
            setIsValid(false);
            setMessage("no spaces at start & end");
        } else {
            setMessage(""); // Reset the message if the password meets the criteria.
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const urlArticles = `https://back-end-nc-news.onrender.com/api`
        axios.post(`${urlArticles}/login`, { email: `${userEmail}`, password: `${userPassword}` })
            .then(function (response) {
                // handle success
                if (response.data.user) {
                    setUser(response.data.user)
                    //window.location.href = '/'
                }
            })
            .catch(function (error) {
                alert("Invalid Email/Password")
            })
    }

    return (
        <div className="form-wrapper">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="email"></label>
                    <input type="email" value={userEmail} onChange={handleEmailChange} autoComplete="on" id="email" name="email" required="required" placeholder="Email Address"></input>
                </div>
                <div className="form-item">
                    <label htmlFor="password"></label>
                    <input type="password" value={userPassword} onChange={handlePasswordChange} autoComplete="on" id="password" name="password" required="required" placeholder="Password"></input>
                </div>
                {isValid === false && (
                    <p className="passwordMessage">{message}</p>
                )}

                <div className="button-panel">
                    <input disabled={!isValid} type="submit" className="button" title="Sign In" value="Sign In"></input>
                </div>
            </form>
            <div className="form-footer">
                <p><a href="\signup">Create an account</a></p>
            </div>
        </div>
    )
}

export default SignIn
