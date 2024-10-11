import "../stylesheets/Navbar.css";
import { ModelContext } from "../Context/ModelContext";
import { useContext } from "react";
import { ViewContext } from "../Context/ViewContext";

const NavBar = () => {

  const { model } = useContext(ModelContext);
  const { setView } = useContext(ViewContext);


  return (
    <div className="sidebar">
      <ul>
        <a style = {{cursor: "pointer"}} onClick = {() => {setView("Home")}} className="nav-link active">
          <li className="home-link">
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
                <a className="nav-link">
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