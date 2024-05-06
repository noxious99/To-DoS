import { TodoContext } from "./TodoContext";
import { useContext } from "react";

export const useTodoContext = () =>
{
    const context = useContext(TodoContext)
    if(!context)
    {
        throw Error('not in context tree!!')
    }

    return context
}