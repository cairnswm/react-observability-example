import React, { useState, useEffect } from 'react';
import './App.css';
import ObservabilityProvider from './provider/provider';
import useFetch from './provider/usefetch';

const AppContent = (props) => {
  const [items, setitems] = useState([{id: 0, name: "Loading"}]);
  const [todos, settodos] = useState([]);
  const {fetch} = useFetch();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        setitems(json);
      });
  }, []);

  // useEffect(() => {
  //   window.fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setitems(json);
  //     })
  //     .catch((err) => { console.log("FETCH ERROR", err) });
  // }, []);

  return <div className="App">
      {items.map((item) => {
        return <div key={item.id}>{item.name}</div>
        })}
    </div>
}

function App() {
  return (
    <ObservabilityProvider>
      <AppContent />
    
    </ObservabilityProvider>
  );
}

export default App;
