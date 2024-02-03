import React, { ChangeEvent } from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  searchInput: string;
  setSearchInput: (search: string) => void;
}

function Navbar({ searchInput, setSearchInput }: NavbarProps) {
  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    searchInput = e.target.value;
  };
  const handleSearch = () => {
    setSearchInput(searchInput);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Bookstore
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Thể loại sách
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li>
                  <a className="dropdown-item" href="/1">
                    Thể loại 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/2">
                    Thể loại 2
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/3">
                    Thể loại 3
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Quy định bán hàng
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                <li>
                  <a className="dropdown-item" href="#">
                    Quy định 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Quy định 2
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Quy định 3
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Tìm kiếm */}
        <div className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Tìm kiếm"
            aria-label="Search"
            onChange={onSearchInputChange}
            // value={searchInput}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </div>

        {/* Biểu tượng giỏ hàng */}
        <ul className="navbar-nav me-1">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-shopping-cart"></i>
            </a>
          </li>
        </ul>

        {/* Biểu tượng đăng nhập */}
        <ul className="navbar-nav me-1">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-user"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
