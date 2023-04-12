import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createContext } from 'react';
import UserStore from './store/UserStore';
import jwt_decode from "jwt-decode"

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));

//console.log(jwt_decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoic3RyaW5nIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTcxMjkzMjE4MywiaXNzIjoiQXV0aGVudGljYXRpb25TZXJ2ZXIiLCJhdWQiOiJNeUF1dGhlbnRpY2F0aW9uQ2xpZW50In0.98bWf0pjYZK71zc-GqkC3h6WZuoPhBB-dVlAVhcJL3c"));

root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore()
        }}>
            <App />
        </Context.Provider>
  </React.StrictMode>
);

reportWebVitals();
