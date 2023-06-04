import React, { useContext } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { TbCategory } from "react-icons/tb";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { RiPlayListFill, RiLogoutCircleRLine } from "react-icons/ri";
import musicContext from "../../state/musicContext";

const SideBar = ({ setToken }) => {
  const navigate=useNavigate()

  let context = useContext(musicContext);
  let { audio } = context;


  return (
    <div className="md:w-20 w-screen flex  items-center  h-full md:ml-3 overflow-hidden md:pb-3">
      <ul className="flex h-full md:flex-col items-center gap-10 w-full md:my-6 bg-bg-primary md:rounded-md md:py-6 py-3 overflow-hidden justify-between  px-3 md:px-0">
        <li>
          <NavLink
            to="/music/home"
            className="text-bg-dull text-[1.7rem] transition-colors duration-500"
            style={({ isActive }) =>
              isActive ? { color: "white" } : { color: "grey" }
            }
            title="Home"
          >
            <HiHome />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/music/category"
            className="text-bg-dull text-[1.7rem] transition-colors duration-500"
            style={({ isActive }) =>
              isActive ? { color: "white" } : { color: "grey" }
            }
            title="Category"
          >
            <TbCategory />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/music/playlist"
            className="text-bg-dull text-[1.7rem] transition-colors duration-500"
            style={({ isActive }) =>
              isActive ? { color: "white" } : { color: "grey" }
            }
            title="Playlist"
          >
            <RiPlayListFill />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/music/search"
            className="text-bg-dull text-[1.7rem] transition-colors duration-500"
            style={({ isActive }) =>
              isActive ? { color: "white" } : { color: "grey" }
            }
            title="Search"
          >
            <BiSearchAlt />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/music/library"
            className="text-bg-dull text-[1.7rem] transition-colors duration-500"
            style={({ isActive }) =>
              isActive ? { color: "white" } : { color: "grey" }
            }
            title="Library"
          >
            <MdOutlineLibraryMusic />
          </NavLink>
        </li>
        <button
          onClick={(e) => {
            e.preventDefault();
            audio.pause();
            setToken("");
            localStorage.removeItem("token");
            
            navigate('/music/login')
          }}
          title="Log out"
          className="md:static fixed top-3 right-3"
        >
          <RiLogoutCircleRLine className="text-red-800 text-[1.7rem] transition-colors duration-500" />
        </button>
      </ul>
    </div>
  );
};

export default SideBar;
