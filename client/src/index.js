import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Musicstate from "./state/Musicstate";
import { store } from "./state/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Musicstate>
        <App />
      </Musicstate>
    </BrowserRouter>
  </Provider>
);
