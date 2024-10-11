import { createContext, useState } from "react";
import Model from "../models/model";
export const ModelContext = createContext({});

export function ModelContextProvider({ children }) {
    const [model, setModel] = useState(new Model().data);

    return (
        <ModelContext.Provider value={{ model, setModel }}>
            {children}
        </ModelContext.Provider>
    )
}