// const Input = require("postcss/lib/input");

const bookWrapper = document.querySelector('.books-list');
const templateBook = document.querySelector('#template-book').innerHTML;
const render = Handlebars.compile(templateBook);
const filtersForm = document.querySelector('.filters');

function renderBooks () {
  let booksHTML = '';
  for (const bookId in dataSource.books) {
    const book = dataSource.books[bookId];
    const bookHTML = render(book);
    booksHTML += bookHTML;
  }
  bookWrapper.innerHTML = booksHTML;
}

const filters = [];
const favoriteBooks = [];

function filterBooks() {
  const books = document.querySelectorAll('.books-list .book');
  for (const book of books) {
    const bookId = book.querySelector('.book__image').getAttribute('data-id');
    const bookData = dataSource.books.find(b => b.id == bookId);
    let shouldBeHidden = false;

    for (const filter of filters) {
      if (bookData.details[filter] !== true) {
        shouldBeHidden = true;
        break;
      }
    }

    const bookImage = book.querySelector('.book__image');
    if (shouldBeHidden) {
      bookImage.classList.add('hidden');
    } else {
      bookImage.classList.remove('hidden');
    }
  }
}

function initActions() {
  const imgs = document.querySelectorAll('.books-list .book__image');
  const imgId = document.querySelector('#data-id');
  for (const img of imgs) {
    img.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const imgId = img.getAttribute('data-id');

      if (!favoriteBooks.includes(imgId)) {
        img.classList.add('favorite');
        favoriteBooks.push(imgId);
      } else {
        img.classList.remove('favorite');
        const index = favoriteBooks.indexOf(imgId);
        if (index !== -1) {
          favoriteBooks.splice(index, 1);
          console.log('Id removed from array', favoriteBooks);
        }
      }
    })
  }
  filtersForm.addEventListener('click', function(event){
    // console.log('form clicked');
    if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && (event.target.name === 'filter-adults' || event.target.name === 'filter-nonFiction')){
      console.log(event.target.value);
      if(event.target.checked){
        filters.push(event.target.value);
        console.log(filters);
      }else{
        const index = filters.indexOf(event.target.value);
        if (index !== -1) {
          filters.splice(index, 1);
          console.log('Filter removed from array', filters);
        }
      }
      // for (const bookId of dataSource.books) {
      //   const book = dataSource.books[bookId];
      //   let shouldBeHidden = false;
      //   if (filters.includes('adults') && !book.details.adults) {
      //     shouldBeHidden = true;
      //   }
      //   if (filters.includes('nonFiction') && !book.details.nonFiction) {
      //     shouldBeHidden = true;
      //   }
  
      //   if (shouldBeHidden) {
      //     book.classList.add('hidden');
      //   } else {
      //     book.classList.remove('hidden');
      //   }
      // }
      filterBooks();
    }
  })

  console.log(favoriteBooks);
}

renderBooks();
initActions();
