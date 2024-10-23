export function sortPosts(model, sort, posts) {
    let postsArray = [...posts];

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

export function generateTimeStamp(date) {
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