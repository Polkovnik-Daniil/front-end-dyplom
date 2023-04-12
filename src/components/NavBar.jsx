import { useContext } from "react"
import { Context } from "../index";

const NavBar = () => {
    const { user } = useContext(Context);
    return (
        <nav class="navbar navbar-dark bg-primary">
            <a class="navbar-brand" href="#">Библиотека</a>
            <div class="collapse navbar-collapse" id="navbarColor02">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                    </li>
                </ul>
                <span class="navbar-text">
                    Navbar text with an inline element
                </span>
            </div>
        </nav>
    );
};

export default NavBar;