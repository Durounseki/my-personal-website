import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const usePost = (postId) =>{
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiRootUrl = "http://localhost:8080";

    useEffect(() => {
        fetch(`${apiRootUrl}/api/blog/posts/${postId}`, {mode: "cors"})
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then((data) => setPost(data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },[postId]);
    return {post, loading, error};
}

function BlogPost(){
    const {id} = useParams();
    const {post, loading, error} = usePost(id);

    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>A network error was encountered</p>
    }

    if(!post){
        return <p>Post not found</p>
    }

    return(
        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.body)}}></div>
    )
}

export default BlogPost;