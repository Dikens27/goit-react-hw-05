import { NavLink, Outlet } from 'react-router-dom';
import { FiFilm } from 'react-icons/fi';
import css from './Navigation.module.css';

export default function Navigation() {
  return (
    <>
      <header className={css.header}>
        <nav className={css.navigation}>
          <NavLink className={css.navLink} to="/">
            <span className={css.iconContainer}>
              <FiFilm className={css.icon} />
              <FiFilm className={css.nextIcon} />
            </span>
            <span>
              <h2 className={css.title}>Fimoteka</h2>
            </span>
          </NavLink>

          <ul className={css.list}>
            <li className={css.item}>
              <NavLink
                className={({ isActive }) => (isActive ? css.active : css.link)}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? css.active : css.link)}
                to="/movies"
              >
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
