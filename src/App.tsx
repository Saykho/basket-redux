import React, { useEffect } from 'react';
import './App.css';
import { useActions } from "./hooks/useAction";
import { Shop } from "./components/Shop";
import { Basket } from "./components/Basket";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const {fetchProducts} = useActions();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Shop/>}/>
              <Route path="/basket" element={<Basket/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
