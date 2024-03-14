import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const KEY = '2495b72f5ec163604337e6b2d7e7f95f';
const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDk1YjcyZjVlYzE2MzYwNDMzN2U2YjJkN2U3Zjk1ZiIsInN1YiI6IjY1ZWIzNGRiMzg5ZGExMDE2MmQ4MmQ0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wOrzvtt81dJKbJMZLWNeItV9LVtFK7uogc-rXIe-JIY',
  },
};

export const getMovies = async () => {
  const url = '/trending/movie/day?language=en-US';
  const response = await axios.get(url, {
    options,
    params: {
      api_key: KEY,
    },
  });

  return response.data.results;
};

export const getMoviesbyId = async movieId => {
  const url = `/movie/${movieId}?language=en-US`;
  const response = await axios.get(url, {
    options,
    params: {
      api_key: KEY,
    },
  });

  return response.data;
};

export const getImagePath = async () => {
  const response = await axios.get('/configuration', {
    options,
    params: {
      api_key: KEY,
    },
  });

  return response.data.images;
};

export const getCredits = async movieId => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    options,
    params: {
      api_key: KEY,
    },
  });

  return response.data.cast;
};

export const getReviews = async movieId => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    options,
    params: {
      api_key: KEY,
    },
  });

  return response.data.results;
};

export const searchMovie = async (query, page) => {
  const response = await axios.get('/search/movie', {
    params: {
      query,
      api_key: KEY,
      page,
    },
  });

  return response.data;
};
