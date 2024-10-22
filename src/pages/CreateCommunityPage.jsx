// either reuse this component for creating or create 
// additional files for create post, comments, and community
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import React, { useContext, useState } from "react"
import { ModelContext } from "../context/ModelContext.jsx"
import { ViewContext } from "../context/ViewContext";
import "../stylesheets/CreateCommunity.css"
import "../stylesheets/index.css"

const CreateCommunity = () => {
    const {setView, setCommunityID } = useContext(ViewContext);
    const { model, setModel } = useContext(ModelContext);

    //state for form inputs
    const [communityName, setCommunityName] = useState('');
    const [communityDescription, setCommunityDescription] = useState('');
    const [creatorUsername, setCreatorUsername] = useState('');

    //error state
    const [errors, setErrors] = useState({
        communityName: '',
        communityDescription: '',
        creatorUsername: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        //validate inputs
        const newErrors = {
            communityName: '',
            communityDescription: '',
            creatorUsername: '',
        };

        let isValid = true;

        if(communityName.trim() === '') {
            newErrors.communityName = 'Community name is required.';
            isValid = false;
        }
        else if (communityName.length > 100) {
            newErrors.communityName = 'Community name should not exceed 100 characters.';
            isValid = false;
        }

        if(communityDescription.trim() === ''){
            newErrors.communityDescription = 'Community description is required.';
            isValid = false;
        }
        else if (communityDescription.length > 500) {
            newErrors.communityDescription = 'Community description should not exceed 500 characters.'
            isValid = false;
        }

        if (creatorUsername.trim() === '') {
            newErrors.creatorUsername = 'Creator username is required.';
            isValid = false;
        }

        setErrors(newErrors);

        if(isValid) {
            //new community object
            const newCommunityID = `community${model.communities.length + 1}`;
            const newCommunity = {
                communityID: newCommunityID,
                name: communityName.trim(),
                description: communityDescription.trim(),
                postIDs: [],
                startDate: new Date(),
                members: [creatorUsername.trim()],
                memberCount: 1,
            };

            setModel((prevModel) => ({
                ...prevModel,
                communities: [...prevModel.communities, newCommunity],
            }));

            //navigate to the new community page
            setCommunityID(newCommunityID);
            setView('CommunityPage');

            //reset fields
            setCommunityName('');
            setCommunityDescription('');
            setCreatorUsername('');

            setErrors({
                communityName: '',
                communityDescription: '',
                creatorUsername: '',

            });
        }
        else {
            setCommunityName(communityName.trim());
            setCommunityDescription(communityDescription.trim());
            setCreatorUsername(creatorUsername.trim());
        }

    };

    return (
        <div>
        <Header/>
        <div className = "containerSideMain">
        <Navbar/>
        <div id="main" className = "main">
        <div className = "create-community-container">
            <h2>Create a New Community</h2>
            <form onSubmit = {handleSubmit} className = "create-community-form">
                {/*Community Name*/}
                <div className = "form-group">
                    <label htmlFor = "communityName">
                        Community Name <span className = "required">*</span>
                    </label>
                    <input
                    type = "text"
                    id = "communityName"
                    value = {communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    maxLength="100"
                    required />
                    {errors.communityName && (
                        <span className = "error-message">{errors.communityName}</span>
                    )}
                    <small>{communityName.length}/100 chars</small>
                </div>

                {/*Comm Descr */}
                <div className = "form-group">
                    <label htmlFor = "communityDescription">
                        Community Description <span className = "required">*</span>
                    </label>
                    <textarea
                    id = "communityDescription"
                    value = {communityDescription}
                    onChange={(e) => setCommunityDescription(e.target.value)}
                    maxLength="500"
                    required />
                    {errors.communityDescription && (
                        <span className = "error-message">{errors.communityDescription}</span>
                    )}
                    <small>{communityDescription.length}/500 chars</small>
                </div>
                {/*Creator Username */}
                <div className = "form-group">
                    <label htmlFor = "creatorUsername">
                       Creator Username <span className = "required">*</span>
                    </label>
                    <input
                    type = "text"
                    id = "creatorUsername"
                    value = {creatorUsername}
                    onChange={(e) => setCreatorUsername(e.target.value)}
                    maxLength="100"
                    required />
                    {errors.creatorUsername && (
                        <span className = "error-message">{errors.creatorUsername}</span>
                    )}
                </div>

                {/*Submit Btn */}
                <button type = "submit" className = "engender-button">
                    Engender Community
                </button>

            </form>
            </div>
        </div>
        </div>
        </div>
    );

};

export default CreateCommunity;
