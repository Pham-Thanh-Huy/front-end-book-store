import React, { FormEvent, useState } from "react";
import RequireAdmin from "./RequireAdmin";

const BookForm: React.FC<{}> = () => {
  const [book, setBook] = useState({
    bookId: 0,
    bookName: "",
    authorName: "",
    ISBN: "",
    description: "",
    listedPrice: 0,
    price: 0,
    quantity: 0,
    rate: 0,
  });

  const handleSubmit = (event: FormEvent) => {
    // Xử lý logic khi submit form
    event.preventDefault();
    console.log("Form submitted:", book);
    // Gọi API hoặc thực hiện các xử lý khác tại đây
    const token = localStorage.getItem("token");
    fetch("http://localhost:8888/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(book),
    }).then((response) => {
      if (response.ok) {
        alert("đã thêm sách thành công");
        setBook({
          bookId: 0,
          bookName: "",
          authorName: "",
          ISBN: "",
          description: "",
          listedPrice: 0,
          price: 0,
          quantity: 0,
          rate: 0,
        });
      }
    });
  };
  const handleListedPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    // Kiểm tra xem giá trị nhập vào có nằm trong khoảng từ 1 đến 10 không
    if (inputValue >= 0 && inputValue <= 10) {
      setBook({ ...book, listedPrice: inputValue });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="mb-3">
          <input type="hidden" id="bookId" value={book.bookId} />
        </div>
        <div className="mb-3">
          <label htmlFor="bookName" className="form-label">
            Tên sách
          </label>
          <input
            type="text"
            className="form-control"
            id="bookName"
            value={book.bookName}
            onChange={(e) => setBook({ ...book, bookName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="authorName" className="form-label">
            Tên tác giả
          </label>
          <input
            type="text"
            className="form-control"
            id="authorName"
            value={book.authorName}
            onChange={(e) => setBook({ ...book, authorName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ISBN" className="form-label">
            ISBN
          </label>
          <input
            type="text"
            className="form-control"
            id="ISBN"
            value={book.ISBN}
            onChange={(e) => setBook({ ...book, ISBN: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Mô tả
          </label>
          <textarea
            className="form-control"
            id="description"
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="listedPrice" className="form-label">
            Giá niêm yết
          </label>
          <input
            type="number"
            min={0}
            max={10}
            className="form-control"
            id="listedPrice"
            value={book.listedPrice}
            onChange={handleListedPriceChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Giá
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={book.price}
            onChange={(e) =>
              setBook({ ...book, price: Number(e.target.value) })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Số lượng
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={book.quantity}
            onChange={(e) =>
              setBook({ ...book, quantity: Number(e.target.value) })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rate" className="form-label">
            Đánh giá
          </label>
          <input
            type="number"
            className="form-control"
            id="rate"
            value={book.rate}
            onChange={(e) => setBook({ ...book, rate: Number(e.target.value) })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

const BookForm_Admin = RequireAdmin(BookForm);
export default BookForm_Admin;
