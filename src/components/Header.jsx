import { useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { RouteContext } from '../contexts/RouteContext';
import logo from '../images/Logo/Vector.svg';

const Header = () => {
  const
    { pathname } = useLocation(),
    [clicked, setClicked] = useState(false),
    { register, login } = useContext(RouteContext),

    block = 'header',
    blockLink = 'link',
    elmHr = block + '__horizontal',
    elItem = block + '__item',
    modHidden = '_hidden',

    link = {
      [register]: <Link className={blockLink} to={login}>Iniciar sesión</Link>,
      [login]: <Link className={blockLink} to={register}>Regístrate</Link>,
    };

  return (
    <header className={block} >
      <h1 className={block + '__title'}>Around the U.S.</h1>
      <img
        src={logo}
        alt="Logo"
        className={block + '__logo'}
      />
      {link[pathname] ??
      <>
        <nav className={block + '__menu' + (clicked ? ` ${block}__menu_open` : '')}>
          <ul className={block + '__list'}>
            <li className={elItem}>
              <p className={block + '__user'} >{sessionStorage.getItem('email')}</p>
            </li>
            <li className={elItem}>
              <Link
                onClick={() => sessionStorage.clear()}
                className={blockLink} to={login}>
                  Cerrar sesión
              </Link>
            </li>
            <li className={elItem}>
              <hr className={elmHr + ' ' + elmHr + modHidden} />
            </li>
          </ul>
        </nav>
        <button
          type='button'
          className={`button button${modHidden} ${clicked ? 'button__close' : 'button__menu'}`}
          onClick={() => setClicked(!clicked)}
        />
      </>
      }
      <hr className={elmHr} />
    </header>
  )
}

export default Header