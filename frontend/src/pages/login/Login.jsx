import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useContext, useRef } from "react";
import { Context } from "../../context/Context";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  // console.log(isFetching);
  return (
    <div className="login">
      <span className="loginTitle"> Login </span>{" "}
      <form className="loginForm" onSubmit={handleSubmit}>
        <label> Username </label>{" "}
        <input type="text" placeholder="Enter Your Username..." ref={userRef} />{" "}
        <label> Password </label>{" "}
        <input
          type="password"
          placeholder="Enter Your Password..."
          ref={passwordRef}
        />{" "}
        <button className="loginButton"> Login </button>{" "}
      </form>{" "}
      <button className="loginRegisterButton" disabled={isFetching}>
        {" "}
        <Link to="/register" className="link">
          {" "}
          Register{" "}
        </Link>{" "}
      </button>{" "}
    </div>
  );
}
