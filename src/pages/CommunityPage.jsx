import { useContext, useEffect, useState } from "react"
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Post from "../components/Post"
import { ModelContext } from "../context/ModelContext.jsx"
import { ViewContext } from "../context/ViewContext";
import { generateTimeStamp } from "../components/Post";
import { sortPosts } from "../components/utils.js";
import "../stylesheets/CommunityPage.css"
import "../stylesheets/index.css"


const CommunityPage = () => {
    const { model } = useContext(ModelContext);
    const { communityID } = useContext(ViewContext);
    const [community, setCommunity] = useState(null);
    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState("Newest");

    //fetch the community
    useEffect(() => {
        if(model.communities && communityID) {
            const comm = model.communities.find((c) => c.communityID === communityID);
            setCommunity(comm);

            if(comm) {
                let communityPosts= model.posts.filter((post)=>
                comm.postIDs.includes(post.postID));
                setPosts(communityPosts);
            }
        }
    }, [model.communities, communityID, model.posts]);

    useEffect(() => {
        if(posts.length > 0) {
            const sortedPosts = sortPosts(model, sort, posts);
            setPosts(sortedPosts);
        }
    }, [sort, posts]);

  if (!community) {
    return <div>Loading...</div>;
  }

    return (
        <div>
            <Header />
            <div className = "containerSideMain">
            <Navbar />
            <div id = "main" className = "main">
            <header className = "communityHeader">
                <div className = "communityInfo">
                <h2>p/{community.name}</h2>
                <p>{community.description}</p>
                <p>Created {generateTimeStamp(community.startDate)}</p>
                <h4>Posts: {community.postIDs.length} | Members: {community.memberCount}
                </h4>
                </div>

                <div className="buttonContainer">
                <button onClick={() => setSort("Newest")}>Newest</button>
                <button onClick={() => setSort("Oldest")}>Oldest</button>
                <button onClick={() => setSort("Active")}>Active</button>
                </div>
            </header>
            <div id = "postContainer" className = "postContainer">
                {posts.map((post) =>(
                    <Post key = {post.postID} post = {post} showCommunityName = {false}/>
                ))}
            </div>
            </div>
            </div>
        </div>
    );
};

export default CommunityPage;