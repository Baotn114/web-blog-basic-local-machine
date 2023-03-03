import { createContext, useReducer } from "react";

export const CommentsContext = createContext();

export const commentsReducer = (state, action) => {
    switch (action.type){
        case 'SET_COMMENTS':
            return {
                comments: action.payload
            }
        default:
            return state
    }
}

export const CommentsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(commentsReducer, {
        comments: null
    })

    return (
        <CommentsContext.Provider value={{...state, dispatch}}>
            {children}
        </CommentsContext.Provider>
    )
}

