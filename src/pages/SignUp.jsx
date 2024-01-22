import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';


function SignIn() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isVisible, setIsVisible] = useState(false)

    //0000@657ggtHJ


    const handleEmailChange = (event) => {
        setUserEmail(event.target.value);
    };
    const showPassword = () => {
        const pass = document.getElementById("password");
        if (pass.type === "password") {
            pass.type = "text";
            setIsVisible(true)
        } else {
            pass.type = "password";
            setIsVisible(false)
        }
    }
    const handlePasswordChange = (event) => {
        const newPassword = event.type === "paste" ? event.clipboardData.getData('text') : event.target.value;
        setUserPassword(newPassword);
        setIsValid(true);

        if (newPassword.length < 8) {
            setIsValid(false);
            setMessage("min of 8 characters");
        } else if (!/[A-Z]/.test(newPassword)) {
            setIsValid(false);
            setMessage("min of 1 upper case");
        } else if (!/[a-z]/.test(newPassword)) {
            setIsValid(false);
            setMessage("min of 1 lower case");
        } else if (!/\d/.test(newPassword)) {
            setIsValid(false);
            setMessage("min of 1 number");
        } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(newPassword)) {
            setIsValid(false);
            setMessage("min of 1 special character");
        } else {
            setMessage("");
        }
    };

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const urlArticles = `https://back-end-nc-news.onrender.com/api`
        axios.post(`${urlArticles}/login`, { email: `${userEmail}`, password: `${userPassword}` })
            .then(function (response) {
                // handle success
                if (response.data.user) {
                    Cookies.set('userId', response.data.user.id);
                    Cookies.set('username', response.data.user.username);
                    window.location.href = '/'
                }
            })
            .catch(function (error) {
                alert("Invalid Email/Password")
            })
    }

    return (
        <div className="form-wrapper">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="email"></label>
                    <input type="email" value={userEmail} onChange={handleEmailChange} autoComplete="on" id="email" name="email" required="required" placeholder="Email Address"></input>
                </div>
                <div className="form-item">
                    <label htmlFor="password" className='visibility'>
                        <input type="password" onPaste={handlePasswordChange} onChange={handlePasswordChange} autoComplete="on" id="password" name="password" required="required" placeholder="Password"></input>
                        {isVisible ? (
                            <MdVisibilityOff onClick={showPassword} className='passIcon' />
                        ) : (
                            <MdVisibility onClick={showPassword} className='passIcon' />
                        )}
                    </label>
                </div>
                <div className="form-item">
                    <label htmlFor="repeatPassword" className='visibility'>
                        <input type="password"  autoComplete="on" id="repeatPassword" name="repeatPassword" required="required" placeholder="Repeat password"></input>                        
                    </label>
                </div>
                <div className="form-item">
                    <label htmlFor="username" className='visibility'>
                        <input type="text" autoComplete="on" id="username" name="username" required="required" placeholder="Username"></input>                        
                    </label>
                </div>
                <div className="button-panel">
                    <input disabled={!isValid} type="submit" className="button" title="Sign Up" value="Sign Up"></input>
                </div>
            </form>
            <div className="form-footer">
                <p><a href="\signup">Create an account</a></p>
            </div>
        </div>
    )
}

export default SignIn
