import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import BookProps from "./Components/BookProps";
import { getAllBook, searchBook } from "../../api/BookApi";
import Pagination from "../util/Pagination";

interface ListProductProps {
  searchInput: string;
  categoryId: number;
}

function ListProduct({ searchInput, categoryId }: ListProductProps) {
  const [listBook, setListBook] = useState<BookModel[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (searchInput === "" && categoryId === 0) {
      getAllBook(currentPage - 1)
        .then((bookData) => {
          setListBook(bookData.result);
          setTotalPage(bookData.totalPage);
          setLoadingData(false);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      searchBook(searchInput, currentPage - 1, categoryId)
        .then((bookData) => {
          setListBook(bookData.result);
          setTotalPage(bookData.totalPage);
          setLoadingData(false);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  }, [currentPage, searchInput, categoryId]);

  if (loadingData) {
    return (
      <div>
        <h1>Đang tải dữ liệu</h1>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div>
        <h1>Gặp lỗi: {errorMessage}</h1>
      </div>
    );
  }

  const pagination = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  if (listBook.length === 0) {
    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-center">
          <h1>Not found book search {searchInput}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mt-4">
        {listBook.map((book) => (
          <BookProps key={book.bookId} book={book} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        pagination={pagination}
      />
    </div>
  );
}

export default ListProduct;
