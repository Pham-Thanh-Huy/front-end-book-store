import React from "react";

import { url_request } from "./Request";
import ImageModel from "../models/ImageModel";

async function getImage(link: string): Promise<ImageModel[]> {
  const result: ImageModel[] = [];
  const endpoint: string = link;

  const response = await url_request(endpoint);

  const responseData = response._embedded.images;
  for (const key in responseData) {
    result.push({
      imageId: responseData[key].imageId,
      imageName: responseData[key].imageName,
      isIcon: responseData[key].isIcon,
      link: responseData[key].link,
      data: responseData[key].data,
    });
  }
  return result;
}

export async function getAllImage(bookId: number): Promise<ImageModel[]> {
  const url: string = `http://localhost:8888/book/${bookId}/imageList`;
  const result = getImage(url);
  return result;
}
