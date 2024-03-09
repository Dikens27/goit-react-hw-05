// import css from './App.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/country" element={<SearchCountry />} />
        <Route path="/country/:countryId" element={<Country />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

{
  /* // 2495b72f5ec163604337e6b2d7e7f95f
// eyJhbGciOiJIUzI1NiJ9
//   .eyJhdWQiOiIyNDk1YjcyZjVlYzE2MzYwNDMzN2U2YjJkN2U3Zjk1ZiIsInN1YiI6IjY1ZWIzNGRiMzg5ZGExMDE2MmQ4MmQ0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ
//   .wOrzvtt81dJKbJMZLWNeItV9LVtFK7uogc -
//   rXIe -
//   JIY; */
}
