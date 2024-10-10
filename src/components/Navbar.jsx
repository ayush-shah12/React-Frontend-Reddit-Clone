import "../stylesheets/Navbar.css";

const NavBar = () =>{

    return (
        <div class="sidebar">
          <ul>
            <a class="nav-link active">
              <li class="home-link">
                Home
              </li>
            </a>
            <hr class="nav-divider"/>
            <h3 class="communities-header" style={{marginLeft: "5px", marginBottom: "5px;"}}>
              Communities
            </h3>
            <a  class = "create-community-link">
              <li class="createCommunity" style={{paddingLeft: "40px"}}>
                Create Community
              </li>
            </a>
            <li class="list-communities-li">
              <ol id="list-communities-ol" class="list-communities-ol">
              </ol>
            </li>
          </ul>
        </div>
    );
}

export default NavBar;