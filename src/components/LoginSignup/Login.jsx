import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import "./styles.css";

export default function Login({ setToken }) {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const goTo = useNavigate();

  const handleLogin = async () => {
    setLoading(true)
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const res = await axios.post("https://7y9cdp-8081.csb.app/api/admin/login", {
        username,
        password
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      setLoading(false)
      alert("Login successfully!");
      goTo("/");
    } catch (e) {
      alert("Username or password wrong!");
      passwordRef.current.value = "";
      setLoading(false)
      console.error("Login Failed: ", e);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-box-container">
        <label className="input-description">
          <strong>User name:</strong>
        </label>
        <div className="input-box">
          <input
            type="text"
            className="username-input"
            ref={userNameRef}
          />
        </div>
      </div>
      <div className="input-box-container">
        <label className="input-description">
          <strong>Password:</strong>
        </label>
        <div className="input-box">
          <input
            type= "password"
            className="password-input"
            ref={passwordRef}
          />

        </div>
      </div>
      <div className="btn-login" onClick={handleLogin} >
                <button >Login</button>
            </div>
            <span className="navigation-msg">
                Don't have an account? 
                <span className="link-text" onClick={() => goTo('/signup')}> Register</span>
            </span>
            {loading && <div className="alert">
              <Loading/>
            </div>}
      </div>
  );
}