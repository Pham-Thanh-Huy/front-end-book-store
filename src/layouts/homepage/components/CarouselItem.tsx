import React, { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import ImageModel from "../../../models/ImageModel";
import { getAllImage } from "../../../api/ImageApi";

interface bookProps {
  book: BookModel;
}

const CarouselItem: React.FC<bookProps> = ({ book }) => {
  const [listImage, setListImage] = useState<ImageModel[]>([]);
  const bookId = book.bookId;
  useEffect(
    () => {
      getAllImage(bookId)
        .then((imageData) => {
          setListImage(imageData);
        })
        .catch();
    },
    [] // Chi goi 1 lan
  );
  let dataImage = "";
  if (listImage[0] && listImage[0].data) {
    dataImage = listImage[0].data;
  }

  return (
    <div className="carousel-item " data-bs-interval="10000">
      <div className="row align-items-center">
        <div className="col-5 text-center">
          <img
            src={dataImage}
            className="float-end"
            style={{ width: "150px" }}
          />
        </div>
        <div className="col-7">
          <h5>{book.bookName}</h5>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
