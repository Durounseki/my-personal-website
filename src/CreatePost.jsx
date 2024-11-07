import { useContext, useRef, useEffect, useState } from "react";
import { EditorContext } from './EditorContext.jsx'
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import CodeTool from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
// import LinkTool from "@editorjs/link";
import Paragraph from "@coolbytes/editorjs-paragraph";

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
    const {initEditor} = useContext(EditorContext);
    const editorRef =  useRef(null);
    useEffect(()=>{
        if(!editorRef.current){
            initEditor();
            editorRef.current = true;
        }
    },[]);

    return (
        <>
        <div className="editorjs" id="editorjs"></div>
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