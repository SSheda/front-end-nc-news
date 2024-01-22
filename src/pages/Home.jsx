import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import AllArticlesList from '../componnents/AllArticlesList';
import { IoSearch } from "react-icons/io5";

function Home() {
  const [input, setInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [allArticles, setAllArticles] = useState([])
  const [username, setUsername] = useState("");
  const [uniqueTopics, setUniqueTopics] = useState([]);
  useEffect(() => {
    // Retrieve the username from cookies when the component mounts
    const storedUsername = Cookies.get('username');
    const urlArticles = `https://back-end-nc-news.onrender.com/api/articles`
    axios.get(urlArticles)
      .then((response) => {
        const topics = [...new Set(response.data.article.map(article => article.topic))];
        setUniqueTopics(topics);
        if (searchQuery === "") {
          setAllArticles([...response.data.article])
        } else {
          const searchItems = response.data.article.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchQuery.toLowerCase())
          })
          setAllArticles([...searchItems])
        }
      })
    if (storedUsername) {
      // Set state with the retrieved username
      setUsername(storedUsername);
    }
  }, [searchQuery]);

  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const handleTopic = (topic) => {
    setSearchQuery(topic);
  }
  const handleSearch = () => {
    setSearchQuery(input)
    setInput("")
  };
  return (
    <div>
      {username && (<h3 className='wellcomeUser'>Wellcome {username}</h3>)}
      <h1 className='homePage'>NC NEWS</h1>
      <div className="search">
        <input value={input} type="text" onChange={handleChange} className="searchTerm" placeholder="What are you looking for?" />
        <button type="submit" onClick={handleSearch} className="searchButton">
          <IoSearch />
        </button>
      </div>
      <div >
        <ul className='query'>
        {uniqueTopics.map((topic) => (
            <li key={topic}><button onClick={() => handleTopic(topic)}>{topic}</button></li>
          ))}
        </ul>
      </div>
      <AllArticlesList allArticles={allArticles} />
      {allArticles.length === 0 && <p>No results found. Please try again.</p>}
    </div>
  )
}

export default Home
