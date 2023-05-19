import React from "react";
import {  NavLink,  } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { MdMovie,MdWatchLater } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { RiPlayListFill } from "react-icons/ri";

const Sidebar = () => {



  return (
    <div className="md:w-20 w-screen fixed bottom-0 z-10 flex items-center justify-center md:h-screen overflow-hidden md:pb-3">
      <ul className="flex h-full md:flex-col items-center gap-10 w-full md:my-6 bg-bg-primary md:rounded-md md:py-6 py-3 overflow-hidden justify-evenly max-h-[75%] px-3 md:px-0">
        <li>
          <NavLink
            to="/movie/home"
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
            to="/movie/explore/movie"
            className="text-bg-dull text-[1.7rem] transition-colors duration-500"
            style={({ isActive }) =>
              isActive ? { color: "white" } : { color: "grey" }
            }
            title="Category"
          >
            <MdMovie />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movie/explore/tv"
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
            to="/movie/search"
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
            to="/movie/watchlater"
            className="text-bg-dull text-[1.7rem] transition-colors duration-500"
            style={({ isActive }) =>
              isActive ? { color: "white" } : { color: "grey" }
            }
            title="Library"
          >
            <MdWatchLater />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
