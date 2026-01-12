import { useRef, useEffect, useState, useCallback } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@coolbytes/editorjs-paragraph";
import InlineCode from "@editorjs/inline-code";
import PropTypes from "prop-types";
import EditorContext from "./EditorContext";
import MonkeyCode from "./MonkeyCode";

function EditorContextProvider({ children }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 600 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const editorInstanceRef = useRef({});
  const initializingRef = useRef(new Set());

  const initEditor = useCallback(
    async (holderId, initialData, published) => {
      if (initializingRef.current.has(holderId)) return;

      if (editorInstanceRef.current[holderId]) {
        try {
          const existing = editorInstanceRef.current[holderId];
          await existing.isReady;
          existing.destroy();
          delete editorInstanceRef.current[holderId];
        } catch (e) {
          console.error(e);
        }
      }

      initializingRef.current.add(holderId);

      const editor = new EditorJS({
        holder: holderId,
        placeholder: "Start your post here.",
        tools: {
          header: { class: Header, inlineToolbar: ["link"] },
          list: { class: List, inlineToolbar: ["bold", "italic", "link"] },
          paragraph: { class: Paragraph, inlineToolbar: true },
          code: {
            class: MonkeyCode,
            shortcut: "CMD+SHIFT+C",
            config: { isMobile },
          },
          inlineCode: { class: InlineCode, shortcut: "CMD+M" },
        },
        readOnly: !!published,
        autofocus: true,
        onChange: async () => {
          const content = await editor.save();
          localStorage.setItem(holderId, JSON.stringify(content));
        },
        onReady: async () => {
          editorInstanceRef.current[holderId] = editor;
          initializingRef.current.delete(holderId);
          try {
            if (initialData) {
              await editor.render(JSON.parse(initialData));
            } else {
              const savedData = localStorage.getItem(holderId);
              if (savedData) await editor.render(JSON.parse(savedData));
            }
          } catch (error) {
            console.error(error);
          }
        },
      });
      editorInstanceRef.current[holderId] = editor;
    },
    [isMobile]
  );

  return (
    <EditorContext.Provider value={{ initEditor, editorInstanceRef }}>
      {children}
    </EditorContext.Provider>
  );
}

EditorContextProvider.propTypes = { children: PropTypes.node.isRequired };
export default EditorContextProvider;
