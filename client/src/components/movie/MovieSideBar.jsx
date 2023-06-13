import React from "react";
import {  NavLink,  } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { MdMovie,MdWatchLater } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { IoTvSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setNav } from "../../state/navigationSlice";

const Sidebar = () => {
  const {navigation}=useSelector(state=>state)
  const dispatch=useDispatch()

  return (
    <div className="md:w-20 w-screen fixed bottom-0 z-10 flex items-center justify-center md:h-screen overflow-hidden md:pb-3">
      <ul className="flex h-full md:flex-col items-center gap-10 w-full md:my-6 bg-bg-primary md:rounded-md md:py-6 py-3 overflow-hidden justify-evenly max-h-[75%] px-3 md:px-0">
        <li>
          <NavLink
            to="/movie/home"
            className="text-bg-dull text-[1.7rem] transition-colors duration-500"
            style={() =>
              navigation.current===1 ? { color: "white" } : { color: "grey" }
            }
            onClick={()=>dispatch(setNav(1))}
            title="Home"
          >
            <HiHome />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movie/explore/movie"
            className="text-bg-dull text-[1.7rem] transition-colors duration-500"
            style={() =>
              navigation.current===2 ? { color: "white" } : { color: "grey" }
            }
            onClick={()=>dispatch(setNav(2))}
            title="Category"
          >
            <MdMovie />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movie/explore/tv"
            className="text-bg-dull text-[1.7rem] transition-colors duration-500"
            style={() =>
              navigation.current===3 ? { color: "white" } : { color: "grey" }
            }
            onClick={()=>dispatch(setNav(3))}
            title="Playlist"
          >
            <IoTvSharp />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movie/search"
            className="text-bg-dull text-[1.7rem] transition-colors duration-500"
            style={() =>
              navigation.current===4 ? { color: "white" } : { color: "grey" }
            }
            onClick={()=>dispatch(setNav(4))}
            title="Search"
          >
            <BiSearchAlt />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movie/library"
            className="text-bg-dull text-[1.7rem] transition-colors duration-500"
            style={() =>
              navigation.current===5 ? { color: "white" } : { color: "grey" }
            }
            onClick={()=>dispatch(setNav(5))}
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
