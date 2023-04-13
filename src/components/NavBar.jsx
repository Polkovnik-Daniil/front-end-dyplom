import { useContext } from "react"
import { Context } from "../index";
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite";
import { ABOUTUS_ROUTE, BOOKS_ROUTE, EMPLOYEES_ROUTE, HOME_ROUTE, LOGIN_ROUTE, READERS_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const NavBar = observer(() => {
    //TODO: 123
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const OnExit = () => {
        user.setUser(false);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        navigate(LOGIN_ROUTE);
    }

    return user.isAuth ? (
        <nav class="navbar navbar-expand-lg navbar-light bg-light Center">
            <div class="Center">
                <a class="navbar-brand mx-5" onClick={() => { navigate(HOME_ROUTE); }}>
                    Library
                </a>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="" onClick={() => { navigate(BOOKS_ROUTE); }}>
                                Books
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="" onClick={() => { navigate(READERS_ROUTE); }}>
                                Readers
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="" onClick={() => { navigate(ABOUTUS_ROUTE); }}>
                                About us
                            </a>
                        </li>
                        {
                            user.Access ?
                                <>
                                    <li class="nav-item">
                                        <a class="nav-link" href="" onClick={() => { navigate(EMPLOYEES_ROUTE); }}>
                                            Employees
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="" onClick={() => { navigate(REGISTRATION_ROUTE); }}>
                                            Registration
                                        </a>
                                    </li>
                                </>
                                : null
                        }
                        <li class="nav-item">
                            <a class="nav-link" onClick={OnExit}>
                                Exit
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    ) : null;
});

export default NavBar;