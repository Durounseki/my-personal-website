import styles from "./style.module.css";

export default function ErrorComponent({ error, isNotFound }) {
  let errorMessage = "Something went wrong!";
  let errorDescription =
    "I apologize for the inconvenience. Please try again later.";

  if (isNotFound) {
    errorMessage = "404";
    errorDescription = "It seems you got lost!";
  } else if (error?.status === 500) {
    errorMessage = "Server Error";
    errorDescription =
      "The server is experiencing some issues. Please try again later.";
  }

  return (
    <section className={styles["error-page"]}>
      <h1>{errorMessage}</h1>
      <div className={styles["error-description"]}>
        <h2>{errorDescription}</h2>
        {error && !isNotFound && (
          <>
            <p>Error details:</p>
            <pre>{error.message || "Unknown error"}</pre>
          </>
        )}
      </div>
      <a href="/">Back home</a>
    </section>
  );
}
