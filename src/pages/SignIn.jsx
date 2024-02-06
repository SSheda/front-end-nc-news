import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';


function SignIn() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
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
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `https://back-end-nc-news.onrender.com/api`
        axios.post(`${url}/login`, { email: `${userEmail}`, password: `${userPassword}` })
            .then(function (response) {
                if (response.data.user) {
                    Cookies.set('userId', response.data.user_id);
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
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="email"></label>
                    <input type="email" value={userEmail} onChange={handleEmailChange} autoComplete="on" id="email" name="email" required="required" placeholder="Email Address"></input>
                </div>
                <div className="form-item">
                    <label htmlFor="password" className='visibility'>
                    <input type="password" onPaste={handlePasswordChange} onChange={handlePasswordChange} autoComplete="on" id="password" name="password" required="required" placeholder="Password"></input>
                    {isVisible ? (
                        <MdVisibilityOff onClick={showPassword} className='passIcon'/>
                    ) : (
                        <MdVisibility onClick={showPassword} className='passIcon'/>
                    )}
                    </label>
                </div>
                <div className="button-panel">
                    <input type="submit" className="button" title="Sign In" value="Sign In"></input>
                </div>
            </form>
            <div className="form-footer">
                <p><a href="\signup">Create an account</a></p>
            </div>
        </div>
    )
}

export default SignIn
