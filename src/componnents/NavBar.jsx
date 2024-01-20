import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';


function NavBar() {
    const [username, setUsername] = useState(null);
    useEffect(() => {
        // Retrieve the username from cookies when the component mounts
        const storedUsername = Cookies.get('username');

        if (storedUsername) {
            // Set state with the retrieved username
            setUsername(storedUsername);
        }
    }, []);

    const handleSignOut = () => {
        // Delete cookies and reset state
        Cookies.remove('username');
        setUsername(null);
        window.location.href = '/'
    };


    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                {username && <li><p>{username}</p></li>}
                {username===null && <li><a href="/signin">Sign In</a></li>}
                {username===null  && <li><a href="/signup">Sign Up</a></li>}
                <li><a href="/account">Account</a></li>
                {username && <li><button onClick={handleSignOut}>Sign Out</button></li>}
            </ul>
        </nav>
    );
}
export default NavBar