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

export const fetchMovies = async movieId => {
  const url = `/movie/${movieId}?language=en-US`;
  const response = await axios.get(url, {
    options,
    params: {
      api_key: KEY,
    },
  });

  return response.data;
};

// export const fetchImages = async (query, page) => {

//   const response = await axios.get('/search/photos', {
//     params: {
//       query,
//       client_id: KEY,
//       page,
//       per_page: 12,
//     },
//   });

//   return {
//     imageData: response.data.results,
//     totalPages: response.data.total_pages,
//   };
// };
