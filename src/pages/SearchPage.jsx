import { useContext, useEffect, useState, useCallback } from "react"
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Post from "../components/Post"
import { ModelContext } from "../context/ModelContext.jsx"
import { ViewContext } from "../context/ViewContext";
import { sortPosts } from "../components/utils.js";
import "../stylesheets/SearchPage.css"
import "../stylesheets/HomePage.css"


import NoResultsImage from "../images/NoResults.svg";

const sanitizeWord = (word) => {
    return word.replace(/[^\w]/g, '');
};

const stopWords = [
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is',
    'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'these',
    'they', 'this', 'to', 'was', 'will', 'with'
  ];


const SearchPage = () => {
    const { model } = useContext(ModelContext);
    const { searchQuery } = useContext(ViewContext);
    const [searchResults, setSearchResults] = useState([]);
    const [sortedResults, setSortedResults] = useState([]);
    const [sort,setSort] = useState("Newest");


    const performSearch = useCallback((query) => {
        const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
       //filter out stopwords
       const filteredTerms = searchTerms.filter(
        (term) => !stopWords.includes(term)
       ).map(sanitizeWord);
       const matchedPosts = new Set();
       
        //search posts
        model.posts.forEach((post) => {
            const postTitleWords = post.title.toLowerCase().split(/\s+/).filter(Boolean).map(sanitizeWord);
            const postContentWords = post.content.toLowerCase().split(/\s+/).filter(Boolean).map(sanitizeWord);

            if(filteredTerms.some((term) => postTitleWords.includes(term) || postContentWords.includes(term))) {
                matchedPosts.add(post.postID);
            }
        });

        //search comments
        model.comments.forEach((comment) => {
            const commentContent = comment.content.toLowerCase().split(/\s+/).filter(Boolean).map(sanitizeWord);
            if(filteredTerms.some((term) =>commentContent.includes(term))) {
                matchedPosts.add(comment.postID);
            }
        });

        //get the matched posts
        const res = model.posts.filter((post) => matchedPosts.has(post.postID));
        return res;
    }, [model.posts, model.comments]);

    //perform search when searchQuery changes
    useEffect(() => {
        if(searchQuery) {
            const results = performSearch(searchQuery);
            setSearchResults(results);
        }
    },[searchQuery, performSearch]);

    useEffect(() => {
        if(searchResults.length > 0){
            const sorted = sortPosts(model, sort, searchResults);
            setSortedResults(sorted);
        }
        else {
            setSortedResults([]);
        }
    }, [sort, searchResults, model]);
    return (
        <div>
            <Header />
            <div className = "containerSideMain">
            <Navbar />
            <div id = "main" className = "main">
                {sortedResults.length> 0 ? (
                    <>
                    <header>
                        <h2>Results for: {searchQuery}</h2>
                        <div className="buttonContainer">
                            <button onClick={() => setSort("Newest")}>Newest</button>
                            <button onClick={() => setSort("Oldest")}>Oldest</button>
                            <button onClick={() => setSort("Active")}>Active</button>
                        </div>
                    </header>
                    <div className="postCountDiv1">
                        <h3>Number of Posts: {sortedResults.length}</h3>
                    </div>
                    <div id="postContainer" className="postContainer">
                        {sortedResults.map((post) => (
                            <Post key={post.postID} post={post} />
                        ))}
                    </div>
                </>
                ): (
                    <>
                    <header>
                        <h2>No results found for: {searchQuery}</h2>
                    </header>
                    <div className="postCountDiv1">
                        <h3>Number of Posts: {sortedResults.length}</h3>
                    </div>
                    <div id = "postContainer" className ="postContainer no-results-container">
                        <img src = {NoResultsImage} alt = "No results found" className = "no-results-image"></img>
                        <p>Hm... we couldn’t find any results</p>
                    </div>
                    </>
                )}
                </div>
            </div>
            </div>

                );
            };


export default SearchPage;