import { useContext } from "react";
import { ModelContext } from "../context/ModelContext";
import { ViewContext } from "../context/ViewContext";
import "../stylesheets/Navbar.css";

const NavBar = () => {

  const { model } = useContext(ModelContext);
  const { view, setView, communityID, setCommunityID } = useContext(ViewContext);
  const handleNavigation = (targetView, params = {}) => {
    setView(targetView);
    if(params.communityID) {
      setCommunityID(params.communityID);
    }
    else{
      setCommunityID(null);
    }
  };

  return (
    <div className="sidebar">
      <ul>
        <div style={{ cursor: "pointer" }} onClick={() => { setView("Home"); setCommunityID(null); }} className="nav-link active">
          <li style={{backgroundColor: (view === "Home") ? "rgb(220, 61, 43)" : ""}}className="home-link">
            Home
          </li>
        </div>
        <hr className="nav-divider" />
        <h3 className="communities-header" style={{ marginLeft: "5px", marginBottom: "5px" }}>
          Communities
        </h3>
        <div className="create-community-link">
          <li className={`createCommunity${view ==="CreateCommunity" ? "active" : ""}`}
           style={{ cursor: "pointer", paddingLeft: "40px", backgroundColor: (view === "CreateCommunity") ? "rgb(220, 61, 43)" : "" }}
           onClick= {()=> handleNavigation("CreateCommunity")}>
            Create Community
          </li>
        </div>
        <li className="list-communities-li">
          <ol id="list-communities-ol" className="list-communities-ol">
            {model.communities.map((community) => (
              <li key={community.communityID}>
                <div 
                  className="nav-link"
                  style={{cursor: "pointer"}}
                  onClick = {() => {
                    setView("CommunityPage"); 
                    setCommunityID(community.communityID);
                  }}
                >
                  <p style={{color: (view === "CommunityPage" && community.communityID === communityID) ? "rgb(220, 61, 43)" : "", fontWeight: (view === "CommunityPage" && community.communityID === communityID) ? "bold" : ""}}>p/{community.name}</p>
                </div>
              </li>
            ))}
          </ol>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;