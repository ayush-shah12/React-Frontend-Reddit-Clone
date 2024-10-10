import NavBar from "../components/Navbar"
import Header from "../components/Header"
import "../stylesheets/HomePage.css"
import "../stylesheets/index.css"

const HomePage = () => {

    return (
        <div>
            <Header/>
            <div class="containerSideMain">
                <NavBar/>
                <div id="main" class="main">
                    <header>
                        <h2 id="allposts">All Posts</h2>
                        <div class="buttonContainer">
                            <button onclick="loadPosts()">Newest</button>
                            <button onclick="loadPosts('Oldest')">Oldest</button>
                            <button onclick="loadPosts('Active')">Active</button>
                        </div>
                    </header>
                    <div class="postCountDiv">
                        <h3 id="numPosts">Number of Posts: </h3>
                    </div>
                    <div id="postContainer" class="postContainer">
                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;