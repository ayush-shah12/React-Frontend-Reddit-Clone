import { createContext, useState } from "react";
export const ViewContext = createContext({});

export function ViewContextProvider({ children }) {
    const [view, setView] = useState("Home");
    const [postID, setPostID] = useState(null);
    const [communityID, setCommunityID] = useState(null);

    return (
        <ViewContext.Provider value={{ view, setView, postID, setPostID, communityID, setCommunityID }}>
            {children}
        </ViewContext.Provider>
    )
}