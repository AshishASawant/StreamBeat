import React, { useEffect, useState } from "react";
import Toggle from "./Toggle";
import { useDispatch, useSelector } from "react-redux";
import { updateAppState } from "../state/appSlice";
import { Link, useNavigate } from "react-router-dom";
import Account from "../pages/Account";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../assets/stream-beat logo.png";

const TopBar = ({setToken}) => {
  const dispatch = useDispatch();
  const { app } = useSelector((state) => state);
  const navigate = useNavigate();

  const [bgColor, setBgColor] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    navigate(`./${app.current}/home`);
    window.addEventListener("scroll", handleStyle);

    return () => {
      window.removeEventListener("scroll", handleStyle);
    };
    // eslint-disable-next-line
  }, [app]);

  const handleAppState = (newState) => {
    dispatch(updateAppState({ newState }));
  };

  const handleStyle = () => {
    if (window.scrollY >= 55) {
      setBgColor(true);
    } else {
      setBgColor(false);
    }
  };

  // const handleScroll=()=>{

  // }

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [window.location.pathname]);

  return (
    <div
      className={`w-full h-[50px] ${
        bgColor ? "bg-[rgba(0,0,0,0.9)]" : ""
      } text-white flex items-center justify-between fixed top-0 z-20 left-0 px-4 transition-colors duration-300`}
    >
      <Link to="/" className="sm:hidden">
        <LazyLoadImage effect="blur" src={logo} className="w-[70px] absolute left-0 top-1" />
      </Link>
      <Link t0='/' className="font-semibold hidden sm:block">
        <span className="text-[red] md:text-3xl text-xl">Stream</span>
        <span className="text-[green] md:text-3xl text-xl">Beat</span>
      </Link>
      <div className="flex items-center gap-5">
        <Toggle
          method={handleAppState}
          state={app.current}
          child={["movie", "music"]}
        />
        <button onClick={() => setMenu(true)}>
          <LazyLoadImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThTFHNvudF14DrJhIbjvNi8KhuKPaOrCivYw&usqp=CAU"
            alt="user"
            className="h-[40px] w-[40px] rounded-full"
          />
        </button>
      </div>
      {menu && <Account setMenu={setMenu} setToken={setToken} />}
    </div>
  );
};

export default TopBar;
