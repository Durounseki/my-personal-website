import { useParams } from "react-router-dom";

function BlogPost(){
    const {id} = useParams();

    return(
        <p>{id}</p>
    )
}

export default BlogPost;