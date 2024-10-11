import { createContext, useState } from "react";
export const ViewContext = createContext({});

export function ViewContextProvider({ children }) {
    const [view, setView] = useState("Home");

    return (
        <ViewContext.Provider value={{ view, setView }}>
            {children}
        </ViewContext.Provider>
    )
}