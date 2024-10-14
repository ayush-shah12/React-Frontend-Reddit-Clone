import { useContext } from "react";
import { ModelContext } from "../context/ModelContext";
import { ViewContext } from "../context/ViewContext";
import "../stylesheets/Navbar.css";

const NavBar = () => {

  const { model } = useContext(ModelContext);
  const { view, setView, setCommunityID } = useContext(ViewContext);


  return (
    <div className="sidebar">
      <ul>
        <a style={{ cursor: "pointer" }} onClick={() => { setView("Home"); setCommunityID(null); }} className="nav-link active">
          <li style={{backgroundColor: (view === "Home") ? "rgb(220, 61, 43)" : ""}}className="home-link">
            Home
          </li>
        </a>
        <hr className="nav-divider" />
        <h3 className="communities-header" style={{ marginLeft: "5px", marginBottom: "5px" }}>
          Communities
        </h3>
        <a href="/" className="create-community-link">
          <li className="createCommunity" style={{ paddingLeft: "40px" }}>
            Create Community
          </li>
        </a>
        <li className="list-communities-li">
          <ol id="list-communities-ol" className="list-communities-ol">
            {model.communities.map((community) => (
              <li key={community.communityID}>
                <a 
                  className="nav-link"
                  style={{cursor: "pointer"}}
                  onClick = {() => {
                    setView("CommunityPage"); 
                    setCommunityID(community.communityID);
                  }}
                >
                  <p>p/{community.name}</p>
                </a>
              </li>
            ))}
          </ol>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;