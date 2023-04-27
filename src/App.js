import { useEffect } from "react";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { check } from "./http/userAPI";
import { Context } from "./index";
import { AxiosError } from 'axios';
import { observer } from "mobx-react-lite";


const App = observer(() => {
    const { user } = useContext(Context);
    useEffect(() => {
        check().then(data => {
            user.setUser();
        }).catch((reason: AxiosError) => {
            console.log(reason.code === 'ERR_NETWORK');
            if (reason.code === 'ERR_NETWORK' || reason.response.status >= 400) {

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

            }
        })
    }, [])
    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
