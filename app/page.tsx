"use client";
import { Button, DisplayButtons, Display } from "./homeStyles";
import StoreProvider from "./StoreProvider";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
} from "@/lib/features/todos/todosSlice";
import Coins from "./Coins";
import Converter from "./Converter";

const List = () => {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  return (
    <div>
      <button
        onClick={() =>
          dispatch(
            addTodo({ value: "test", id: todos.length + 1, completed: false })
          )
        }
      >
        Add Stuff
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <span>
              {todo.value} {todo.id}{" "}
            </span>
            <button onClick={() => dispatch(toggleTodo(index))}>
              {todo.completed ? "done" : "pending"}
            </button>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Home() {
  const [coinsVisible, setCoinsVisible] = useState(true);

  const toggleDisplay = () => {
    setCoinsVisible((current) => !current);
  };

  return (
    <StoreProvider>
      <DisplayButtons>
        <Button
          onClick={toggleDisplay}
          className={`${coinsVisible ? "active" : "inactive"}`}
        >
          Coins
        </Button>
        <Button
          onClick={toggleDisplay}
          className={`${coinsVisible ? "inactive" : "active"}`}
        >
          Converter
        </Button>
      </DisplayButtons>
      <Display>{coinsVisible ? <Coins /> : <Converter />}</Display>
      <List />
    </StoreProvider>
  );
}
