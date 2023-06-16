import React, { useEffect, useState } from "react";
import Toggle from "./Toggle";
import { useDispatch, useSelector } from "react-redux";
import { updateAppState, updateUserName } from "../state/appSlice";
import { Link, useNavigate } from "react-router-dom";
import Account from "../pages/Account";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../assets/stream-beat logo.png";
import { fetchBackendData } from "../utils/backendApi";
import secLogo from "../assets/avatar.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { setNav } from "../state/navigationSlice";

const TopBar = ({ setToken }) => {
  const dispatch = useDispatch();
  const { app} = useSelector((state) => state);
  const navigate = useNavigate();

  const [bgColor, setBgColor] = useState(false);
  const [menu, setMenu] = useState(false);
  const [userData, setuserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    navigate(`./${app.current}/home`);
    window.addEventListener("scroll", handleStyle);

    return () => {
      window.removeEventListener("scroll", handleStyle);
    };
    // eslint-disable-next-line
  }, [app]);

  useEffect(() => {
    getUserData();
  }, []);

  const handleAppState = (newState) => {
    dispatch(setNav(newState==='movie'?1:6))
    dispatch(updateAppState({ newState }));
  };

  const getUserData = async () => {
    setLoading(true);
    try {
      let response = await fetchBackendData("GET", "/user/user");
      setuserData(response);
      dispatch(updateUserName(response.name))
      setUserImage(response.image)
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleStyle = () => {
    if (window.scrollY >= 55) {
      setBgColor(true);
    } else {
      setBgColor(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [window.location.pathname]);

  return (
    <div
      className={`w-full h-[50px] ${
        bgColor ? "bg-[rgba(0,0,0,0.9)]" : ""
      } text-white flex items-center justify-between fixed top-0 z-20 left-0 px-4 transition-colors duration-300 `}
    >
      <Link
        to="/"
        className="sm:hidden grid place-items-center translate-x-[-10px] "
      >
        <LazyLoadImage effect="blur" src={logo} className="w-[70px] " />
      </Link>
      <Link t0="/" className="font-semibold hidden sm:block  ">
        <span className="text-[red] md:text-3xl text-xl">Stream</span>
        <span className="text-[green] md:text-3xl text-xl">Beat</span>
      </Link>
      <div className="flex items-center gap-5">
        <Toggle
          method={handleAppState}
          state={app.current}
          child={["movie", "music"]}
        />
        {loading ? (
          <SkeletonTheme baseColor="#202020" highlightColor="#444" >
              <Skeleton height="40px" width="40px"  borderRadius={'100%'} />
          </SkeletonTheme>
        ) : (
          <button onClick={() => setMenu(true)}>
            <LazyLoadImage
              src={
                userImage ? `data:image/png;base64,${userImage} ` : secLogo
              }
              alt="user"
              className="h-[40px] w-[40px] rounded-full"
            />
          </button>
        )}
      </div>
      {menu && (
        <Account setMenu={setMenu} setToken={setToken} userData={userData} userImage={userImage} setUserImage={setUserImage} />
      )}
    </div>
  );
};

export default TopBar;
