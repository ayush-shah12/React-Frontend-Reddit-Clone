import { createContext, useState } from "react";
export const ViewContext = createContext({});

export function ViewContextProvider({ children }) {
    const [view, setView] = useState("Home");
    const [postID, setPostID] = useState(null);
    const [communityID, setCommunityID] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <ViewContext.Provider 
        value={{ 
            view,
            setView, 
            postID, 
            setPostID, 
            communityID, 
            setCommunityID,
            searchQuery,
            setSearchQuery,
            }}
        >

        {children}
        </ViewContext.Provider>
    );
}