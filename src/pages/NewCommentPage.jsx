import React, { useContext, useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { ModelContext } from "../context/ModelContext";
import { ViewContext } from "../context/ViewContext";
import "../stylesheets/NewComment.css";

const NewComment = () => {
    const { model, setModel } = useContext(ModelContext);
    const { setView, postID, commentID} = useContext(ViewContext);

    //state forms
    const [commentContent, setCommentContent] = useState("");
    const [username, setUsername] = useState("");

    //error states
    const [errors, setErrors] = useState({
        commentContent: "",
        username: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;
        const validationErrors = {
            commentContent: "",
            username: "",
        };

        if(commentContent.trim() === "") {
            validationErrors.commentContent = "Comment content is required.";
            isValid = false;
        }
        else if(commentContent.length > 500) {
            validationErrors.commentContent = "Comment should not exceed 500 characters.";
            isValid = false;
        }

        if(username.trim() === "") {
            validationErrors.username = "Username is required.";
            isValid = false;
        }

        setErrors(validationErrors);

        if(isValid) {
            const newCommentID = `comment${model.comments.length + 1}`;
            const newComment = {
                commentID: newCommentID,
                content: commentContent.trim(),
                commentIDs: [],
                commentedBy: username.trim(),
                commentedDate: new Date(),
            };

            //update the model
            setModel((prevModel) => {
                let updatedComments = [...prevModel.comments,newComment];

                let updatedPosts = [...prevModel.posts];
                let updatedParentComments = [...prevModel.comments];

                //if reply to a comment
                if(commentID){
                    updatedParentComments = updatedParentComments.map((comment) => {
                        if(comment.commentID === commentID) {
                            return {
                                ...comment,
                                commentIDs: [newCommentID, ...comment.commentIDs],
                            };
                        }
                        return comment;
                    });

                    //update the comment array with the updated parent comments
                    updatedComments = updatedParentComments;
                    updatedComments.push(newComment);
                }
                else {
                    //reply to a post
                    updatedPosts = updatedPosts.map((post) => {
                        if(post.postID === postID) {
                            return {
                                ...post,
                                commentIDs: [newCommentID, ...post.commentIDs],
                            };
                        }
                        return post;
                    });
                }

                return {
                    ...prevModel,
                    comments: updatedComments,
                    posts: updatedPosts,
                };
            });

            //reset
            setCommentContent("");
            setUsername("");
            setErrors({
                commentContent: "",
                username: "",
            });
            setView("PostPage")
        }
        else {
            setCommentContent(commentContent.trim());
            setUsername(username.trim());
        }
    };

    return (
        <div>
            <Header />
            <div className = "containerSideMain">
                <NavBar />
                <div id = "main" className = "main">
                    <div className = "new-comment-container">
                        <h2>Add a Comment </h2>
                        <form onSubmit = {handleSubmit} className = "new-comment-form">
                            {/* comment content */}
                            <div className = "form-group">
                                <label htmlFor = "commentContent">
                                    Comment Content <span className ="required">*</span>
                                </label>
                                <textarea
                                id = "commentContent"
                                value = {commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                maxLength = "500"
                                required></textarea>
                                {errors.commentContent && (
                                    <span className = "error-message">{errors.commentContent}</span>
                                
                                )}
                                <small>{commentContent.length}/500 chars</small>
                            </div>

                            {/* username */}
                            <div className = "form-group">
                                <label htmlFor = "username">
                                    Username <span className ="required">*</span>
                                </label>
                                <input
                                type = "text"
                                id = "username"
                                value = {username}
                                onChange =  {(e) => setUsername(e.target.value)}
                                required
                                />
                                {errors.username && (
                                    <span className = "error-message">{errors.username}</span>
                                )}
                            </div>
                            <button type = "submit" className = "submit-comment-button">
                                Submit Comment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewComment;

