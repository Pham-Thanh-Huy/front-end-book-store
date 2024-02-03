import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { error } from "console";
import { getBookById } from "../../api/BookApi";
import BookModel from "../../models/BookModel";
import { ImageProduct } from "./Components/ImageProduct";

const ProductDetail: React.FC = () => {
  const [book, setBook] = useState<BookModel | null>(null);
  const [quantity, setQuantity] = useState(1);

  const augmentQuantity = () => {
    const quantityBookPresent = book && book?.quantity ? book?.quantity : 0;
    if (quantity < quantityBookPresent) {
      setQuantity(quantity + 1);
    }
  };
  const reduceQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantityBookPresent = book && book?.quantity ? book?.quantity : 0;
    const newQuantity = parseInt(event.target.value);
    if (
      !isNaN(newQuantity) &&
      newQuantity > 1 &&
      newQuantity <= quantityBookPresent
    ) {
      setQuantity(newQuantity);
    }
  };
  const handleBuyNow = () => {};
  const handleAddToCart = () => {};
  const { bookId } = useParams();
  let bookIdNumber = 0;
  try {
    bookIdNumber = parseInt(bookId || "", 10);
    if (Number.isNaN(bookIdNumber)) {
      throw new Error("Invalid bookId");
    }
  } catch (error) {
    bookIdNumber = 0;
    console.log("error", error);
  }

  useEffect(() => {
    getBookById(bookIdNumber)
      .then((book) => {
        setBook(book);
      })
      .catch((error) => {
        console.log(error + "Khi dang lay api");
      });
  }, [bookId]);   

  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <div className="col-4">
          <ImageProduct bookId={bookIdNumber} />
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-8">
              <h1>{book?.bookName}</h1>
              <h4>{book?.rate}</h4>
              <h4>{(book?.price)?.toLocaleString('vi',{style : 'currency', currency : 'VND'} )}</h4>
              <hr />
              <div
                dangerouslySetInnerHTML={{ __html: book?.description + "" }}
              ></div>
              <hr />
            </div>
            <div className="col-4">
              <div>
                <div className="mb-2">So luong</div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => augmentQuantity()}
                  >
                    +
                  </button>
                  <input
                    className="form-control text-center"
                    value={quantity}
                    min={1}
                    onChange={handleQuantityChange}
                  />
                  <button
                    className="btn btn-outline-secondary ms-2"
                    onClick={() => reduceQuantity()}
                  >
                    -
                  </button>
                </div>
                {book?.price && (
                  <div className="mt-2 text-center">
                    So tien tam tinh
                    <br /> <h4>{(quantity * book.price).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</h4>
                  </div>
                )}
                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-danger mt-3"
                    onClick={handleBuyNow}
                  >
                    Mua ngay
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary mt-2"
                    onClick={handleAddToCart}
                  >
                    Them vao gio hang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 mb-4"></div>
    </div>
  );
};
export default ProductDetail;
