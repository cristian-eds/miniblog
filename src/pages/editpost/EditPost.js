import React, { useEffect } from "react";
import styles from "./EditPost.module.css";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {

    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);

            const textTags = post.tags.join(", ");
            setTags(textTags);
        }
    }, [post])

    const { user } = useAuthValue();

    const { insertDocument, response } = useInsertDocument("posts");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        //validate image URL
        try {
            new URL(image);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL");
        }

        // criar array de tags 
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        // checar valores
        if (!title || !image || !tags || !body) {
            setFormError("Por favor, preencha todos os campos!");
        }

        if (formError) return;


        insertDocument({
            title,
            image,
            tags: tagsArray,
            body,
            uid: user.uid,
            createdBy: user.displayName,
        });

        // redirect  Home Page
        navigate("/")
    };

    return (
        <div className={styles.edit_post}>
            {post && <>
                <h2>Editando Post: {post.title}</h2>
                <p>Altere os dados do post como deseja...</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Título:</span>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="Pense em um bom título..."
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </label>
                    <label>
                        <span>Url da imagem:</span>
                        <input
                            type="text"
                            name="image"
                            required
                            placeholder="Insira uma imagem"
                            onChange={(e) => setImage(e.target.value)}
                            value={image}
                        />
                    </label>
                    <p className={styles.preview_title}>Preview da imagem atual:</p>
                    <img className={styles.img_preview} src={post.image} alt={post.title} />
                    <label>
                        <span>Conteúdo:</span>
                        <textarea
                            name="body"
                            required
                            placeholder="Insira o conteúdo do post"
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                        ></textarea>
                    </label>
                    <label>
                        <span>Tags:</span>
                        <input
                            type="text"
                            name="tags"
                            required
                            placeholder="Insira as tags separadas por víruglas"
                            onChange={(e) => setTags(e.target.value)}
                            value={tags}
                        />
                    </label>
                    {!response.loading && <button className="btn">Editar</button>}
                    {response.loading && (
                        <button className="btn" disabled>
                            Aguarde...
                        </button>
                    )}
                    {response.error && <p className="error">{response.error}</p>}
                    {formError && <p className="error">{formError}</p>}
                </form>

            </>}
        </div>
    );
};

export default EditPost;