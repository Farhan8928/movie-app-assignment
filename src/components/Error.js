import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <>
      <h2>{err.message}</h2>
      <p>{err.status + " " + err.statusText}</p>
    </>
  );
};

export default Error;
