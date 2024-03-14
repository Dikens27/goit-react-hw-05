import { Route, Routes } from 'react-router-dom';
import Navigation from '../navigation/Navigation';
import { Suspense } from 'react';
import { lazy } from 'react';
import Loader from '../loader/Loader';

const HomePage = lazy(() => import('../../pages/HomePage'));
const MoviePage = lazy(() => import('../../pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage'));
const MovieCast = lazy(() => import('../../components/movieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../../components/movieReviews/MovieReviews')
);

export default function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
