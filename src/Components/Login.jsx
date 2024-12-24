import { useState } from "react";
// import { useEffect } from "react";
import { useContext } from "react";
// import { UserContext } from "../../App";
// import axios from "axios";

const Login = () => {

  let name, value;
  const [user, setUser] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <div className="main-body-login">
        {/* Form Starts Here */}
        <form className="loginForm" action="/api/login" method="POST">
          <section className="loginSection">
            {" "}


            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>{" "}
            <span></span> <span></span> <span></span> <span></span>


            <div className="signin">

              <div className="content">

                <h2>Login</h2>

                <div className="form">

                  <div className="inputBox">
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      required
                    />{" "}
                    <i>Email</i>
                  </div>

                  <div className="inputBox">
                    <input
                      type="password"
                      name="password"
                      onChange={handleInput}
                      required
                    />{" "}
                    <i>Password</i>
                  </div>

                  <div className="links">
                    {" "}
                    <a href="#">Forgot Password</a> <a href="#">Signup</a>
                  </div>

                  <div className="inputBox ">
                    <input type="reset" value="Reset" className="resetbtn" />
                  </div>
                  <div className="inputBox">
                    <input type="submit" value="Login" />
                  </div>
                </div>

              </div>

            </div>
          </section>

        </form>

      </div>
    </>
  );
};

export default Login;
