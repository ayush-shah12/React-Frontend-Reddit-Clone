import { useContext } from "react";
import { ViewContext } from "../context/ViewContext";
import redditLogo from "../images/redditLogoTransparent.png";
import "../stylesheets/Header.css";
import "../stylesheets/index.css";

const Header = () => {

    const {setView } = useContext(ViewContext);

    return (
        <nav>
            <a style={{cursor: "pointer"}}onClick={() => {setView("Home")}} className="nav-link logo-name">
                <img src={redditLogo} alt="logo" className="logo"/>
                    <p style={{paddingLeft: "5%"}}>phreddit</p>
            </a>

            <input type="text" id="searchBox" placeholder="Search Phreddit..." className="search"/>

                <button className="create nav-link">
                    Create Post
                </button>
        </nav>
    );
}

export default Header;