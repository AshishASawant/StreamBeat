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
import MovieLibrary from "./pages/movie/MovieLibrary";
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
import PersonDetails from "./pages/movie/PersonDetails";
import axios from "axios";

const App = () => {
  const { current } = useSelector((state) => state.app);
  const { login } = useSelector((state) => state);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshtoken")
  );
  const [expiresIn, setExpiresIn] = useState();
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setClientToken(token);
    } else if (code) {
      loginMusic();
    } else {
      getNewToken();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      getNewToken();
    }, (expiresIn - 300) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  const loginMusic = async () => {
    let res = await axios.post(`${process.env.REACT_APP_BASE_URL}/musiclogin`, {
      code,
    });
    let { accessToken, refreshToken, expiresIn } = res.data;
    setRefreshToken(refreshToken);
    setExpiresIn(expiresIn);
    localStorage.setItem("refreshtoken", refreshToken);
    localStorage.setItem("token", accessToken);
    setToken(accessToken);
    setClientToken(accessToken);
  };

  const getNewToken = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/musicrefresh`, {})
      .then((res) => {
        let { access_token, expires_in } = res.data.tokens;
        localStorage.setItem("token", access_token);
        setClientToken(access_token);
        setExpiresIn(expires_in);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <TopLoading />
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
                <Route
                  exact
                  path="/music/playlist/:id"
                  element={<DetailedPlaylist />}
                />
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
                  path="/movie/person/:id"
                  element={<PersonDetails />}
                />
                <Route exact path="/movie/library" element={<MovieLibrary />} />
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
