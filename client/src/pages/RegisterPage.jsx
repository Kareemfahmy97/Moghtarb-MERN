import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUserHandler(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registeration Successfull");
    } catch (e) {
      alert(e.message);
    }
  }
  return (
    <div className=" grow flex items-center justify-around">
      <div className="mb-32">
        <h2 className="text-4xl text-center my-5">Register</h2>
        <form onSubmit={registerUserHandler} className=" max-w-md mx-auto ">
          <input
            type="text"
            placeholder="Kareem Fahmy"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="your@email.com"
          />
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
            placeholder="Password"
          />
          <button className="primary">Register</button>
          <div className="text-center py-3 text-gray-500">
            Already a member?
            <Link to={"/login"} className="underline text-black">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
