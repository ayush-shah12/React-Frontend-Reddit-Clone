import NavBar from "../components/Navbar";
import Header from "../components/Header";
import Post from "../components/Post";
import "../stylesheets/PostPage.css";
import "../stylesheets/index.css";
import { useContext } from "react";
import { ViewContext } from "../context/ViewContext";
import { ModelContext } from "../context/ModelContext";

const PostPage = () => {

    const { model } = useContext(ModelContext);
    const { postID } = useContext(ViewContext);

    function getPost(postID) {
        return model.posts.find((p) => p.postID === postID);
    }

    const post = getPost(postID);

    return (
        <div>
            <Header />
            <div className="containerSideMain">
                <NavBar />
                <div className="individualContainer" id="individualContainer">
                    <Post post={post} fullPost={true} />
                    <div className="commentSectionDiv">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPage;