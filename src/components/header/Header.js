import React from "react";
import logo from "./logo.png";
import "./header.scss";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <section className="header__bar">
        <nav className="header__nav">
          <Link className="header__logo" to="/">
            <img className="logo__img" src={logo} alt="ALUCUBE" />
          </Link>

          <ul className="nav__menu">
            <NavLink
              exact
              to="/"
              className="nav__link"
              activeClassName="nav__link--active"
            >
              <li className="nav__item">Strona główna</li>
            </NavLink>
            <NavLink
              to="/galeria"
              className="nav__link"
              activeClassName="nav__link--active"
            >
              <li className="nav__item">Galeria</li>
            </NavLink>
            <li className="nav__item">
              <NavLink
                to="/zaprojektuj"
                className="nav__link"
                activeClassName="nav__link--active"
              >
                Zaprojektuj
              </NavLink>
            </li>
            <NavLink
              to="/kontakt"
              className="nav__link"
              activeClassName="nav__link--active"
            >
              <li className="nav__item">Kontakt</li>
            </NavLink>
            <li className="nav__item">
              <NavLink
                to="/panel"
                className="nav__link"
                activeClassName="nav__link--active"
              >
                Moje konto
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
