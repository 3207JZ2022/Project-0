import { useNavigate } from "react-router-dom";
import "./NotFound.css";


function NotFound(){

    const navigate = useNavigate();

    function handleClick() {
      navigate("/");
    }
    return (
    <div className="not-found-page" onClick={handleClick}>
      <div className="not-found-text-container">
        <h1 className="not-found-text">Page Not Found</h1>
        <h2 className="not-found-text">Click To Return To Home Page</h2>
      </div>
      <a className="atribute" href="https://www.freepik.com/free-vector/404-error-with-landscape-concept-illustration_20602785.htm#page=2&query=not%20found&position=14&from_view=keyword&track=ais">Image by storyset on Freepik</a>
    </div>
    )

}


export default NotFound;