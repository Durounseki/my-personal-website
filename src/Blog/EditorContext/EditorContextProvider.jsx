import { useRef, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@coolbytes/editorjs-paragraph";
import InlineCode from "@editorjs/inline-code";
import PropTypes from "prop-types";
import EditorContext from "./EditorContext";
import MonkeyCode from "./MonkeyCode";

function EditorContextProvider({ children }) {
  const [isMobile, setIsMobile] = useState();
  console.log("mobile:", isMobile);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const editorInstanceRef = useRef({});

  const initEditor = (holderId, initialData, published) => {
    const editor = new EditorJS({
      holder: holderId,
      placeholder: "Start your post here.",
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link"],
        },
        list: {
          class: List,
          inlineToolbar: ["bold", "italic", "link"],
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        code: {
          class: MonkeyCode,
          shortcut: "CMD+SHIFT+C",
          config: {
            isMobile: isMobile,
          },
        },
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+M",
        },
      },
      readOnly: published,
      autofocus: true,
      onChange: async () => {
        const content = await editor.save();
        localStorage.setItem(holderId, JSON.stringify(content));
      },
      onReady: async () => {
        editorInstanceRef.current[holderId] = editor;
        try {
          if (initialData) {
            await editor.render(JSON.parse(initialData));
          } else {
            const savedData = localStorage.getItem(holderId);
            if (savedData) {
              await editor.render(JSON.parse(savedData));
            }
          }
        } catch (error) {
          throw new Error(
            `Error initializing or loading data for "${holderId}":, ${error.message}`
          );
        }
      },
    });
  };
  return (
    <EditorContext.Provider value={{ initEditor, editorInstanceRef }}>
      {children}
    </EditorContext.Provider>
  );
}

EditorContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EditorContextProvider;
