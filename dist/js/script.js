const bookWrapper = document.querySelector('.books-list');
function renderBooks(){
    for(const bookId of dataSource.books){
        const book = dataSource.books[bookId];
        const name = book.name;
        const price = book.price;
        const rating = book.rating;
        const image = book.image;    
        bookWrapper.innerHTML = '<li></li>';
    }
}
renderBooks();