import React, { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import ImageModel from "../../../models/ImageModel";
import { getAllImage } from "../../../api/ImageApi";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles

interface ImageProductInterface {
  bookId: number;
}

export const ImageProduct: React.FC<ImageProductInterface> = (props) => {
  const bookId: number = props.bookId;
  const [listImage, setListImage] = useState<ImageModel[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageSelected, setImageSelected] = useState<ImageModel | null>(null);

  const imageSelect = (image: ImageModel) => {
    setImageSelected(image);
  };

  useEffect(() => {
    getAllImage(bookId)
      .then((imageData) => {
        setListImage(imageData);
        setImageSelected(imageData.length > 0 ? imageData[0] : null);
        setLoadingData(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [bookId]);

  return (
    <div className="image-product-container">
      <Carousel>
        {listImage.map((image, index) => (
          <div
            key={index}
            className="thumbnail-container"
            onClick={() => imageSelect(image)}
          >
            <img src={image.data} alt="" className="thumbnail-image" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
