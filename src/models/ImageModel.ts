class ImageModel {
  imageId: number;
  imageName?: string;
  isIcon?: boolean;
  link?: string;
  data?: string;

  constructor(
    imageId: number,
    imageName: string,
    isIcon: boolean,
    link: string,
    data: string
  ) {
    this.imageId = imageId;
    this.imageName = imageName;
    this.isIcon = isIcon;
    this.link = link;
    this.data = data;
  }
}

export default ImageModel;
