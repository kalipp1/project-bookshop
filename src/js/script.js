const bookWrapper = document.querySelector('.books-list');
let templateBook = document.querySelector("#template-book").innerHTML;
const renderBooks = Handlebars.compile(templateBook);
let tempBookObj1 = {
    // for (const bookId in dataSource.books) {
    //     const book = dataSource.books[bookId],
    //     const name = book.name,
    //     const price = book.price,
    //     const rating = book.rating,
    //     const image = book.image,
    //   }
  };
  
  let tempBookFromObj1 = renderBooks(tempBookObj1);
renderBooks()
