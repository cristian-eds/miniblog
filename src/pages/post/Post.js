import React from 'react'
import styles from './Post.module.css';

//hooks
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {
    const { id } = useParams();

    const { document: post, loading } = useFetchDocument("posts", id);

    return (
        <div>
            {loading &&  <p>Carregando Post ...</p> }
            {post && (
                <>
                    <h1>
                        {post.title}
                    </h1>
                </>
            )}
        </div>
    )
}

export default Post