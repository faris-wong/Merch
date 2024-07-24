import React from "react";
import ReactDOM from "react-dom";

const Overlay = (props) => {
  return (
    <>
      <h1>hello</h1>

      <button onClick={() => props.setShowRegister(false)}>cancel</button>
    </>
  );
};

const Register = (props) => {
  //   return <div>YOOOO</div>;
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay setShowRegister={props.setShowRegister} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default Register;
