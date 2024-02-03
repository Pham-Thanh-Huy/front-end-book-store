import React, { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import ImageModel from "../../../models/ImageModel";
import { getAllImage } from "../../../api/ImageApi";
import { Link } from "react-router-dom";
import { render } from "@testing-library/react";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

interface BookPropsInterface {
  book: BookModel;
}

const BookProps: React.FC<BookPropsInterface> = ({ book }) => {
  const bookId = book.bookId;
  const [listImage, setListImage] = useState<ImageModel[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(
    () => {
      getAllImage(bookId)
        .then((imageData) => {
          setListImage(imageData);
          setLoadingData(false);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    },
    [] // Chi goi 1 lan
  );

  let dataImage = "";
  if (listImage[0] && listImage[0].data) {
    dataImage = listImage[0].data;
  }
  const renderRating = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(<StarFill className="text-warning" key={i} />);
      } else {
        if (i - 0.5 === rate) {
          stars.push(<StarHalf className="text-warning" key={i + 0.5} />);
        } else stars.push(<Star className="text-secondary" key={i} />);
      }
    }
    return stars;
  };

  return (
    <div className="col-md-3 mt-2">
      <div className="card">
        <Link to={`/book/${book.bookId}`}>
          <img
            src={dataImage}
            className="card-img-top"
            alt={book.bookName}
            style={{ height: "200px" }}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{book.bookName}</h5>
          <div>{renderRating(book.rate ? book.rate : 0)}</div>
          <div className="price">
            <span className="original-price">
              <del>{book.listedPrice}</del>
            </span>
            <span className="discounted-price">
              <strong>{book.price}</strong>
            </span>
          </div>
          <div className="row mt-2" role="group">
            <div className="col-6">
              <a href="#" className="btn btn-secondary btn-block">
                <i className="fas fa-heart"></i>
              </a>
            </div>
            <div className="col-6">
              <button className="btn btn-danger btn-block">
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookProps;
