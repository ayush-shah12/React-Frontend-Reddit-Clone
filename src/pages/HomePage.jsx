import { useContext, useEffect, useState } from "react"
import Header from "../components/Header"
import NavBar from "../components/Navbar"
import Post from "../components/Post"
import { ModelContext } from "../context/ModelContext.jsx"
import "../stylesheets/HomePage.css"
import "../stylesheets/index.css"

const HomePage = () => {

    const { model } = useContext(ModelContext);
    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState("Newest");


    // sorting
    function sortPosts() {
        let postsArray = [...model.posts];

        if (sort === "Newest") {
            postsArray.sort((post1, post2) =>
                post1.postedDate < post2.postedDate ? 1 : -1
            );
        } else if (sort === "Oldest") {
            postsArray.sort((post1, post2) =>
                post1.postedDate > post2.postedDate ? 1 : -1
            );
        } else {
            // Assuming "Active" is the sort by the most recent comment
            let dict = {};
            for (const post of posts) {
                getReplyComment(post.postID, post.commentIDs);
            }

            function getReplyComment(postID, commentIDs) {
                if (!dict[postID]) {
                    dict[postID] = [];
                }

                for (const commentID of commentIDs) {
                    let comment = model.comments.find(comment => comment.commentID === commentID);
                    dict[postID].push({ commentID, commentDate: comment.commentedDate });

                    if (comment.commentIDs.length > 0) {
                        getReplyComment(postID, comment.commentIDs);
                    }
                }
            }

            let otherDict = {};
            for (const [pID, comments] of Object.entries(dict)) {
                for (const comment of comments) {
                    if (otherDict[pID] === undefined || otherDict[pID].commentDate < comment.commentDate) {
                        otherDict[pID] = { commentID: comment.commentID, commentDate: comment.commentDate };
                    }
                }
            }

            postsArray.sort((post1, post2) => {
                if (!otherDict[post1.postID]) {
                    return 1;
                }
                if (!otherDict[post2.postID]) {
                    return -1;
                }
                // If the comment dates are the same, sort by the post date
                if(otherDict[post1.postID].commentDate === otherDict[post2.postID].commentDate) {
                    return post1.postedDate < post2.postedDate ? 1 : -1;
                }
                return otherDict[post1.postID].commentDate < otherDict[post2.postID].commentDate ? 1 : -1;
            });
        }

        return postsArray;
    };

    // Update sorted posts whenever model.posts or sort changes
    useEffect(() => {
        if (model.posts) {
            const updatedPosts = sortPosts();
            setPosts(updatedPosts);
        } else {
            console.log("Model is empty");
        }
    }, [model.posts, sort, model]);


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
                        {posts.map((post) => {
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