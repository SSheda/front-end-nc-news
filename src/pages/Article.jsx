import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { isoStringToDate } from '../utils/isoStringToDate';



function Article() {
    const [article, setArticle] = useState({})
    const [username, setUsername] = useState("");
    const [comments, setComments] = useState([])
    const { article_id } = useParams();
    const [likes, setLikes] = useState(0)

    useEffect(() => {
        const storedUsername = Cookies.get('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }

        const urlArticles = `https://back-end-nc-news.onrender.com/api/articles/${article_id}`;
        const urlComments = `https://back-end-nc-news.onrender.com/api/articles/${article_id}/comments`;

        axios.get(urlArticles)
            .then((response) => {
                setArticle(response.data.article);
                return axios.get(urlComments);
            })
            .then((response) => {
                setComments(response.data.comments);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [article_id]);


    function handleClick(id, num) {
        axios
            .patch(`https://back-end-nc-news.onrender.com/api/articles/${id}`, { inc_votes: num })
            .then((response) => {
                setLikes((prevLikes) => ({
                    ...prevLikes,
                    [id]: response.data.article.likes,
                }));
            })
            .catch((error) => {
                console.error("Error updating likes:", error);
            });
    }


    return (
        <div className='articleContainer'>
            <div>
                <h1>{article.title}</h1>
                <h3>Topic: {article.topic}</h3>
                <p>{article.author}</p>
                <div className="articleLikes">
                    <i>
                        <AiFillLike onClick={() => handleClick(article.article_id, 1)} />
                    </i>
                    <p>{likes[article.article_id] || article.likes}</p>
                    <i>
                        <AiFillDislike onClick={() => handleClick(article.article_id, -1)} />
                    </i>
                </div>
                <img src={article.article_img_url}></img>
                <p className='body'>{article.body}</p>
                <p>{isoStringToDate(article.created_at)}</p>
            </div>
            <div>
                <h3>Comments ({comments.length})</h3>
                <div className="addCommentSPR">
                    <p>User</p>
                    <input id="newComment" placeholder="Add a comment..." />
                    <button>Comment</button>
                </div>
                <ul>
                    {comments.map((comment) => (
                        <li className="oldCommentSPR" key={comment.comment_id}>
                            <div>
                                <p>{comment.author}</p>
                                <p>{isoStringToDate(comment.created_at)}</p>
                            </div>
                            <p>{comment.body}</p>
                            <p>{comment.likes}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    )
}

export default Article