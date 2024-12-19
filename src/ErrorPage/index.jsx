import { useRouteError } from "react-router-dom";
import './style.css';
function ErrorPage(){
    const error = useRouteError();

    let errorMessage = "Something went wrong!";
    let errorDescription = "I apologize for the inconvenience. Please try again later."

    if(error.status === 404){
        errorMessage = error.status;
        errorDescription = "It seems you got lost!"
    }else if(error.status === 500){
        errorMessage = "Server Error";
        errorDescription = "The server is experiencing some issues. Please try again later."
    }

    return (
        <section className="error-page">
            <h1>{errorMessage}</h1>
            <div className="error-description">
                <h2>{errorDescription}</h2>
                {error && (
                    <>
                        <p>Error details:</p>
                        <pre>{error.statusText || error.message}</pre>
                    </>
                )
                }
            </div>
            <a href="/">Back home</a>
        </section>
    )
}
export default ErrorPage;