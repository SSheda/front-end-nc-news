import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';


function SignUp() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageMatch, setMessageMatch] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isVisible, setIsVisible] = useState(false)
    const [userUsername, setUserUsername] = useState("")

    //0000@657ggtHJ


    const handleEmailChange = (event) => {
        const newEmail = event.type === "paste" ? event.clipboardData.getData('text') : event.target.value;
        setUserEmail(newEmail);
        setIsValid(true);
        setEmailMessage("");
        const regex = /^[\w-+\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!newEmail.match(regex)) {
            setIsValid(false);
            setEmailMessage("Invalid email format.");
        } else {
            setEmailMessage("");
        }
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
        setMessage("");
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!newPassword.match(regex)) {
            setIsValid(false);
            setMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        } else {
            setMessage("");
        }
    };
    const passwordMatch = (event) => {
        const passMatch = event.type === "paste" ? event.clipboardData.getData('text') : event.target.value;
        if (passMatch !== userPassword) {
            setMessageMatch("Password does not match!")
        }
        else {
            setMessageMatch("")
        }

    }
    const handleUsername = (event) => {
        const newUsername = event.type === "paste" ? event.clipboardData.getData('text') : event.target.value;
        setUserUsername(newUsername)
     }
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `https://back-end-nc-news.onrender.com/api`
        axios.post(`${url}/signup`, {username: `${userUsername}`, email: `${userEmail}`, password: `${userPassword}` })
            .then(function (response) {
                if (response.data.newUser) {
                    Cookies.set('userId', response.data.newUser.user_id);
                    Cookies.set('username', response.data.newUser.username);
                    window.location.href = '/'
                }
            })
            .catch(function (error) {
                alert('Email/Username already exists!')
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
                <p className="passwordMessage">{emailMessage}</p>
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
                <p className="passwordMessage">{message}</p>
                <div className="form-item">
                    <label htmlFor="repeatPassword" className='visibility'>
                        <input type="password" onPaste={passwordMatch} onChange={passwordMatch} autoComplete="on" id="repeatPassword" name="repeatPassword" required="required" placeholder="Repeat Password"></input>
                    </label>
                </div>
                <p className="passwordMessage">{messageMatch}</p>
                <div className="form-item">
                    <label htmlFor="username" className='visibility'>
                        <input type="text" onPaste={handleUsername} onChange={handleUsername} autoComplete="on" id="username" name="username" required="required" placeholder="Username"></input>
                    </label>
                </div>
                <div className="button-panel">
                    <input disabled={!isValid} type="submit" className="button" title="Sign Up" value="Sign Up"></input>
                </div>
            </form>
            <div className="form-footer">
                <p><a href="\signin">Go to sign in page</a></p>
            </div>
        </div>
    )
}

export default SignUp
