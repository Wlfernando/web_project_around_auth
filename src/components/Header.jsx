import { useLocation, Link } from 'react-router-dom';
import logo from '../images/Logo/Vector.svg';

const Header = () => {
  const
    { pathname } = useLocation(),

    linkClass = 'link',
    link = {
      '/signup': <Link className={linkClass} to='/signin'>Iniciar sesión</Link>,
      '/signin': <Link className={linkClass} to='/signup'>Regístrate</Link>,
    };

  return (
    <header className="header">
      <h1 className="header__title">Around the U.S.</h1>
      <img
        src={logo}
        alt="Logo"
        className="header__logo"
      />
      {link[pathname] ??
        <div className='header__menu'>
          <p className='header__user'>user</p>
          <Link className={linkClass} to='/signin'>Cerrar sesión</Link>
        </div>
      }
      <hr className="header__horizontal" />
    </header>
  )
}

export default Header