import "bootstrap/dist/css/bootstrap.min.css";
import { BOOKS_ROUTE } from "../utils/consts";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
                <h1 class="display-1 fw-bold text-white">Library</h1>
                <p class="fs-3 text-white" > <span class="text-danger">Welcome</span> to the Library Data Application.</p>
                <p class="lead">
                    This is a small but interesting application for work, we are glad to everyone who uses it
                </p>
                <a class="btn btn-primary" onClick={() => {
                    navigate(BOOKS_ROUTE);
                    return;
                }}>Go Books</a>
            </div>
        </div>
    );
}
