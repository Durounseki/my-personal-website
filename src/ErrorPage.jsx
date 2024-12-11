import { useRouteError } from "react-router-dom"
function ErrorPage(){
    const error = useRouteError()
    console.error(error);

    let errorMessage = "Something went wrong!";
    let errorDescription = "I apologize for the inconvenience. Please try again later."

    if(error.status === 404){
        errorMessage = "Opos!";
        errorDescription = "It seems you got lost!"
    }else if(error.status === 500){
        errorMessage = "Server Error";
        errorDescription = "The server is experiencing some issues. Please try again later."
    }

    return (
        <section className="error-page">
            <h1>{errorMessage}</h1>
            <p>{errorDescription}</p>
            {error && (
                <div>
                    <p>Error details:</p>
                    <pre>{error.statusText || error.message}</pre>
                </div>
            )
            }
        </section>
    )
}
export default ErrorPage;