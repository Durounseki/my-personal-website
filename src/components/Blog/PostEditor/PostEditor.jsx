import { useContext, useRef, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { EditorContext } from "../../EditorContext";
import { useAuth } from "../../../data/auth";
import DOMPurify from "dompurify";

function PostEditor({ mode, initialData = null }) {
  const { initEditor, editorInstanceRef } = useContext(EditorContext);
  const { savePost, csrfToken } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState([]);
  const isEditingMode = mode === "edit" || mode === "create";

  const bodyInit = useRef(false);
  const summaryInit = useRef(false);

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
      if (!bodyInit.current) {
        await initEditor("post-body", bodyData, !isEditingMode);
        bodyInit.current = true;
      }
      if (isEditingMode && !summaryInit.current) {
        await initEditor("post-summary", summaryData, false);
        summaryInit.current = true;
      }
    };

    startEditors();
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
      published: initialData?.published || false,
      keywords: keywords.map((k) => DOMPurify.sanitize(k)),
      _csrf: csrfToken,
    };

    savePost({ postId: initialData?.id, data, willClose });
  };

  return (
    <>
      {!isEditingMode ? (
        <h1 id="post-title">{title}</h1>
      ) : (
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(DOMPurify.sanitize(e.target.value))}
        />
      )}

      <div className="postEditor-container">
        <div id="post-body"></div>
        {isEditingMode && (
          <div className="save-post">
            <button onClick={handleSavePost}>Save</button>
            <button onClick={(e) => handleSavePost(e, true)}>
              Save & Close
            </button>
          </div>
        )}
      </div>

      {isEditingMode && (
        <div className="postEditor-container">
          <div className="post-details">
            <span className="postEditor-label">Category</span>
            <div className="category-container">
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <span className="postEditor-label">Summary</span>
            <div className="summary-container">
              <div id="post-summary"></div>
            </div>
            <span className="postEditor-label">Keywords</span>
            <div className="keywords-container">
              <ul>
                {keywords.map((kw, i) => (
                  <li key={i} className="keyword">
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
              <input
                type="text"
                value={keywords.join(", ")}
                onChange={(e) => setKeywords(e.target.value.split(", "))}
              />
            </div>
          </div>
          <div className="save-post">
            <button onClick={handleSavePost}>Save</button>
            <button onClick={(e) => handleSavePost(e, true)}>
              Save & Close
            </button>
          </div>
        </div>
      )}

      <ul className="post-navigation">
        <li>
          <Link to="/blog">Back to Blog</Link>
        </li>
      </ul>
    </>
  );
}

export default PostEditor;
