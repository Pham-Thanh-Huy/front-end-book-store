class BookModel {
  bookId: number;
  bookName?: string;
  authorName: string;
  ISBN: string;
  description: string;
  listedPrice: number;
  price: number;
  quantity: number;
  rate: number;

  constructor(
    bookId: number,
    authorName: string,
    ISBN: string,
    description: string,
    listedPrice: number,
    price: number,
    quantity: number,
    rate: number
  ) {
    this.bookId = bookId;
    this.authorName = authorName;
    this.ISBN = ISBN;
    this.description = description;
    this.listedPrice = listedPrice;
    this.price = price;
    this.quantity = quantity;
    this.rate = rate;
  }
}

export default BookModel;
