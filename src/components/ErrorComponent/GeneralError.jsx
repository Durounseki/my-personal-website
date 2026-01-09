import ErrorComponent from ".";

function GeneralError({ error }) {
  return <ErrorComponent error={error} isNotFound={false} />;
}

export default GeneralError;
