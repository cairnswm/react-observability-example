import React, { useState, useEffect } from "react";
import "./App.css";
import ObservabilityProvider from "./provider/provider";
import useFetch from "./provider/usefetch";

// This Component uses the replaced global fetch that enables observability. Doing it this way means no chnages to the code.
// hoever the code behaves differently to how developers would expect it to
// but developers dont chnage their development process
const AppContentNoContext = (props) => {
  const [items, setitems] = useState([{ id: 0, name: "Loading" }]);
  const [todos, settodos] = useState([]);
  // const {fetch} = useFetch();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((json) => {
        setitems(json);
      });
  }, []);
  return (
    <div className="App">
      <h1>ToDos</h1>
      {items.filter((item, index) => index <= 10).map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </div>
  );
};

// This component adds an extra step then the provider must be loaded at a high level and fetch is imported from useFetch
// this is extra steps 
const AppContent = (props) => {
  const [items, setitems] = useState([{ id: 0, name: "Loading" }]);
  const [todos, settodos] = useState([]);
  const { fetch } = useFetch();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        setitems(json);
      });
  }, []);

  return (
    <div className="App">
      <h1>Users</h1>
      {items.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
};

function App() {
  return (
    <div>
      <AppContentNoContext />
      <ObservabilityProvider>
        <AppContent />
      </ObservabilityProvider>
    </div>
  );
}

export default App;
