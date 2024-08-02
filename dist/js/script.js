const bookWrapper = document.querySelector('.books-list');
const templateBook = document.querySelector('#template-book').innerHTML;
const render = Handlebars.compile(templateBook);
function renderBooks(){
    let booksHTML = '';
    for(const bookId in dataSource.books){
        const book = dataSource.books[bookId];
        const bookHTML = render(book);
        booksHTML += bookHTML;
    }
    bookWrapper.innerHTML = booksHTML;
}

const favoriteBooks = [];
function initActions(){
    const imgs = document.querySelectorAll('.books-list .book__image');
    const imgId = document.querySelector('#data-id');
        for(let img of imgs){
            img.addEventListener('dblclick', function(event){
                event.preventDefault();
                const imgId = img.getAttribute('data-id');

                if(!favoriteBooks.includes(imgId)){
                img.classList.add('favorite');
                favoriteBooks.push(imgId);
                }else{
                    img.classList.remove('favorite');
                    const index = favoriteBooks.indexOf(imgId);
                    if (index !== -1) {
                        favoriteBooks.splice(index, 1);
                        console.log('Id removed from array', favoriteBooks);
                    }
                }
            });
        }
    console.log(favoriteBooks);
}

renderBooks();
initActions();