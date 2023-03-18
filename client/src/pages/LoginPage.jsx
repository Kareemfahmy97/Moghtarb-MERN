import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  async function loginSubmitHandler(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setUser(data);
      alert("Login Successfully");
      navigate("/");
    } catch (e) {
      alert(`Login Failed, ${e.response.data}`);
    }
  }
  return (
    <div className=" grow flex items-center justify-around">
      <div className="mb-32">
        <h2 className="text-4xl text-center my-5">Login</h2>
        <form
          action=""
          className=" max-w-md mx-auto "
          onSubmit={loginSubmitHandler}
        >
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
          <button className="primary">Login</button>
          <div className="text-center py-3 text-gray-500">
            Don't have an account yet?
            <Link to={"/register"} className="underline text-black">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
