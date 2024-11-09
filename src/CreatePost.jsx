import { useContext, useRef, useEffect, useState } from "react";
import { EditorContext } from './EditorContext.jsx'
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import './CreatePost.css';

const useEditor = (postId) =>{
    const {initEditor} = useContext(EditorContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState(null);
    const [initialCategory, setInitialCategory] = useState(null);
    const [initialKeywords, setInitialKeywords] = useState([]);
    const [published, setPublished] = useState(false);
    const titleRef = useRef(null)
    const bodyRef =  useRef(null);
    const summaryRef = useRef(null);
    const apiRootUrl = "http://localhost:8080";

    useEffect(() => {
        fetch(`${apiRootUrl}/api/blog/posts/${postId}`, {mode: "cors"})
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then((data) => {
            // if(!titleRef.current){
            //     initEditor('post-title',data.title);
            //     titleRef.current = true;
            // }
            if(!bodyRef.current){
                initEditor('post-body',data.body,data.published);
                bodyRef.current = true;
            }
            if(!summaryRef.current){
                initEditor('post-summary',data.summary,data.published);
                summaryRef.current = true;
            }
            setTitle(data.title);
            setInitialCategory(data.category.name);
            setInitialKeywords(data.keywords.map(keyword => keyword.name));
            setPublished(data.published);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },[]);

    return {title, initialCategory, initialKeywords, published, loading, error};
}

function CreatePost(){
    const {id} = useParams();
    const { savePost } = useAuth();
    const { editorInstanceRef} = useContext(EditorContext);
    const { title, initialCategory, initialKeywords, published, loading, error} = useEditor(id);
    console.log("initial category", initialCategory, "initial keywords", initialKeywords);
    const [keywords, setKeywords] = useState([]);
    const [category, setCategory] = useState('');
    // const [postId, setPostId] = useState(null);
    // const location =  useLocation();
    const navigate = useNavigate();
    // const title = localStorage.getItem('currentPost-title') === "" ? 'Title' : localStorage.getItem('currentPost-title');
    // const [keywords,setKeywords] = useState(localStorage.getItem('post-keywords').split(", "));
    const keywordsRef = useRef(null);

    useEffect(() => {
        setKeywords(initialKeywords);
        setCategory(initialCategory);
    },[initialKeywords,initialCategory]);

    const estimateReadingTime= (data,wpm=250,lpm=30) => {
        let wordCount = 0;
        let linesOfCode = 0;
        let readingTime;
        data.blocks.forEach(block => {
            if(block.type === 'paragraph' || block.type === 'header'){
                const text = block.data.text || '';
                wordCount += text.trim().split(/\s+/).length;
            }else if(block.type === 'code'){
                const code = block.data.code || '';
                linesOfCode += code.split('\n').filter(line => line.trim() !== '').length;
            }
        });
        readingTime = Math.ceil(wordCount / wpm) + Math.ceil(linesOfCode / lpm);
        return readingTime;
    }

    const handleSavePost = async (event, published=false) => {
        event.preventDefault();
        const body = await editorInstanceRef.current['post-body'].save();
        const readingTime = estimateReadingTime(body);
        const summary = await editorInstanceRef.current['post-summary'].save();
        const data = {
            categoryName: category,
            title: title,
            summary: JSON.stringify(summary),
            body: JSON.stringify(body),
            published: published,
            readingTime: readingTime,
            keywords: keywords,
        }
        await savePost(postId, data, false);
    }

    const handleSavePostAndClose = async (event) => {
        savePost();
        navigate('/blog');
    }

    const publishPost = async (event) => {
        savePost(publish=true);
    }

    const handleKeywords = (event) => {
        setKeywords(event.target.value.split(", "));
        localStorage.setItem('post-keywords', event.target.value);
    }

    const removeKeyword = (event,word) => {
        keywordsRef.stopPropagation();
        const filteredKeywords = keywords.filter(keyword => keyword !== word).join(", ");
        setKeywords(filteredKeywords);
    }

    // if(loading){
    //     return <p>Loading...</p>
    // }

    // if(error){
    //     return <p>A network error was encountered</p>
    // }

    return (
        <>
        <h1>{title}</h1>
        {/* <div id="post-title"></div> */}
        <div className="postEditor-container">
            <div id="post-body"></div>
            
            {!published && (
                <div className="save-post">
                    <form onSubmit={handleSavePost}>
                        <button type="submit">Save</button>
                    </form>
                    <form onSubmit={handleSavePostAndClose}>
                        <button type="submit">Save & Close</button>
                    </form>
                </div>
            )}
        </div>
        {!published && (
            <div className="postEditor-container">
                <div className="post-details">
                    <span>Category</span>
                    <div className="category-container">
                        <form>
                            <input
                                id="category"
                                name="category"
                                type="text"
                                value={category}
                                onChange= {e => setCategory(e.target.value)}
                            />
                        </form>
                    </div>
                    <span>Summary</span>
                    <div className="summary-container">
                        <div id="post-summary"></div>
                    </div>
                    <span>Keywords</span>
                    <div className="keywords-container">
                        <ul>
                            {keywords.map((keyword,index) => (
                                <li key={index} className="keyword">
                                    {keyword}
                                    <i className="fa-solid fa-x" onClick={(event) => removeKeyword(event,word)}></i>
                                </li>
                            ))}
                        </ul>
                        <form>
                            <input
                                id="keywords"
                                name="keywords"
                                type="text"
                                value={keywords.join(", ")}
                                onChange= {handleKeywords}
                                ref={keywordsRef}
                            />
                        </form>
                    </div>
                </div>
                <div className="save-post">
                    <form onSubmit={handleSavePost}>
                        <button type="submit">Save</button>
                    </form>
                    <form onSubmit={handleSavePostAndClose}>
                        <button type="submit">Save & Close</button>
                    </form>
                </div>
            </div>
        )}
        </>
    )
}

export default CreatePost;