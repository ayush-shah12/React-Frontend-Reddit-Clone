import { useContext } from 'react';
import { ModelContext } from '../Context/ModelContext';
import { ViewContext } from '../Context/ViewContext';
import '../stylesheets/Post.css';

function Post({ post }) {

    const { model, setModel } = useContext(ModelContext);
    const { setView } = useContext(ViewContext);

    function generateTimeStamp(date) {
        let currentDate = new Date();
        let difference = currentDate - date;
        //using milliseconds instead of directly comparing 
        //using Date methods since then we need to account for 
        //different months, years etc. for each case

        let dayDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
        let hourDifference = Math.floor((difference / (1000 * 60 * 60)));
        let minuteDifference = Math.floor((difference / (1000 * 60)));
        let secondDifference = Math.floor((difference / 1000));

        if (dayDifference === 0) {
            if (hourDifference === 0) {
                if (minuteDifference === 0) {
                    if (secondDifference === 0) {
                        return "Just now";
                    }
                    return (secondDifference === 1) ? secondDifference + " second ago" : secondDifference + " seconds ago";
                }
                return (minuteDifference === 1) ? minuteDifference + " minute ago" : minuteDifference + " minutes ago";
            }
            return (hourDifference === 1) ? hourDifference + " hour ago" : hourDifference + " hours ago";
        }

        //hourDifference here **should** be greater than 24 as a given, but just in case
        if (hourDifference >= 24 && dayDifference < 30) {
            return (dayDifference === 1) ? dayDifference + " day ago" : dayDifference + " days ago";
        }

        if (dayDifference < 365) {  //checks within a year

            //handles if months in different years, but not more than a year apart to get accurate differenec
            let yearDifference = (currentDate.getFullYear() - date.getFullYear());
            let monthDifference = yearDifference * 12 + (currentDate.getMonth() - date.getMonth());

            return (monthDifference === 1) ? monthDifference + " month ago" : monthDifference + " months ago";
        }

        // If more than a year
        let yearDifference = currentDate.getFullYear() - date.getFullYear();
        return (yearDifference === 1) ? "1 year ago" : yearDifference + " years ago";

    }

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
    }

    return (
        <div className="linkToPost nav-link" onClick={() => { onClickPost(post.postID) }} style={{ cursor: "pointer" }}>
            <div className="post">
                <div className="postHeader">
                    <p> u/{post.postedBy} • {getCommunityName(post.postID)} • {generateTimeStamp(post.postedDate)}</p>
                </div>
                <div className="postTitle">
                    <h3>{post.title}</h3>
                </div>
                {post.linkFlairID !== "" && <div className="linkFlair"> <p>{getLinkFlair(post.linkFlairID)}</p> </div>}

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

export default Post;
