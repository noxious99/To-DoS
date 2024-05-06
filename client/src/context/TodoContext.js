import { createContext, useReducer } from "react";

export const TodoContext = createContext()

export const TodoReducer = (state, action) =>
{
    switch (action.type) {
        case 'CREATE_TODO':
        return{
            todos: [action.payload, ...state.todos]
        }
        case 'GET_TODOS':
        return{
            todos: action.payload
        }
        default:
            return state
    }
}

export const TodoContextProvider = ({children}) =>
{
    const [state, dispatch] = useReducer(TodoReducer, {
        todos: null
    })

    return(
        <TodoContext.Provider value={{...state, dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}