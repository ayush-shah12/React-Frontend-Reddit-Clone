import { useContext } from "react";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import PostPage from "./pages/PostPage";
import { ViewContext } from "./context/ViewContext";
import Create from "./pages/Create";
import CommunityPage from "./pages/CommunityPage";

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
      case "Create":
        content = <Create />;
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