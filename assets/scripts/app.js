let addMovieModal = document.getElementById('add-modal')

let startAddMovieButton = document.querySelector('header button')

const backdrop = document.getElementById('backdrop')

const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive')

const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling

const userInputs = addMovieModal.querySelectorAll('input')

let movies = [] 

const entryTextSection = document.getElementById('entry-text')

const deleteMovieModal = document.getElementById('delete-modal')

const updateUI = () =>{
    if( movies.length === 0 ){
        entryTextSection.style.display = 'block'
    }
    else{
        entryTextSection.style.display = 'none'
    }
} 

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible')
}

const closeMovieDeletionModal = () => {
    toggleBackdrop()
    deleteMovieModal.classList.remove('visible')
}

const deleteMovieHandler = (movieId) => { 

    let movieIndex = 0
    for( const movie of movies ){
        if( movie.id === movieId ){          
            break;
        }
        movieIndex++
    }

    movies.splice(movieIndex, 1)
    const listRoot = document.getElementById('movie-list')
    listRoot.children[movieIndex].remove()
    
    closeMovieDeletionModal()
    updateUI()
}

const startDeleteMovieHandler = movieId => { 
    deleteMovieModal.classList.add('visible')
    toggleBackdrop()
    
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive')
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')

    cancelDeletionButton.removeEventListener( 'click', closeMovieDeletionModal )
    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal)

    confirmDeletionButton.replaceWith( confirmDeletionButton.cloneNode(true) )

    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')

    confirmDeletionButton.addEventListener( 'click', deleteMovieHandler.bind( null, movieId )  )
}

const renderNewMovieElement = ( id, title, imageURL, rating ) => {
      const newMovieElement = document.createElement('li')
      newMovieElement.className = 'movie-element'
      newMovieElement.innerHTML = `
      <div  class="movie-element__image">
      <img src="${imageURL}" alt=${title}">
      </div>
      <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
      </div>`
      
      newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id))  /*  deleteMovieHandler   */
      const listRoot = document.getElementById('movie-list')
      listRoot.append(newMovieElement) 
}

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible')
}

const showMovieModal = () => {
    addMovieModal.classList.add('visible')
    toggleBackdrop()
}


const cancelAddMovie = () => {
    showMovieModal();
    clearMovieInput()
}

const clearMovieInput = () => {
    for( const usrInput of userInputs ){
        usrInput.value = ''
    }
}

const cancelAddMovieHandler = () => {
    closeMovieModal()
    toggleBackdrop()
    clearMovieInput()
}

const addMovieHandler = () => {
    const titleValue = userInputs[0].value 
    const urlValue = userInputs[1].value
    const ratingValue = userInputs[2].value

    if( titleValue === '' || urlValue === '' || ratingValue === '' +ratingValue < 1 || +ratingValue > 5 ) {
        alert('Please enter valid values (rating 1 to 5)')
        return; 
    }

    const newMovie = { 
        id: Math.random().toString(), 
        title: titleValue,
        url: urlValue,
        rating: ratingValue 
    }

    movies.push(newMovie)
    console.log(movies)
    closeMovieModal()
    toggleBackdrop()
    clearMovieInput()
    renderNewMovieElement( newMovie.id, newMovie.title, newMovie.url, newMovie.rating )
    updateUI()

}

const backdropClickHandler = () => {
    closeMovieModal() 
    closeMovieDeletionModal()
    clearMovieInput()
} 

startAddMovieButton.addEventListener('click', showMovieModal)

backdrop.addEventListener('click',  backdropClickHandler /*   showMovieModal  */  )

cancelAddMovieButton.addEventListener('click',  cancelAddMovieHandler  /*  cancelAddMovie  */)

confirmAddMovieButton.addEventListener('click', addMovieHandler)
