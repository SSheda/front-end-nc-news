import { useParams } from 'react-router-dom';

function Article() {
    const { article_id } = useParams();
    return (
        <div>
            <h1>SingleArticle Page</h1>
        </div>
    )
}

export default Article