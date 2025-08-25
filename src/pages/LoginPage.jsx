import { FaUser, FaLock, FaUnlock } from "react-icons/fa";
import loginImg from "../assets/syrien trading logo - 1 .jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../services/AuthServices";
import { checkShift } from "../services/ShiftServices";

export default function LoginPage() {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [errInLogining, setErrInLogining] = useState(undefined);

  const navigate = useNavigate();

  function handelShowPassword() {
    setShowPassword((prev) => !prev);
  }
  function handelInputChange(event) {
    const { name, value } = event.target;
    setLoginCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }
  async function handelSubmit(event) {
    event.preventDefault();
    setErrInLogining(undefined);
    try {
      setisLoading(true);
      const apiCallResponse = await Login(loginCredentials);
      localStorage.setItem(
        "loginInfo",
        JSON.stringify({
          token: apiCallResponse.token,
          warehouseId: apiCallResponse.warehouseId,
        })
      );
      await checkShift();
      setisLoading(false);
      navigate("/shift-start", { replace: true });
      // navigate("/", { replace: true });
    } catch (error) {
      if (error.response.data?.status === 400) {
        navigate("/shift-start");
      }
      setisLoading(false);
      setErrInLogining(error.response.data.message);
    }
  }
  return (
    <div className="login-page">
      <div className="Loign-container">
        <img src={loginImg} className="login-img"></img>
        <div className="login-info">
          <h1>Welcome Back</h1>
          <p>Sign in to continue managing sales efficiently.</p>
          {errInLogining && (
            <span className="login-error">{errInLogining}</span>
          )}
          <form onSubmit={handelSubmit}>
            <div className="input-field">
              <label htmlFor="username">UserName</label>
              <div className="input-container">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginCredentials.username}
                  onChange={handelInputChange}
                  placeholder="enter your user name"
                  required
                />
              </div>
            </div>

            <div className="input-field">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                {showPassword ? (
                  <FaUnlock
                    className="input-icon"
                    onClick={handelShowPassword}
                  />
                ) : (
                  <FaLock className="input-icon" onClick={handelShowPassword} />
                )}
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={loginCredentials.password}
                  onChange={handelInputChange}
                  placeholder="enter your password"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <button className={`login-btn ${isLoading ? "loading" : ""}`}>
              {isLoading ? "Loging . . ." : "login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
