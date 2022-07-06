createAutoComplete({
  root: document.querySelector('.autocomplete'),
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
    <img src="${imgSrc}" />
    ${movie.Title} (${movie.Year})
    `;
  },
  onOptionSelect(movie) {
    onMovieSelect(movie);
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
          apikey: 'c18c7877',
          s: searchTerm
      }
    });
  
    if (response.data.Error) {
      return [];
    }
  
    return response.data.Search;
  },
});

const onMovieSelect = async movie => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
        apikey: 'c18c7877',
        i: movie.imdbID
    }
  });

  document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDatail) => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDatail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDatail.Title}</h1>
          <h4>${movieDatail.Genre}</h4>
          <p>${movieDatail.Plot}</p>
        </div>
      </div>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDatail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDatail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDatail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDatail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
