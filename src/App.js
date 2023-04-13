import { useEffect } from "react";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { check } from "./http/userAPI";
import { Context } from "./index";
import { observer } from "mobx-react-lite";


const App = observer(() => {
    const { user, books } = useContext(Context);
    useEffect(() => {
        check().then(data => {
            user.setParams();
        })
    }, [])
    console.log(books);
    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
