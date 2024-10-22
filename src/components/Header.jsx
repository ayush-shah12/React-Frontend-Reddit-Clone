import { useContext, useState } from "react";
import { ViewContext } from "../context/ViewContext";
import redditLogo from "../images/redditLogoTransparent.png";
import "../stylesheets/Header.css";
import "../stylesheets/index.css";

const Header = () => {

    const {view, setView, setSearchQuery } = useContext(ViewContext);
    const [searchInput, setSearchInput] = useState("");

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
      };
    
      const handleSearchKeyPress = (e) => {
        if (e.key === "Enter") {
          //trigger the search
          setSearchQuery(searchInput);
          setView("SearchPage");
          setSearchInput(""); //clear the search input
        }
      };
    
    return (
        <nav>
            <div style={{cursor: "pointer"}}onClick={() => {setView("Home")}} className="nav-link logo-name">
                <img src={redditLogo} alt="logo" className="logo"/>
                    <p style={{paddingLeft: "5%"}}>phreddit</p>
            </div>

            <input 
            type="text" 
            id="searchBox" 
            placeholder="Search Phreddit..." 
            className="search"
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchKeyPress}/>

                <button style={{backgroundColor: (view === "NewPost") ? "rgb(220, 61, 43)" : ""}} className="create nav-link" onClick={() =>setView("NewPost")}>
                    Create Post
                </button>
        </nav>
    );
}

export default Header;