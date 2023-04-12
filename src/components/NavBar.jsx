import { useContext } from "react"
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    //TODO: delete line below
    user.setIsAuth(true);
    //
    return user.isAuth ? (
        <nav class="navbar navbar-expand-lg navbar-light bg-light Center">
            <div class="Center">
                <a class="navbar-brand mx-5" href="#">
                    Library
                </a>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                Books
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                Readers
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">
                                About us
                            </a>
                        </li>
                        {
                            user.Access ?
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        Employees
                                    </a>
                                </li> : null
                        }
                        <li class="nav-item">
                            <a class="nav-link" href="#">
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