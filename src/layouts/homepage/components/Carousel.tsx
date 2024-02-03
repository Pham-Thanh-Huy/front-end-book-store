import React, { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import ImageModel from "../../../models/ImageModel";
import { getThreeNewBook } from "../../../api/BookApi";
import CarouselItem from "./CarouselItem";
function Carousel() {
  const [listBookCarousel, setListBookCarousel] = useState<BookModel[]>([]);
  const [listImageCarousel, setListImageCarousel] = useState<ImageModel[]>([]);
  useEffect(() => {
    getThreeNewBook()
      .then((bookdata) => {
        setListBookCarousel(bookdata.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div id="carouselExampleDark" className="carousel carousel-dark slide">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <div className="row align-items-center">
              <div className="col-5 text-center">
                <img
                  src={"./../../../images/books/2.png"}
                  className="float-end"
                  style={{ width: "150px" }}
                />
              </div>
              <div className="col-7">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
          </div>
          {listBookCarousel.map((book) => (
            <CarouselItem key={book.bookId} book={book} />
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
