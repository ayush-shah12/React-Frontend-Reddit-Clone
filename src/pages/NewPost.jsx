import React, { useContext, useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { ModelContext } from "../context/ModelContext";
import { ViewContext } from "../context/ViewContext";
import "../stylesheets/NewPost.css";
import "../stylesheets/index.css";



const NewPost = () => {
    const {model, setModel } = useContext(ModelContext);
    const {setView} = useContext(ViewContext);

    //state for input forms
    const [selectedCommunity, setSelectedCommunity] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [linkFlair, setLinkFlair] = useState('');
    const [postContent, setPostContent] = useState('');
    const [username, setUsername] = useState('');

    const [showNewLinkFlairInput, setShowNewLinkFlairInput] = useState(false);
    const [newLinkFlair, setNewLinkFlair] = useState("");

    //error states
    const [errors, setErrors] = useState({
        selectedCommunity: '',
        postTitle: '',
        linkFlair: '',
        postContent: '',
        username: '',

    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;

        const newErrors = {
            selectedCommunity: '',
            postTitle: '',
            linkFlair:'',
            postContent:'',
            username:'',
        };

        if (selectedCommunity === "") {
            newErrors.selectedCommunity = "Community selection is required.";
            isValid = false;
        }
    
        if(postTitle.trim() === ''){
            newErrors.postTitle = "Post Title is required.";
            isValid = false;
        }
        else if(postTitle.length>100){
            newErrors.postTitle = "Post Title should not exceed 100 characters.";
            isValid = false;
        }

        if(showNewLinkFlairInput) {
            if(newLinkFlair.trim() === "") {
                newErrors.linkFlair = "New Link Flair is required.";
                isValid = false;
            }
            else if (newLinkFlair.trim().length > 30) {
                newErrors.linkFlair = "Link Flair should not exceed 30 characters.";
                isValid = false;
            }
        }
        if(postContent.trim() === "") {
            newErrors.postContent = "Post Content is required.";
            isValid = false;
        }
        if(username.trim() === "") {
            newErrors.username = "Username is required.";
            isValid = false;
        }

        setErrors(newErrors);

        if(isValid) {
            const newPostID = `p${model.posts.length+1}`;
            let newLinkFlairID = linkFlair;
            let updatedLinkFlairs = [...model.linkFlairs];
            if(showNewLinkFlairInput && newLinkFlair.trim() !== "") {
                newLinkFlairID = `lf${model.linkFlairs.length + 1}`;
                const newLinkFlairObject = {
                    linkFlairID: newLinkFlairID,
                    content: newLinkFlair.trim(),
                };
                updatedLinkFlairs.push(newLinkFlairObject);
            }
            const newPost = {
                postID: newPostID,
                title: postTitle.trim(),
                content: postContent.trim(),
                linkFlairID: newLinkFlairID,
                postedBy: username.trim(),
                postedDate: new Date(),
                commentIDs: [],
                views: 0,
            };

            setModel((prevModel) => {
                //add post to selected community
                const updatedCommunities = prevModel.communities.map((community) => {
                    if(community.communityID === selectedCommunity) {
                        return {
                            ...community,
                            postIDs: [...community.postIDs, newPostID],
                        };
                    }
                    return community;
                });

                return {
                    ...prevModel,
                    posts: [...prevModel.posts, newPost],
                    communities: updatedCommunities,
                    linkFlairs: updatedLinkFlairs,
                };
            });
     
           setView("Home");
        }
        else {
            setSelectedCommunity(selectedCommunity.trim());
            setPostTitle(postTitle.trim());
            setNewLinkFlair(newLinkFlair.trim());
            setPostContent(postContent.trim());
            setUsername(username.trim());
        }
    };

    const handleLinkFlairChange = (e) => {
        const value = e.target.value;
        setLinkFlair(value);

        if(value === "AddNewLinkFlair") {
            setShowNewLinkFlairInput(true);
            setNewLinkFlair("");
        }
        else {
            setShowNewLinkFlairInput(false);
            setNewLinkFlair("");
        }
    };

    return (

        <div>
        <Header />
        <div className="containerSideMain">
            <NavBar />
            <div id="main" className="main">
        <div className = "new-post-container">
            <h2>Create a New Post</h2>
            <form onSubmit = {handleSubmit} className = "new-post-form">
                {/* community selection */}
                <div className = "form-group">
                    <label htmlFor="communitySelect">
                        Select Community <span className = "required">*</span>
                    </label>
                    <select
                    id ="communitySelect"
                    value = {selectedCommunity}
                    onChange={(e) => setSelectedCommunity(e.target.value)} required>
                        <option value="" style={{fontStyle: 'italic'}}>Select a Community</option>
                        {model.communities.map((community) => (
                            <option key = {community.communityID} value = {community.communityID}>
                                {community.name}
                            </option>
                        )
                        )}
                    </select>
                    {errors.selectedCommunity && <span className = "error-message">
                        {errors.selectedCommunity}</span>}
                 
                </div>

                {/* post title */}
                <div className = "form-group">
                    <label htmlFor = "postTitle">Post Title <span className = "required">*</span></label>
                    <input
                    type = "text"
                    id = "postTitle"
                    value = {postTitle}
                    onChange = {(e)=> setPostTitle(e.target.value)}
                    maxLength = "100"
                    required
                    />
                    {errors.postTitle && <span className = "error-message"> {errors.postTitle}</span>}
                    <small>{postTitle.length}/100 chars</small>
                </div>

                {/* link flair */}
                <div className ="form-group">
                    <label htmlFor = "linkFlairSelect"> Link Flair (Optional)</label>
                    <select
                    id = "linkFlairSelect"
                    value = {linkFlair}
                    onChange = {handleLinkFlairChange}
                    >
                        <option value ="" style={{fontStyle: 'italic'}}>Select a Link Flair</option>
                        {model.linkFlairs.map((flair) => (
                            <option key={flair.linkFlairID} value ={flair.linkFlairID}>
                                {flair.content}
                            </option>
                        ))}
                         <option disabled>_______________</option>
                        <option value ="AddNewLinkFlair" style={{fontWeight: "500"}}>Add New Link Flair</option>
                    </select>
                </div>
                {showNewLinkFlairInput && (
                <div className = "form-group">
                    <label htmlFor = "newLinkFlair">New Link Flair (Optional)</label>
                    <input
                        type="text"
                        id="newLinkFlair"
                        value={newLinkFlair}
                        onChange={(e) => setNewLinkFlair(e.target.value)}
                        maxLength="30"
                    />
                    {errors.linkFlair && <span className="error-message">{errors.linkFlair}</span>}
                    <small>{newLinkFlair.length}/30 characters</small>
                </div>
)}
                {/* post cont */}
                <div className="form-group">
                    <label htmlFor="postContent">Post Content<span className = "required">*</span></label>
                    <textarea
                        id="postContent"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        required
                    ></textarea>
                    {errors.postContent && <span className="error-message">{errors.postContent}</span>}
                </div>
                {/* user */}
                <div className="form-group">
                    <label htmlFor="username">Username<span className = "required">*</span></label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required

                    />
                    {errors.username && <span className="error-message">{errors.username}</span>}
                </div>
                <button type="submit" className="submit-post-button">
                    Submit Post
                </button>
            </form>
        </div>
        </div>
            </div>
        </div>
    );
};

export default NewPost;