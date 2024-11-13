import { useContext, useRef, useEffect, useState } from "react";
import { EditorContext } from './EditorContext.jsx'
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import DOMPurify from "dompurify";
import './CreatePost.css';

const usePostData = (postId) =>{
    console.log("using db data")
    const {initEditor} = useContext(EditorContext);
    const [initialTitle, setInitialTitle] = useState(null);
    const [initialCategory, setInitialCategory] = useState(null);
    const [initialKeywords, setInitialKeywords] = useState([]);
    const [published, setPublished] = useState(false);
    const bodyRef =  useRef(null);
    const summaryRef = useRef(null);
    const apiRootUrl = "http://localhost:8080";

    useEffect(() => {
        if(postId){
            fetch(`${apiRootUrl}/api/blog/posts/${postId}`, {mode: "cors"})
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((data) => {
                console.log("title:", data.title);
                if(!bodyRef.current){
                    initEditor('post-body',data.body,data.published);
                    bodyRef.current = true;
                }
                if(!summaryRef.current){
                    initEditor('post-summary',data.summary,data.published);
                    summaryRef.current = true;
                }
                setInitialTitle(data.title);
                setInitialCategory(data.category.name);
                setInitialKeywords(data.keywords.map(keyword => keyword.name));
                setPublished(data.published);
                console.log("initial title:", initialTitle, "initial category:", initialCategory, "initial Keywords:", initialKeywords)
            })
            .catch((error) => setError(error));
        }else{
            if(!bodyRef.current){
                initEditor('post-body',null,false);
                bodyRef.current = true;
            }
            if(!summaryRef.current){
                initEditor('post-summary',null,false);
                summaryRef.current = true;
            }
            setInitialTitle(localStorage.getItem('post-title'));
            setInitialCategory(localStorage.getItem('post-category'));
        }
    },[postId]);

    return {initialTitle, initialCategory, initialKeywords, published};
}

const useLocalData = () =>{
    console.log("using local data");
    const {initEditor} = useContext(EditorContext);
    const [initialTitle, setInitialTitle] = useState(null);
    const [initialCategory, setInitialCategory] = useState(null);
    const [initialKeywords, setInitialKeywords] = useState([]);
    const published = false;
    const bodyRef =  useRef(null);
    const summaryRef = useRef(null);
    const apiRootUrl = "http://localhost:8080";
    useEffect(() => {
        if(!bodyRef.current){
            initEditor('post-body',null,false);
            bodyRef.current = true;
        }
        if(!summaryRef.current){
            initEditor('post-summary',null,false);
            summaryRef.current = true;
        }
        setInitialTitle(localStorage.getItem('post-title'));
        setInitialCategory(localStorage.getItem('post-category'));
    },[]);


    return {initialTitle, initialCategory, initialKeywords, published};
}

function CreatePost(){
    const {id} = useParams();
    console.log("id:",id);
    const { savePost } = useAuth();
    const { editorInstanceRef } = useContext(EditorContext);
    const { initialTitle, initialCategory, initialKeywords, published} = usePostData(id);
    const keywordsRef = useRef(null);
    const [keywords, setKeywords] = useState([]);
    const [category, setCategory] = useState('');
    // const [postId, setPostId] = useState(null);
    // const location =  useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState(''); 
    // const title = localStorage.getItem('currentPost-title') === "" ? 'Title' : localStorage.getItem('currentPost-title');
    // const [keywords,setKeywords] = useState(localStorage.getItem('post-keywords').split(", "));

    useEffect(() => {
        setKeywords(initialKeywords);
        setCategory(initialCategory);
        setTitle(initialTitle);
    },[initialTitle, initialCategory, initialKeywords]);
    console.log("initial title:", title, "initial category:", category, "initial Keywords:", keywords)

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

    const handleSavePost = async (event, willClose=false) => {
        event.preventDefault();
        const body = await editorInstanceRef.current['post-body'].save();
        const readingTime = estimateReadingTime(body);
        const summary = await editorInstanceRef.current['post-summary'].save();
        const data = {
            categoryName: DOMPurify.sanitize(category),
            title: title,
            summary: JSON.stringify(summary),
            body: JSON.stringify(body),
            published: published,
            readingTime: readingTime,
            keywords: keywords.map(keyword => DOMPurify.sanitize(keyword)),
        }
        await savePost(id, data, willClose);
    }

    const handleSavePostAndClose = async (event) => {
        event.preventDefault();
        await handleSavePost(event,true);
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
        {published ?
            <h1 id="post-title">{title}</h1>
            :
            <input
                id="post-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(DOMPurify.sanitize(e.target.value))}
            >
            </input>
        }
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