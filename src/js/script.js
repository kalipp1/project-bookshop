// const Input = require("postcss/lib/input");
class BookList {
  constructor(){
    const thisBookList = this;
    thisBookList.getElements();
    thisBookList.render = Handlebars.compile(thisBookList.templateBook);
    thisBookList.filters = [];
    thisBookList.favoriteBooks = [];
    thisBookList.renderBooks();
    thisBookList.initActions();
  }
  getElements(){
    const thisBookList = this;
    thisBookList.bookWrapper = document.querySelector('.books-list')
    thisBookList.templateBook = document.querySelector('#template-book').innerHTML
    thisBookList.filtersForm = document.querySelector('.filters')
  }

  determineRatingBgc (rating) {
  if (rating < 6) {
    return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)'
  } else if (rating > 6 && rating <= 8) {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)'
  } else if (rating > 8 && rating <= 9) {
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%'
  } else if (rating > 9) {
    return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)'
  }
}

  renderBooks () {
  const thisBookList = this;
  let booksHTML = ''
  for (const bookId in dataSource.books) {
    const book = dataSource.books[bookId]
    const ratingWidth = book.rating * 10
    const ratingBgc = thisBookList.determineRatingBgc(book.rating)
    // const bookHTML = render(book)
    const bookHTML = thisBookList.render({ ...book, ratingWidth, ratingBgc })
    booksHTML += bookHTML
  }
  thisBookList.bookWrapper.innerHTML = booksHTML
}

  filterBooks () {
    const thisBookList = this;
   for (const book of dataSource.books) {
        let shouldBeHidden = false;
        if (thisBookList.filters.includes('adults') && !book.details.adults) {
          shouldBeHidden = true;
        }
        if (thisBookList.filters.includes('nonFiction') && !book.details.nonFiction) {
          shouldBeHidden = true;
        }

        const bookImage = document.querySelector('.book__image[data-id="'+book.id+'"]');
        if (shouldBeHidden) {
          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }
      }
  // const books = document.querySelectorAll('.books-list .book')
  // for (const book of books) {
  //   const bookId = book.querySelector('.book__image').getAttribute('data-id')
  //   const bookData = dataSource.books.find(b => b.id === bookId)
  //   let shouldBeHidden = false

  //   for (const filter of filters) {
  //     if (bookData.details[filter] !== true) {
  //       shouldBeHidden = true
  //       break
  //     }
  //   }

  //   const bookImage = book.querySelector('.book__image')
  //   if (shouldBeHidden) {
  //     bookImage.classList.add('hidden')
  //   } else {
  //     bookImage.classList.remove('hidden')
  //   }
  // }
}

initActions () {
  const thisBookList = this;
  const imgs = document.querySelectorAll('.books-list .book__image')
  for (const img of imgs) {
    img.addEventListener('dblclick', function (event) {
      event.preventDefault()
      const imgId = img.getAttribute('data-id')

      if (!thisBookList.favoriteBooks.includes(imgId)) {
        img.classList.add('favorite')
        thisBookList.favoriteBooks.push(imgId)
      } else {
        img.classList.remove('favorite')
        const index = thisBookList.favoriteBooks.indexOf(imgId)
        if (index !== -1) {
          thisBookList.favoriteBooks.splice(index, 1)
          console.log('Id removed from array', thisBookList.favoriteBooks)
        }
      }
    })
  }
  thisBookList.filtersForm.addEventListener('click', function (event) {
    // console.log('form clicked');
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && (event.target.name === 'filter-adults' || event.target.name === 'filter-nonFiction')) {
      console.log(event.target.value)
      if (event.target.checked) {
        thisBookList.filters.push(event.target.value)
        console.log(thisBookList.filters)
      } else {
        const index = thisBookList.filters.indexOf(event.target.value)
        if (index !== -1) {
          thisBookList.filters.splice(index, 1)
          console.log('Filter removed from array', thisBookList.filters)
        }
      }
      thisBookList.filterBooks()
    }
  })

  console.log(thisBookList.favoriteBooks)
}
}
new BookList();