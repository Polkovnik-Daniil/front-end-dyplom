import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createContext } from "react";
import UserStore from "./store/UserStore";
import BookStore from "./store/BookStore";


export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            books: new BookStore(),
        }}>
            <App />
        </Context.Provider>
  </React.StrictMode>
);

reportWebVitals();
