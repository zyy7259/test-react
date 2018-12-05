import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";

function Counter() {
  // useState adds some local state to a function component
  const [count, setCount] = useState(0);

  function handleClickReset() {
    setCount(0);
  }

  function handleClickAdd() {
    setCount(prevCount => prevCount + 1);
  }

  function handleClickMinus() {
    setCount(prevCount => prevCount - 1);
  }

  useEffect(() => {
    document.title = `clicked ${count} times`;
  });

  useEffect(() => {
    function handleWindowResize() {
      console.log("window resized");
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      console.log("cleanup resize event");
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <div>
      <DatePicker />
      <p>You clicked {count} times</p>
      <button onClick={handleClickReset}>reset</button>
      <button onClick={handleClickAdd}>+</button>
      <button onClick={handleClickMinus}>-</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

export default App;
