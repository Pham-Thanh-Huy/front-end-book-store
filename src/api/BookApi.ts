import React from "react";
import BookModel from "../models/BookModel";
import { url_request } from "./Request";

interface ResultInterFace {
  result: BookModel[];
  totalPage: number;
}

async function getBook(endpoint: string): Promise<ResultInterFace> {
  const result: BookModel[] = [];

  //xac dinh endpoint
  const url: string = endpoint;

  // goi phuong thuc request
  const response = await url_request(url);

  //Lấy ra json sách
  const responseData = response._embedded.books;

  //lay ra totalpage
  const totalPage: number = response.page.totalPages;

  for (const key in responseData) {
    result.push({
      bookId: responseData[key].bookId,
      bookName: responseData[key].bookName,
      authorName: responseData[key].authorName,
      ISBN: responseData[key].ISBN,
      description: responseData[key].description,
      listedPrice: responseData[key].listedPrice,
      price: responseData[key].price,
      quantity: responseData[key].quantity,
      rate: responseData[key].rate,
    });
  }

  return { result: result, totalPage: totalPage };
}

export async function getAllBook(currenPage: number): Promise<ResultInterFace> {
  const url: string = `http://localhost:8888/book?sort=bookId,desc&size=5&page=${currenPage}`;

  return getBook(url);
}

export async function getThreeNewBook(): Promise<ResultInterFace> {
  const url: string =
    "http://localhost:8888/book?sort=bookId,desc&page=0&size=3";

  return getBook(url);
}

export async function searchBook(
  search: string,
  currenPage: number,
  categoryId: number
): Promise<ResultInterFace> {
  let url = `http://localhost:8888/book?sort=bookId,desc&size=5&page=${currenPage}`;
  if (search !== "" && categoryId == 0) {
    url = `http://localhost:8888/book/search/findByBookNameContaining?sort=bookId,desc&size=5&page=${currenPage}&bookName=${search}`;
  } else if (search === "" && categoryId > 0) {
    url = `http://localhost:8888/book/search/findByCategoryList_categoryId?categoryId=${categoryId}&size=5&page=${currenPage}`;
  } else if (search !== "" && categoryId > 0) {
    url = `http://localhost:8888/book/search/findByBookNameContainingAndCategoryList_categoryId?bookName=${search}&categoryId=${categoryId}&size=5&page=${currenPage}`;
  }

  return getBook(url);
}

export async function getBookById(bookId: number): Promise<BookModel | null> {
  let url = `http://localhost:8888/book/${bookId}`;
  let bookModel: BookModel;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Gặp lỗi trong quá trình lấy dữ liệu book Api");
    }
    const bookData = await response.json();
    if (bookData) {
      return {
        bookId: bookData.bookId,
        bookName: bookData.bookName,
        authorName: bookData.authorName,
        ISBN: bookData.ISBN,
        description: bookData.description,
        listedPrice: bookData.listedPrice,
        price: bookData.price,
        quantity: bookData.quantity,
        rate: bookData.rate,
      };
    } else {
      throw new Error("Sách không tồn tại");
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
