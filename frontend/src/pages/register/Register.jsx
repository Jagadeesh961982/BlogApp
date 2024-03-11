import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";

import React, { useState } from "react";

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    try {
      console.log("working");
      const res = await axios.post("/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      console.log(err);
      alert("user already exits with same credentials");
    }
  };
  return (
    <div className="register">
      <span className="registerTitle"> Register </span>{" "}
      <form className="registerForm" onSubmit={handleSubmit}>
        <label> Username </label>{" "}
        <input
          type="text"
          placeholder="Enter Your Username"
          onChange={(e) => setUserName(e.target.value)}
        />{" "}
        <label> Email </label>{" "}
        <input
          type="email"
          placeholder="Enter Your Email..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />{" "}
        <label> Password </label>{" "}
        <input
          type="password"
          placeholder="Enter Your Password..."
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <button className="registerButton" type="submit">
          {" "}
          Register{" "}
        </button>{" "}
      </form>{" "}
      <button className="registerLoginButton">
        {" "}
        <Link className="link" to="/login">
          {" "}
          Login{" "}
        </Link>{" "}
      </button>{" "}
    </div>
  );
}
