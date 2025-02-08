"use client";
import {
  Button,
  DisplayButtons,
  Statistics,
  TopPanel,
  Slider,
  Charts,
  Chart,
  ChartUl,
  ChartLi,
  TimeRanges,
} from "./homeStyles";
import StoreProvider from "./StoreProvider";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
} from "@/lib/features/todos/todosSlice";

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

const ChartContainer = () => {
  return (
    <Chart>
      <ChartUl>
        <ChartLi className="name">Bitcoin (BTC)</ChartLi>
        <ChartLi className="value">{`$${13.431} mln`}</ChartLi>
        <ChartLi className="date">September 29, 2023</ChartLi>
      </ChartUl>
    </Chart>
  );
};

export default function Home() {
  const timeRanges = ["1D", "7D", "14D", "1M", "1Y", "5Y"];
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
      <Statistics>
        <TopPanel>
          <p>Select the currency to view statistics</p>
          <Button className="inactive compare">
            <img src="null" alt="" />
            Compare
          </Button>
        </TopPanel>
        <Slider>
          <Button className="active slider-button">Bitcoin</Button>
          <Button className="inactive slider-button">Ethereum</Button>
          <Button className="inactive slider-button">Tether</Button>
          <Button className="inactive slider-button">Doge Coin</Button>
          <Button className="inactive slider-button">Binance Coin</Button>
        </Slider>
        <Charts>
          <ChartContainer></ChartContainer>
          <ChartContainer></ChartContainer>
        </Charts>
        <TimeRanges>
          {timeRanges.map((element, index) => (
            <Button key={index} className="inactive time-range-button">
              {element}
            </Button>
          ))}
        </TimeRanges>
      </Statistics>
      <List />
    </StoreProvider>
  );
}
