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
            <ul className='navBar'>
                <li><a className='navLink' href="/">Home</a></li>                
                {username===null && <li><a className='navLink' href="/signin">Sign In</a></li>}
                {username===null  && <li><a className='navLink' href="/signup">Sign Up</a></li>}
                {username &&<li><a className='navLink' href="/account">My account</a></li>}
                {username && <li><a className='navLink' href="/" onClick={handleSignOut}>Sign Out</a></li>}
            </ul>
        </nav>
    );
}
export default NavBar