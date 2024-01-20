import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Home() {
    const [username, setUsername] = useState("");
  useEffect(() => {
    // Retrieve the username from cookies when the component mounts
    const storedUsername = Cookies.get('username');
    
    if (storedUsername) {
      // Set state with the retrieved username
      setUsername(storedUsername);
    }
  }, []);
  
        return (
        <div>
            <h1>Home Page</h1>
            <h1>{username}</h1>
        </div>
    )
}

export default Home
