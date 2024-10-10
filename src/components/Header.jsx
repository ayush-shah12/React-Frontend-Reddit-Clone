import "../stylesheets/Header.css";
import "../stylesheets/index.css";
import redditLogo from "../images/redditLogoTransparent.png"; 

const Header = () => {

    return (
        <nav>
            <a href="?" class="nav-link logo-name">
                <img src={redditLogo} alt="logo" class="logo"/>
                    <p style={{paddingLeft: "5%"}}>phreddit</p>
            </a>

            <input type="text" id="searchBox" placeholder="Search Phreddit..." class="search"/>

                <button class="create nav-link">
                    Create Post
                </button>
        </nav>
    );
}

export default Header;