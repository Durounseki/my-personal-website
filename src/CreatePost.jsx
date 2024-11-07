import { useContext, useRef, useEffect, useState } from "react";
import { EditorContext } from './EditorContext.jsx'
import { useLocation } from 'react-router-dom';

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
    const editorRef =  useRef(null);
    const location =  useLocation();
    const title = localStorage.getItem('currentPost-title') === "" ? 'Title' : localStorage.getItem('currentPost-title');

    useEffect(()=>{
        if(!editorRef.current){
            initEditor();
            editorRef.current = true;
        }
    },[]);

    const savePost = async (event) => {
        event.preventDefault();
        const body = await editorInstanceRef.current.save();
        console.log("title:", title, "body:", body);
        
    }

    return (
        <>
        <h1>{title}</h1>
        <div className="editorjs" id="editorjs"></div>
        <form action="" className="save-post" onSubmit={savePost}>
            <button type="submit">Save</button>
        </form>
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