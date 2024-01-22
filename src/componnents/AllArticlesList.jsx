import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { isoStringToDate } from "../utils/isoStringToDate";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AllArticlesList({ allArticles }) {
    const [likes, setLikes] = useState(0)
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

    const articles = allArticles.map((article) => (
        <li className="articlesList" key={article.article_id}>
            <h3 ><Link className="linkRed" to={`/article/${article.article_id}`}>{article.title}</Link></h3>
            <h4>Topic: <Link className="linkColour" to={`/article/${article.article_id}`}>{article.topic}</Link></h4>
            <p>{article.body.slice(0, 155)} <Link className="linkRed" to={`/article/${article.article_id}`}><span className="more">...more</span></Link></p>
            <p><Link className="linkColour" to={`/article/${article.article_id}`}>{article.author}</Link></p>
            <div className="articleLikes">
                <i>
                    <AiFillLike onClick={() => handleClick(article.article_id, 1)} />
                </i>
                <p>{likes[article.article_id] || article.likes}</p>
                <i>
                    <AiFillDislike onClick={() => handleClick(article.article_id, -1)} />
                </i>
            </div>
            <Link to={`/article/${article.article_id}`}>
                <img className="articleImg" src={article.article_img_url}></img>
            </Link>
            <p className="articleDate">{isoStringToDate(article.created_at)}</p>
        </li >
    ))

    return (
        <ul className="articleContainer">{articles}</ul>
    )
}
export default AllArticlesList;