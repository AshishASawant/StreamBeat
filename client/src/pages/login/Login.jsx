import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchBackendData } from "../../utils/backendApi";
import { useDispatch } from "react-redux";
import { updateLoginState } from "../../state/loginSlice";
import { setProgress } from "../../state/loadingSlice";
import { BiShow, BiHide } from "react-icons/bi";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isShow, setisShow] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    let body = { email: userEmail, password: userPassword };
    dispatch(setProgress(40));
    let res = await fetchBackendData("POST", "/user/login", body);
    dispatch(setProgress(100));
    dispatch(updateLoginState(res?.token));
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-2">
      <div className="grid gap-5 bg-[rgba(0,0,0,0.5)] md:p-10 p-5 w-[27rem]">
        <h1 className="text-3xl font-semibold">Login</h1>
        <form className="flex flex-col gap-2 " onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="bg-bg-main border-none outline-none px-4 py-2"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <div className="w-full relative grid items-center">
            <input
              type={isShow ? "text" : "password"}
              placeholder="Password"
              className="bg-bg-main border-none outline-none px-4 py-2 w-full"
              onChange={(e) => setUserPassword(e.target.value)}
              required
              minLength={6}
            />
            <div className="absolute right-4 text-xl cursor-pointer">
              {isShow ? (
                <BiHide onClick={() => setisShow(false)} />
              ) : (
                <BiShow onClick={() => setisShow(true)} />
              )}
            </div>
          </div>
          <button type="submit" className="px-4 py-2 w-full bg-[red]">
            Log in
          </button>
        </form>
        <button>Don't have An Account ? </button>
        <Link to="/signup" className="px-4 py-2 w-full bg-[red] text-center">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
