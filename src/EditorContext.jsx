import {createContext, useRef, useState} from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@coolbytes/editorjs-paragraph';
import CodeTool from '@editorjs/code';


export const EditorContext = createContext()

function EditorContextProvider(props){
    const editorInstanceRef = useRef({});
    const [editorData, setEditorData] = useState(null);
    const [savedData, setSavedData] = useState(null);

    const initEditor = (holderId,initialData,published) => {
        const editor = new EditorJS({
            holder: holderId,
            placeholder: "Start your post here.",
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['link']
                },
                list: {
                    class: List,
                    inlineToolbar: ['bold', 'italic', 'link']
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true
                },
                code: {
                    class: CodeTool,
                    shortcut: 'CMD+SHIFT+C'
                }
            },
            readOnly: published,
            autofocus: true,
            onChange: async () => {
                const content = await editor.save();
                localStorage.setItem(holderId,JSON.stringify(content));
                setEditorData(content);
            },
            onReady: async () => {
                editorInstanceRef.current[holderId] = editor;
                try{
                    if(initialData){
                        await editor.render(JSON.parse(initialData));
                    }else{
                        const savedData = localStorage.getItem(holderId);
                        if(savedData){
                            await editor.render(JSON.parse(savedData));
                        }
                        const initialData = await editor.save();
                        setEditorData(initialData);
                    }
                }catch(error){
                    console.log("Error initializing or loading data:", error)
                }
            }
        });
        // editorInstanceRef.current = editor;
    }
    return (
        <EditorContext.Provider value={{initEditor, editorInstanceRef}}>
            {props.children}
        </EditorContext.Provider>
    )
}

export default EditorContextProvider;