"use client";
import { Button, DisplayButtons, Display } from "./homeStyles";
import StoreProvider from "./StoreProvider";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
} from "@/lib/features/todos/todosSlice";
import Coins from "./components/Coins";
import Converter from "./components/Converter";

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
  const [coinsData, setCoinsData] = useState([]);

  const toggleDisplay = () => {
    setCoinsVisible((current) => !current);
  };

  const callAPI = () => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
    )
      .then((res) => res.json())
      .then((result) => {
        const newResult = result.map((data: any, index: number) => {
          const {
            id,
            symbol,
            name,
            image,
            current_price,
            price_change_percentage_1h_in_currency,
            price_change_percentage_24h_in_currency,
            price_change_percentage_7d_in_currency,
            total_volume,
            market_cap,
            circulating_supply,
            total_supply,
            sparkline_in_7d,
          } = data;

          const formatValue = (number: any, isPercent: boolean) => {
            const result = { value: number, rising: true };
            if (isPercent) {
              result.value = `${number.toFixed(2)}%`;
              result.rising = Number(number) >= 0;
              return result;
            } else {
              return `$${number.toLocaleString()}`;
            }
          };

          return {
            number: index + 1,
            id: id,
            symbol: symbol,
            name: name,
            image: image,
            price: current_price,
            percents: [
              formatValue(price_change_percentage_1h_in_currency, true),
              formatValue(price_change_percentage_24h_in_currency, true),
              formatValue(price_change_percentage_7d_in_currency, true),
            ],
            volumeMarketCap: {
              totalVolume: total_volume,
              marketCap: market_cap,
            },
            circulatingSupply: {
              circulating: circulating_supply,
              totalSupply: total_supply,
            },
            lastSevenDays: sparkline_in_7d.price.map(
              (price: any, index: number) => {
                return { name: index, uv: price };
              }
            ),
          };
        });

        setCoinsData(newResult);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    callAPI();
  }, []);

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
          disabled={!(coinsData.length > 0)}
        >
          Converter
        </Button>
      </DisplayButtons>
      <Display>
        {coinsVisible ? <Coins coinsData={coinsData} /> : <Converter coinsData={coinsData} />}
      </Display>
      <List />
    </StoreProvider>
  );
}
