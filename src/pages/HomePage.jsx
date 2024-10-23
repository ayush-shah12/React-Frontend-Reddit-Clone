import { useContext, useMemo, useState } from "react"
import Header from "../components/Header"
import NavBar from "../components/Navbar"
import Post from "../components/Post"
import { sortPosts } from "../components/utils.js"
import { ModelContext } from "../context/ModelContext.jsx"
import "../stylesheets/HomePage.css"
import "../stylesheets/index.css"

const HomePage = () => {

    const { model } = useContext(ModelContext);
    const [sort, setSort] = useState("Newest");

    const sortedPosts = useMemo(() => {
        if (model.posts.length > 0) {
            return sortPosts(model, sort, model.posts);
        }
        return [];
      }, [model, sort]);

    return (
        <div>
            <Header />
            <div className="containerSideMain">
                <NavBar />
                <div id="main" className="main">
                    <header>
                        <h2 id="allposts">All Posts</h2>
                        <div className="buttonContainer">
                            <button onClick={() => { setSort("Newest") }}>Newest</button>
                            <button onClick={() => { setSort("Oldest") }}>Oldest</button>
                            <button onClick={() => { setSort("Active") }}>Active</button>
                        </div>
                    </header>
                    <div className="postCountDiv">
                        <h3 id="numPosts">Number of Posts: {model.posts.length} </h3>
                    </div>
                    <div id="postContainer" className="postContainer">
                        {sortedPosts.map((post) => {
                            return (
                                <Post key={post.postID} post={post}></Post>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;