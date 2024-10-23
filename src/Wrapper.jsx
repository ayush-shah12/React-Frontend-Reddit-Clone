import { useContext } from "react";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import PostPage from "./pages/PostPage";
import { ViewContext } from "./context/ViewContext";
import CreateCommunity from "./pages/CreateCommunityPage";
import CommunityPage from "./pages/CommunityPage";
import NewPost from "./pages/NewPost";
import NewComment from "./pages/NewCommentPage";

const Wrapper = () => {
    const { view} = useContext(ViewContext);
  
    let content;
    switch (view) {
      case "Home":
        content = <HomePage />;
        break;
      case "PostPage":
        content = <PostPage />;
        break;
      case "CommunityPage":
        content = <CommunityPage />;
        break;
      case "SearchPage":
        content = <SearchPage />;
        break;
      case "CreateCommunity":
        content = <CreateCommunity />;
        break;
      case "NewPost": 
        content = <NewPost />;
        break;
      case "NewComment":
        content = <NewComment />;
        break;
      default:
        content = <HomePage />;
        break;
    }

    return(
        <div>
            {content}
        </div>
    )
};

export default Wrapper;