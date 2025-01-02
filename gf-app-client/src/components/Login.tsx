import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HTTP_METHODS,
  REQUEST_FAILURE_MESSAGES,
  REQUEST_IN_PROGRESS,
  REQUEST_SUCCESS_MESSAGES,
  REQUEST_URLS,
  ROUTE_PATHS,
  SESSION_STORAGE_KEYS,
  UserLogin,
  UserRegister,
} from "../utils/constants";
import { validateEmail } from "../utils/util";
import "./Login.scss";
import useAxios from "../utils/axios";
import toast from "react-hot-toast";
import { useAuth } from "./contexts/auth-context";
import { Button } from "@mui/material";

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [register, setRegister] = useState<UserRegister>({});
  const [login, setLogin] = useState<UserLogin>({});
  const navigate = useNavigate();
  const { HttpRequestController, isRequestPending, handlePromiseRequest } = useAxios();
  const { handleLogin } = useAuth();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: ROUTE_PATHS.HOME } };
  
  const setLocalStorageData = (response: any) => {
    localStorage.setItem(SESSION_STORAGE_KEYS.TOKEN, response.token);
    localStorage.setItem(SESSION_STORAGE_KEYS.EMAIL, response.data.email);
    localStorage.setItem(SESSION_STORAGE_KEYS.USER_ID, response.data.userId);
    localStorage.setItem(SESSION_STORAGE_KEYS.USERNAME, response.data.username);
    localStorage.setItem(SESSION_STORAGE_KEYS.IS_AUTH, "true");
    navigate(from, { replace: true });
    handleLogin(true);
  };
  
  const sendLoginRequest = async () => {
    const res = await HttpRequestController(REQUEST_URLS.LOGIN, HTTP_METHODS.POST, login);
    if (res) {
      setLocalStorageData(res);
      setLogin({});
    }
  };
  
  const sendRegisterRequest = async () => {
    const payload = { ...register };
    const res = await HttpRequestController(REQUEST_URLS.REGISTER, HTTP_METHODS.POST, payload);
    if (res) {
      setLocalStorageData(res);
      setRegister({});
    }
  };
  
  const handleLoginFunction = async () => {
    if (login.email && login.password && validateEmail(login.email)) {
      handlePromiseRequest(
        sendLoginRequest,
        REQUEST_IN_PROGRESS,
        REQUEST_SUCCESS_MESSAGES.LOGGED_IN_SUCCESSFULLY,
        REQUEST_FAILURE_MESSAGES.LOGIN_FAILED
      );
    } else {
      toast.error(REQUEST_FAILURE_MESSAGES.PLEASE_ENTER_DETAILS);
    }
  };
  
  const handleRegister = async () => {
    if (
      register.username &&
      register.username.trim().length !== 0 &&
      register.password &&
      register.email &&
      validateEmail(register.email) &&
      register.phone &&
      register.phone.length === 10
    ) {
      handlePromiseRequest(
        sendRegisterRequest,
        REQUEST_IN_PROGRESS,
        REQUEST_SUCCESS_MESSAGES.USER_REGISTERED_SUCCESSFULLY,
        REQUEST_FAILURE_MESSAGES.REGISTRATION_FAILED
      );
    } else {
      toast.error(REQUEST_FAILURE_MESSAGES.PLEASE_ENTER_DETAILS);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="left-content">
          <h1 className="left-title">Welcome!</h1>
          <p className="left-subtitle">
            This custom Google Form is created especially for you.
          </p>
        </div>
      </div>
      
      <div className="login-right">
        <div className="form-container">
          {!isLogin ? (
            <div className="form-wrapper">
              <h2 className="form-title">Sign Up</h2>
              
              <div className="input-box">
                <label>User Name</label>
                <input
                  type="text"
                  onChange={(e) => setRegister({ ...register, username: e.target.value })}
                  placeholder="User name"
                />
              </div>
              
              <div className="input-box">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setRegister({ ...register, email: e.target.value });
                  }}
                />
                {register.email && !validateEmail(register?.email) && (
                  <div className="error-text">Please enter valid email</div>
                )}
              </div>
              
              <div className="input-box">
                <label>Phone</label>
                <input
                  type="number"
                  placeholder="Phone number"
                  onChange={(e) => {
                    setRegister({ ...register, phone: e.target.value });
                  }}
                />
                {register.phone && register.phone.length !== 10 && (
                  <div className="error-text">Please enter valid phone number</div>
                )}
              </div>
              
              <div className="input-box">
                <label>Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    setRegister({ ...register, password: e.target.value });
                  }}
                  placeholder="Password"
                />
              </div>
              
              <div className="buttons">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRegister}
                  disabled={isRequestPending}
                >
                  Sign Up
                </Button>
                <Button color="primary" onClick={() => setIsLogin(!isLogin)}>
                  Sign In
                </Button>
              </div>
            </div>
          ) : (
            <div className="form-wrapper">
              <h2 className="form-title">Sign In</h2>
              
              <div className="input-box">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setLogin({ ...login, email: e.target.value });
                  }}
                />
                {login?.email && !validateEmail(login?.email) && (
                  <div className="error-text">Please enter valid email</div>
                )}
              </div>
              
              <div className="input-box">
                <label>Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    setLogin({ ...login, password: e.target.value });
                  }}
                  placeholder="Password"
                />
              </div>
              
              <div className="buttons">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLoginFunction}
                  disabled={isRequestPending}
                >
                  Sign In
                </Button>
                <Button color="primary" onClick={() => setIsLogin(!isLogin)}>
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
