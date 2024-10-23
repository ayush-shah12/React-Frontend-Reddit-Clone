import { useContext } from 'react';
import { ModelContext } from '../context/ModelContext';
import { ViewContext } from '../context/ViewContext';
import { generateTimeStamp } from './utils';
import '../stylesheets/Post.css';

function Post({ post, fullPost = false, showCommunityName = true }) {

    const { model, setModel } = useContext(ModelContext);
    const { setView, setPostID, setCommentID } = useContext(ViewContext);

    function getLinkFlair(linkFlairID) {
        let postFlair = "";
        for (const f of model.linkFlairs) {
            if (f.linkFlairID === linkFlairID) {
                postFlair = f.content;
            }
        }
        return postFlair;
    }

    function getNumComments(commentIDs) {
        let count = 0;
        for (const commentId of commentIDs) {
            count++;
            let comment = model.comments.find(comment => comment.commentID === commentId);
            if (comment.commentIDs.length > 0) {
                count += getNumComments(comment.commentIDs);
            }
        }
        return count;
    }

    function getCommunityName(postID) {
        return "p/" + model.communities.find(community => community.postIDs.includes(postID)).name;
    }

    function onClickPost(postID) {
        let newModel = { ...model, posts: [...model.posts] };
        let postToUpdate = newModel.posts.find(p => p.postID === postID);
        if (postToUpdate) {
            postToUpdate.views += 1;
            setModel(newModel);
        }
        setView("PostPage");
        setPostID(postID);
    }

    // this is for the homepage view, use this to display a post preview(so for search results, community page, etc.)
    // important to use this for the homepage view, as it will allow the user to click on the post
    if (!fullPost) {
        return (
            <div className="linkToPost nav-link" onClick={() => { onClickPost(post.postID) }} style={{ cursor: "pointer" }}>
                <div className="post">
                    <div className="postHeader">
                        <p> u/{post.postedBy} 
                            {showCommunityName ? ` • ${getCommunityName(post.postID)}`: " "} 
                            • {generateTimeStamp(post.postedDate)}</p>
                    </div>
                    <div className="postTitle">
                        <h3>{post.title}</h3>
                    </div>
                    {post.linkFlairID && <div className="linkFlair"> <p>{getLinkFlair(post.linkFlairID)}</p> </div>}
                    <div className="postTextPreview">
                        <p>{post.content.trim().substring(0, 80)}</p>
                    </div>
                    <div className="postFooter">
                        <p> {post.views} views • {getNumComments(post.commentIDs)} comments</p>
                    </div>
                </div>
            </div>
        )
    }

    // this is for the post page view, use this to display the full post, should only be used in PostPage.jsx
    else {
        return (
            <div className="postPage">
                <div className="topHeader">
                    <p> p/{model.communities.find(community => community.postIDs.includes(post.postID)).name} • {generateTimeStamp(post.postedDate)}</p>
                </div>
                <div className="postAuthor">
                    <p>u/{post.postedBy}</p>
                </div>
                <div className="postTitle">
                    <h3>{post.title}</h3>
                </div>
                {post.linkFlairID && <div className="linkFlair"> <p>{getLinkFlair(post.linkFlairID)}</p> </div>}                <div className="postContent">
                    <p>{post.content}</p>
                </div>
                <div className="postFooter">
                    <p> {post.views} views • {getNumComments(post.commentIDs)} comments</p>
                </div>
                <div className="addCommentButtonContainer">
                    <button onClick={() => {
                        setCommentID(null);
                        setView("NewComment");
                    }}>Comment</button>
                </div>
            </div>
        )
    }
}

export default Post;
