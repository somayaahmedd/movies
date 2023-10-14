
import { createContext, useState } from 'react';

export let ShareDataContext = createContext();

export function ShareDataContextProvider(props) {

    let [categoryType, setCategoryType] = useState("now_playing");
    function changeCategory(type) {
        setCategoryType(type)
    }
    return <ShareDataContext.Provider value={{ categoryType, changeCategory }}>

        {props.children}
    </ShareDataContext.Provider>
}