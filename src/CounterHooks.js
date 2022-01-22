import React, { useState, useContext } from "react";
import { ThemeContext } from "./App";

export default function CounterHooks({ initialCount }) {
  const [s, setState1] = useState({ count: initialCount });
  const style = useContext(ThemeContext);
  return (
    <div>
      <button
        style={style}
        onClick={() =>
          setState1((prevState) => {
            return { count: prevState.count - 1 };
          })
        }
      >
        -
      </button>
      <span>{s.count}</span>
      <button
        style={style}
        onClick={() =>
          setState1((prevState) => {
            return { count: prevState.count + 1 };
          })
        }
      >
        +
      </button>
    </div>
  );
}
