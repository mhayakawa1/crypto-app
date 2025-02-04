import { createAction, createReducer } from "@reduxjs/toolkit";

interface Todo {
  value: string;
  id: number;
  completed: boolean;
}

export const addTodo = createAction<Todo>("todos/add");
export const toggleTodo = createAction<number>("todos/toggle");
export const deleteTodo = createAction<number>("todos/delete");

export const todosReducer = createReducer(
  [
    { value: "todo 1", id: 1, completed: false },
      { value: "todo 2", id: 2, completed: false },
      { value: "todo 3", id: 3, completed: false },
  ],
  (builder) => {
    builder
      .addCase(addTodo, (state: any, action: any) => {
        const todo = action.payload;
        return [...state, todo];
      })
      .addCase(toggleTodo, (state: any, action: any) => {
        const index = action.payload;
        const todo = state[index];
        return [
          ...state.slice(0, index),
          { ...todo, completed: !todo.completed },
          ...state.slice(index + 1),
        ];
      })
      .addCase(deleteTodo, (state: any, action: any) => {
        const id = action.payload;
        return [...state.filter((element: any) => element.id !== id)];
      });
  }
);

export default todosReducer;
