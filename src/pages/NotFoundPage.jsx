import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <p>Page was not found.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}
