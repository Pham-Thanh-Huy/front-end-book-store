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
import ActiveAccount from "./layouts/user/ActiveAccount";
import { Login } from "./layouts/user/Login";
import { Test } from "./layouts/user/Test";
import BookForm_Admin from "./layouts/admin/BookForm";

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
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/active/:email/:codeActive"
            element={<ActiveAccount />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/admin/product/form" element={<BookForm_Admin />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
