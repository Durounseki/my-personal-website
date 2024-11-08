import { useContext, useRef, useEffect, useState } from "react";
import { EditorContext } from './EditorContext.jsx'
import { useLocation, useNavigate } from 'react-router-dom';
import './CreatePost.css';

const defaultData = {
    blocks: [
        {
            type: 'header',
            data: {
                text: 'Title',
                level: 1
            }
        },
        {
            type: 'paragraph',
            data: {
                text: 'Begin here...'
            }
        }
    ]
}

function CreatePost(){
    const {initEditor, editorInstanceRef} = useContext(EditorContext);
    const bodyRef =  useRef(null);
    const summaryRef = useRef(null);
    const location =  useLocation();
    const navigate = useNavigate();
    const title = localStorage.getItem('currentPost-title') === "" ? 'Title' : localStorage.getItem('currentPost-title');
    const [keywords,setKeywords] = useState(localStorage.getItem('post-keywords').split(", "));
    const keywordsRef = useRef(null);
    const [category,setCategory] = useState(localStorage.getItem('post-category'));

    useEffect(()=>{
        if(!bodyRef.current){
            initEditor('post-body');
            bodyRef.current = true;
        }
    },[]);

    useEffect(()=>{
        if(!summaryRef.current){
            initEditor('post-summary');
            summaryRef.current = true;
        }
    },[]);

    const savePost = async (event, published=false) => {
        event.preventDefault();
        const body = await editorInstanceRef.current.save();
        const readingTime = 0;
        const data = {
            categoryName: category,
            title: title,
            summary: summary,
            body: body,
            published: published,
            readingTime: readingTime,
            keywords: keywords,
        }
        console.log("title:", title, "body:", body);
        
    }

    const savePostAndClose = async (event) => {
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

    return (
        <>
        <h1>{title}</h1>
        <div className="postEditor-container">
            <div id="post-body"></div>
            
            <div className="save-post">
                <form onSubmit={savePost}>
                    <button type="submit">Save</button>
                </form>
                <form onSubmit={savePostAndClose}>
                    <button type="submit">Save & Close</button>
                </form>
            </div>
        </div>
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
                        {keywords.map((word,index) => (
                            <li key={index} className="keyword">
                                {word}
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
                <form onSubmit={savePost}>
                    <button type="submit">Save</button>
                </form>
                <form onSubmit={savePostAndClose}>
                    <button type="submit">Save & Close</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default CreatePost;

// let editor = null;
        // if(!isReady){
            
        //     editor = new EditorJS({
        //         holder: "editorjs",
        //         tools: {
        //             header: {
        //                 class: Header,
        //                 inlineToolbar: ['link']
        //             },
        //             list: {
        //                 class: List,
        //                 inlineToolbar: ['bold', 'italic', 'link']
        //             },
        //             paragraph: {
        //                 class: Paragraph,
        //                 inlineToolbar: true
        //             },
        //             code: {
        //                 class: CodeTool,
        //                 shortcut: 'CMD+SHIFT+C'
        //             },
        //             inlineCode: {
        //                 class: InlineCode
        //             }
        //         },
        //         autofocus: true,
        //         onChange: async () => {
        //             const content = await editor.save();
        //             localStorage.setItem('editorjs-content',JSON.stringify(content));
        //             setEditorData(content);
        //         },
        //         onReady: async () => {
        //             editorRef.current = editor;
        //             try{
        //                 const savedData = localStorage.getItem('editorjs-content');
        //                 if(savedData){
        //                     await editor.render(JSON.parse(savedData));
        //                 }
        //                 const initialData = await editor.save();
        //                 setEditorData(initialData);
                        
        //             }catch(error){
        //                 console.log("Error initializing or loading data:", error)
        //             }
        //         }
        //     });
            // initEditor();