import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import ListProduct from "../product/ListProduct";
import { useParams } from "react-router-dom";

interface HomePageProps {
  searchInput: string;
}

function HomePage({ searchInput }: HomePageProps) {
  const { codeCategory } = useParams();

  let categoryIdNumber = 0;
  try {
    categoryIdNumber = parseInt(codeCategory || "", 10);
  } catch (error) {
    categoryIdNumber = 0;
    console.log("Error parsing categoryId:", error);
  } 

  if (Number.isNaN(categoryIdNumber)) { 
    categoryIdNumber = 0;
  }

  console.log("categoryIdNumber:", categoryIdNumber);

  return (
    <div>
      <Banner />
      <Carousel />
      <ListProduct searchInput={searchInput} categoryId={categoryIdNumber} />
    </div>
  );
}

export default HomePage;
