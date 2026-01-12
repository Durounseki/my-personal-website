import { useContext, useRef, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { EditorContext } from "../../EditorContext";
import { useAuth } from "../../../data/auth";
import DOMPurify from "dompurify";
import styles from "./styles.module.css";

function PostEditor({ mode, initialData = null }) {
  const { initEditor, editorInstanceRef } = useContext(EditorContext);
  const { savePost, csrfToken } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState([]);

  const isEditingMode = mode === "edit" || mode === "create";
  console.log(mode);
  console.log("editing?", isEditingMode);

  const bodyRef = useRef(false);
  const summaryRef = useRef(false);

  useEffect(() => {
    if (mode === "create") {
      setTitle(localStorage.getItem("post-title") || "");
      setCategory(localStorage.getItem("post-category") || "");
      const savedK = localStorage.getItem("post-keywords");
      setKeywords(savedK ? savedK.split(", ") : []);
    } else if (initialData) {
      setTitle(initialData.title || "");
      setCategory(initialData.category?.name || "");
      setKeywords(initialData.keywords?.map((k) => k.name) || []);
    }
  }, [initialData, mode]);

  useEffect(() => {
    const bodyData = initialData?.body || null;
    const summaryData = initialData?.summary || null;

    const startEditors = async () => {
      if (!bodyRef.current) {
        const bodyEl = document.getElementById("post-body");
        if (bodyEl) bodyEl.innerHTML = "";

        await initEditor("post-body", bodyData, !isEditingMode);
        bodyRef.current = true;
      }

      if (isEditingMode && !summaryRef.current) {
        const summaryEl = document.getElementById("post-summary");
        if (summaryEl) summaryEl.innerHTML = "";

        await initEditor("post-summary", summaryData, false);
        summaryInit.current = true;
      }
    };

    startEditors();

    return () => {
      ["post-body", "post-summary"].forEach((id) => {
        if (editorInstanceRef.current[id]) {
          editorInstanceRef.current[id].destroy?.();
          delete editorInstanceRef.current[id];
        }
      });
      bodyRef.current = false;
      summaryRef.current = false;
    };
  }, [initialData, isEditingMode, initEditor]);

  const handleSavePost = async (event, willClose = false) => {
    if (event) event.preventDefault();
    const body = await editorInstanceRef.current["post-body"].save();
    const summary = await editorInstanceRef.current["post-summary"].save();

    const data = {
      categoryName: DOMPurify.sanitize(category),
      title: title,
      summary: JSON.stringify(summary),
      body: JSON.stringify(body),
      published: false,
      readingTime: 0,
      keywords: keywords.map((k) => DOMPurify.sanitize(k)),
      _csrf: csrfToken,
    };

    if (mode === "create" && !willClose) {
      localStorage.setItem("post-title", title);
      localStorage.setItem("post-category", category);
      localStorage.setItem("post-keywords", keywords.join(", "));
      return;
    }
    savePost({ postId: initialData?.id, data, willClose });
  };

  return (
    <>
      {!isEditingMode ? (
        <h1 id={styles["post-title"]}>{title}</h1>
      ) : (
        <input
          id={styles["post-title"]}
          type="text"
          value={title}
          onChange={(e) => {
            const val = DOMPurify.sanitize(e.target.value);
            setTitle(val);
            if (mode === "create") localStorage.setItem("post-title", val);
          }}
        />
      )}

      <div className={styles["postEditor-container"]}>
        <div id="post-body"></div>
        {isEditingMode && (
          <div className={styles["save-post"]}>
            <form onSubmit={handleSavePost}>
              <button type="submit">Save</button>
            </form>
            <form onSubmit={(e) => handleSavePost(e, true)}>
              <button type="submit">Save & Close</button>
            </form>
          </div>
        )}
      </div>

      {isEditingMode && (
        <div className={styles["postEditor-container"]}>
          <div className={styles["post-details"]}>
            <span className={styles["postEditor-label"]}>Category</span>
            <div className="category-container">
              <form>
                <input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </form>
            </div>
            <span className={styles["postEditor-label"]}>Summary</span>
            <div className={styles["summary-container"]}>
              <div id="post-summary"></div>
            </div>
            <span className={styles["postEditor-label"]}>Keywords</span>
            <div className={styles["keywords-container"]}>
              <ul>
                {keywords.map((kw, i) => (
                  <li key={i} className={styles.keyword}>
                    {kw}{" "}
                    <i
                      className="fa-solid fa-x"
                      onClick={() =>
                        setKeywords(keywords.filter((k) => k !== kw))
                      }
                    ></i>
                  </li>
                ))}
              </ul>
              <form>
                <input
                  type="text"
                  value={keywords.join(", ")}
                  onChange={(e) => setKeywords(e.target.value.split(", "))}
                />
              </form>
            </div>
          </div>
          <div className={styles["save-post"]}>
            <form onSubmit={handleSavePost}>
              <button type="submit">Save</button>
            </form>
            <form onSubmit={(e) => handleSavePost(e, true)}>
              <button type="submit">Save & Close</button>
            </form>
          </div>
        </div>
      )}

      <ul className={styles["post-navigation"]}>
        <li>
          <Link to="/blog">Back to Blog</Link>
        </li>
      </ul>
    </>
  );
}

export default PostEditor;
