import { useContext, useMemo, useState } from "react"
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
    const [sortOption, setSortOption] = useState("Newest");


    //fetch the community
    useMemo(() => {
      if (model.communities && communityID) {
          const comm = model.communities.find((c) => c.communityID === communityID);
          setCommunity(comm);
      }
  }, [model.communities, communityID]);

  const communityPosts = useMemo(() => {
    if (community) {
        return model.posts.filter((post) =>
            community.postIDs.includes(post.postID)
        );
    }
    return [];
}, [model.posts, community]);
const sortedPosts = useMemo(() => {
  if (communityPosts.length > 0) {
      return sortPosts(model, sortOption, communityPosts);
  }
  return [];
}, [model, sortOption, communityPosts]);

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
                <button onClick={() => setSortOption("Newest")}>Newest</button>
                <button onClick={() => setSortOption("Oldest")}>Oldest</button>
                <button onClick={() => setSortOption("Active")}>Active</button>
            </div>
            </header>
            <div id = "postContainer" className = "postContainer">
                {sortedPosts.map((post) =>(
                    <Post key = {post.postID} post = {post} showCommunityName = {false}/>
                ))}
            </div>
            </div>
            </div>
        </div>
    );
};

export default CommunityPage;