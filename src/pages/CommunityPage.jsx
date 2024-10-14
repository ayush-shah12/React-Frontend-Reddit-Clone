import { useContext, useEffect, useState } from "react"
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Post from "../components/Post"
import { ModelContext } from "../context/ModelContext.jsx"
import { ViewContext } from "../context/ViewContext";
import { generateTimeStamp } from "../components/Post";
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
            const sortedPosts = sortPosts();
            setPosts(sortedPosts);
        }
    }, [sort, posts]);
//WILL MODULIRIZE LATER:
const sortPosts = () => {
    const sortedPosts = [...posts];
    if (sort === "Newest") {
      sortedPosts.sort((post1, post2) =>
        post1.postedDate < post2.postedDate ? 1 : -1
      );
    } else if (sort === "Oldest") {
      sortedPosts.sort((post1, post2) =>
        post1.postedDate > post2.postedDate ? 1 : -1
      );
    } else if (sort === "Active") {
      let dict = {};
      for (const post of sortedPosts) {
        getReplyComment(post.postID, post.commentIDs);
      }

      function getReplyComment(postID, commentIDs) {
        if (!dict[postID]) {
          dict[postID] = [];
        }
        for (const commentID of commentIDs) {
          let comment = model.comments.find(
            (comment) => comment.commentID === commentID
          );
          dict[postID].push({
            commentID: commentID,
            commentDate: comment.commentedDate,
          });

          if (comment.commentIDs.length > 0) {
            getReplyComment(postID, comment.commentIDs);
          }
        }
      }

      let otherDict = {};
      for (const [pID, comments] of Object.entries(dict)) {
        for (const comment of comments) {
          if (
            otherDict[pID] === undefined ||
            otherDict[pID].commentDate < comment.commentDate
          ) {
            otherDict[pID] = {
              commentID: comment.commentID,
              commentDate: comment.commentDate,
            };
          }
        }
      }

      sortedPosts.sort((post1, post2) => {
        if (!otherDict[post1.postID]) {
          return 1;
        }
        if (!otherDict[post2.postID]) {
          return -1;
        }
        return otherDict[post1.postID].commentDate <
          otherDict[post2.postID].commentDate
          ? 1
          : -1;
      });
    }
    return sortedPosts;
  };

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