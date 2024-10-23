import "../stylesheets/Comments.css";
import { useContext } from "react";
import { ViewContext } from "../context/ViewContext";
import { ModelContext } from "../context/ModelContext";
import { generateTimeStamp } from "./Post.jsx";
import image from "../images/thinking-snoo.png";

const Comments = () => {

    const { model } = useContext(ModelContext);
    const { postID, setView, setCommentID } = useContext(ViewContext);

    function getAllComments(dict, postID, commentIDs, initialComment = null) {

        if (!dict[postID]) {
            dict[postID] = [];
        };

        for (const commentID of commentIDs) {

            let comment = model.comments.find(comment => comment.commentID === commentID);
            dict[postID].push({ "commentID": commentID, "commentDate": comment.commentedDate, "initialComment": initialComment });

            if (comment.commentIDs.length > 0) {
                getAllComments(dict, postID, comment.commentIDs, commentID);
            }
        }
        return dict;
    }

    function transformData(comments) {
        const commentMap = {};

        comments.forEach(comment => {
            commentMap[comment.commentID] = { ...comment, replies: [] };
        });

        const nestedComments = [];

        comments.forEach(comment => {
            if (comment.initialComment === null) {
                nestedComments.push(commentMap[comment.commentID]);
            } else {
                const parent = commentMap[comment.initialComment];
                if (parent) {
                    parent.replies.push(commentMap[comment.commentID]);
                }
            }
        });
        return (nestedComments);
    }

    function sortTopLevelComments(comments) {
        comments.sort((a, b) => new Date(b.commentDate) - new Date(a.commentDate));
    }

    function sortReplies(comments) {
        for (const commentObject of comments) {
            if (commentObject.replies.length > 0) {
                commentObject.replies.sort((a, b) => new Date(b.commentDate) - new Date(a.commentDate));
                sortReplies(commentObject.replies);
            }
        }
    }

    let dict = {};
    dict = getAllComments(dict, postID, model.posts.find(post => post.postID === postID).commentIDs);
    let commentsNested = transformData(dict[postID]);
    sortTopLevelComments(commentsNested);
    sortReplies(commentsNested);

    function renderComments(comments) {
        return comments.map(comment => {
            const commentData = model.comments.find(c => c.commentID === comment.commentID);
            return (
                <div key={comment.commentID} className="comment">
                    <div className="commentHeader">
                        <p>u/{commentData.commentedBy} • {generateTimeStamp(commentData.commentedDate)}</p>
                    </div>

                    <div className="commentContent">
                        <p>{commentData.content}</p>
                    </div>

                    <div className="commentFooter">
                        <button onClick={() => {
                            setCommentID(comment.commentID);
                            setView("NewComment");
                        }}>Reply</button>
                    </div>

                    {comment.replies.length > 0 && (
                        <div className="replies">
                            {renderComments(comment.replies)}
                        </div>
                    )}
                </div>
            );
        });
    }

    return (
        <div>
            {commentsNested.length > 0 ? (
                renderComments(commentsNested)
            ) : (
                <div>
                    <p>No Comments yet. . .  Be the first to comment!</p>
                    <br></br>
                    <img className= "noCommentsImage" src={image} alt="No Comments"/>
                    <br></br>
                    <p>Nobody's responded to this post yet. Add your thoughts and get the conversation going.</p>
                </div>
                
            )}
        </div>
    );
}

export default Comments;