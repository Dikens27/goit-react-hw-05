import axios from 'axios';

const KEY = 'Zza3E3RrFhtzgImITtA1Lhr_cnaaTXAhGLmOr4dlLk8';

export const fetchImages = async (query, page) => {
  axios.defaults.baseURL = 'https://api.unsplash.com';

  const response = await axios.get('/search/photos', {
    params: {
      query,
      client_id: KEY,
      page,
      per_page: 12,
    },
  });

  return {
    imageData: response.data.results,
    totalPages: response.data.total_pages,
  };
};
