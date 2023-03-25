import { createContext, useReducer } from "react";

export const todosContext = createContext();

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        todos: action.payload,
      };
    case "CREATE_TODOS":
      return {
        todos: [action.payload, ...state.todos],
      };
    case "DELETE_TODOS":
      return {
        todos: state.todos.filter((todo) => todo._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, { todos: null });

  return (
    <todosContext.Provider value={{ ...state, dispatch }}>
      {children}
    </todosContext.Provider>
  );
};
