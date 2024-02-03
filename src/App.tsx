import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./layouts/header-footer/NavBar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homepage/HomePage";
import { getAllBook } from "./api/BookApi";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layouts/about/About";
import ProductDetail from "./layouts/product/ProductDetail";
import { Register } from "./layouts/user/Register";

function App() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar searchInput={searchInput} setSearchInput={setSearchInput} />
        <Routes>
          <Route path="/" element={<HomePage searchInput={searchInput} />} />
          <Route
            path="/:codeCategory"
            element={<HomePage searchInput={searchInput} />}
          />
          <Route path="/book/:bookId" element={<ProductDetail />} />
          <Route path="/about" element={<About />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
