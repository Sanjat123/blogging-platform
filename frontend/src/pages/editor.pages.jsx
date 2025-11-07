import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Navigate, useParams } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";
import { createContext } from 'react';
import Loader from "../components/loader.component";
import axios from "axios";


const blogStructure = {
    title: '',
    banner: '',
    content: [],  
    tags: [],
    des: '',
    author: { personal_info: { username: '', fullname: '', profile_img: '' } }
}

export const EditorContext = createContext({});

const Editor = () => {

    let { blog_id } = useParams();

    const [blog, setBlog] = useState(blogStructure);
    const [editorState, setEditorState] = useState("editor");
    const [textEditor, setTextEditor] = useState({ isReady: false });
    const [loading, setLoading] = useState(true);

    let { userAuth } = useContext(UserContext);
    let access_token = userAuth?.access_token || null;

    useEffect(() => {

        if (!blog_id) {
            setLoading(false);
            return;
        }

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id, draft: true, mode: 'edit' })
            .then(({ data }) => {
                setBlog(data?.blog || blogStructure); // fallback if null
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching blog:", err.message);
                setBlog(blogStructure); // fallback
                setLoading(false);
            });

    }, [blog_id]);

    // Safe rendering: don't crash if blog is null
    const renderEditor = () => {
        if (!blog) return <Loader />;
        return editorState === "editor" ? <BlogEditor /> : <PublishForm />;
    }

    if (!access_token) return <Navigate to="/signin" />;

    return (
        <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor }}>
            {loading ? <Loader /> : renderEditor()}
        </EditorContext.Provider>
    );
}

export default Editor;
