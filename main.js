// API Key
const apiKey = 'ENTER YOUR OMDB API KEY ';

// Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const moviesSection = document.getElementById('movies');
const loadMoreBtn = document.getElementById('load-more-btn');

// Variables
let currentPage = 1;
let currentSearch = '';

// Fetch movies based on search query
const fetchMovies = async () => {
  const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${currentSearch}&page=${currentPage}`);
  const data = await response.json();
  return data;
};

// Render movies
const renderMovies = (movies) => {
  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card', 'flex', 'flex-col');
    movieCard.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}" class="w-full h-auto rounded">
      <h3 class="text-lg font-bold mt-2">${movie.Title}</h3>
      <p class="text-gray-400">${movie.Year}</p>
    `;
    moviesSection.appendChild(movieCard);
  });
};

// Load more movies
const loadMoreMovies = async () => {
  currentPage++;
  const data = await fetchMovies();
  renderMovies(data.Search);
};

// Search button click event
searchBtn.addEventListener('click', async () => {
  currentSearch = searchInput.value.trim();
  if (currentSearch !== '') {
    currentPage = 1;
    moviesSection.innerHTML = '';
    const data = await fetchMovies();
    renderMovies(data.Search);
  }
});

// Load more button click event
loadMoreBtn.addEventListener('click', loadMoreMovies);
