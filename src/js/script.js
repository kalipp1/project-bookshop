// const Input = require("postcss/lib/input");

const bookWrapper = document.querySelector('.books-list')
const templateBook = document.querySelector('#template-book').innerHTML
const render = Handlebars.compile(templateBook)
const filtersForm = document.querySelector('.filters')

function determineRatingBgc(rating){
  if(rating<6){
    return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
  }else if (rating>6 && rating<=8){
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  }else if (rating>8 && rating<=9){
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
  }else if (rating>9){
    return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }
}

function renderBooks () {
  let booksHTML = ''
  for (const bookId in dataSource.books) {
    const book = dataSource.books[bookId];
    const ratingWidth = book.rating * 10;
    const ratingBgc = determineRatingBgc(book.rating);
    const bookHTML = render(book); 
    // const bookHTML = render({book,ratingWidth,ratingBgc});
    booksHTML += bookHTML;
  }
  bookWrapper.innerHTML = booksHTML;
}

const filters = []
const favoriteBooks = []

function filterBooks () {
  const books = document.querySelectorAll('.books-list .book')
  for (const book of books) {
    const bookId = book.querySelector('.book__image').getAttribute('data-id')
    const bookData = dataSource.books.find(b => b.id == bookId)
    let shouldBeHidden = false

    for (const filter of filters) {
      if (bookData.details[filter] !== true) {
        shouldBeHidden = true
        break
      }
    }

    const bookImage = book.querySelector('.book__image')
    if (shouldBeHidden) {
      bookImage.classList.add('hidden')
    } else {
      bookImage.classList.remove('hidden')
    }
  }
}

function initActions () {
  const imgs = document.querySelectorAll('.books-list .book__image')
  const imgId = document.querySelector('#data-id')
  for (const img of imgs) {
    img.addEventListener('dblclick', function (event) {
      event.preventDefault()
      const imgId = img.getAttribute('data-id')

      if (!favoriteBooks.includes(imgId)) {
        img.classList.add('favorite')
        favoriteBooks.push(imgId)
      } else {
        img.classList.remove('favorite')
        const index = favoriteBooks.indexOf(imgId)
        if (index !== -1) {
          favoriteBooks.splice(index, 1)
          console.log('Id removed from array', favoriteBooks)
        }
      }
    })
  }
  filtersForm.addEventListener('click', function (event) {
    // console.log('form clicked');
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && (event.target.name === 'filter-adults' || event.target.name === 'filter-nonFiction')) {
      console.log(event.target.value)
      if (event.target.checked) {
        filters.push(event.target.value)
        console.log(filters)
      } else {
        const index = filters.indexOf(event.target.value)
        if (index !== -1) {
          filters.splice(index, 1)
          console.log('Filter removed from array', filters)
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
      filterBooks()
    }
  })

  console.log(favoriteBooks)
}

renderBooks()
initActions()
