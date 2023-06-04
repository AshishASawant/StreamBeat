import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MusicLayout from "./pages/music/MusicLayout";
import TopBar from "./components/TopBar";
import MusicHome from "./pages/music/MusicHome";
import Categorie from "./pages/music/Category";
import Playlist from "./pages/music/Playlist";
import Search from "./pages/music/Search";
import Library from "./pages/music/Library";
import { setClientToken } from "./utils/spotify";
import MusicLogin from "./components/music/MusicLogin";
import MovieLayout from "./pages/movie/MovieLayout";
import MovieHome from "./pages/movie/MovieHome";
import MovieSearch from "./pages/movie/MovieSearch";
import MovieLibrary  from "./pages/movie/MovieLibrary";
import { useSelector } from "react-redux";
import MovieDetails from "./pages/movie/MovieDetails";
import Explore from "./pages/movie/Explore";
import Login from "./pages/login/Login";
import LoginIntro from "./pages/login/LoginIntro";
import Signup from "./pages/login/Signup";
import LoginLayout from "./pages/login/LoginLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopLoading from "./components/TopLoading";
import DetailedPlaylist from "./pages/music/DetailedPlaylist";

const App = () => {
  const { current } = useSelector((state) => state.app);
  const { login } = useSelector((state) => state);
  const [token, setToken] = useState(null);
  // // const [login.current, setlogin.current] = useState(localStorage.getItem('authToken'));

  // // useEffect(()=>{
  // //   if(token && current==='music'){
  // //     navigate('/music/home')
  // //   }
  // //   // eslint-disable-next-line
  // // },[token])

  // const location = useLocation();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setClientToken(token);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="h-full">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <TopLoading/>
      {login.current && <TopBar setToken={setToken} />}
      {login.current ? (
        <Routes>
          <Route
            exact
            path="/music/login"
            element={<MusicLogin setToken={setToken} />}
          />
          {current === "music" ? (
            <>
              {token ? (
                <Route
                  exact
                  path="/"
                  element={<Navigate to="/music/home" />}
                ></Route>
              ) : (
                <Route
                  exact
                  path="/music/login"
                  element={<MusicLogin />}
                ></Route>
              )}
              <Route
                path="/music"
                element={<MusicLayout token={token} setToken={setToken} />}
              >
                <Route
                  exact
                  path="/music/login"
                  element={<MusicLogin setToken={setToken} />}
                />
                <Route exact path="/music/home" element={<MusicHome />} />
                <Route exact path="/music/category" element={<Categorie />} />
                <Route exact path="/music/playlist" element={<Playlist />} />
                <Route exact path="/music/playlist/:id" element={<DetailedPlaylist/>} />
                <Route exact path="/music/search" element={<Search />} />
                <Route exact path="/music/library" element={<Library />} />
                <Route
                  exact
                  path="/music"
                  element={<Navigate to="/music/home" />}
                ></Route>
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/" element={<Navigate to="/movie/home" />} />
              <Route path="/movie" element={<MovieLayout />}>
                <Route exact path="/movie/home" element={<MovieHome />} />
                <Route
                  exact
                  path="/movie/explore/:mediatype"
                  element={<Explore />}
                />
                <Route
                  exact
                  path="/movie/:mediatype/:id"
                  element={<MovieDetails />}
                />
                <Route exact path="/movie/search" element={<MovieSearch />} />
                <Route
                  exact
                  path="/movie/library"
                  element={<MovieLibrary />}
                />
              </Route>
            </>
          )}
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/" element={<LoginLayout />}>
            <Route exact path="/" element={<LoginIntro />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
