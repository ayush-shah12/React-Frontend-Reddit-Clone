import { createContext, useState } from "react";
export const ViewContext = createContext({});

export function ViewContextProvider({ children }) {
    const [view, setView] = useState("Home");
    const [postID, setPostID] = useState(null);

    return (
        <ViewContext.Provider value={{ view, setView, postID, setPostID }}>
            {children}
        </ViewContext.Provider>
    )
}