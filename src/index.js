import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createContext } from "react";
import UserStore from "./store/UserStore";
import BookStore from "./store/BookStore";
import GenreStore from "./store/GenreStore";
import ReaderStore from "./store/GenreStore";




export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            books: new BookStore(),
            genres: new GenreStore(),
            readers: new ReaderStore(),
        }}>
            <App />
        </Context.Provider>
  </React.StrictMode>
);

reportWebVitals();
