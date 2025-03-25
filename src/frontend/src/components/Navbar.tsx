import { Component, createContext, useContext, useState } from 'react';
import '../index.css';
import { Link, useMatch, useResolvedPath, Path, Route } from "react-router-dom";
import { AuthContext, AuthContextType } from '../contexts/AuthContext';

export default function Navbar() {
  const authContext = useContext(AuthContext);

  const logOut = () => {
    authContext.setIsLoggedIn(false);
    localStorage.clear();
  }

  return (
    <div className='topnav'>
      <header>
        <nav className='nav-container'>
          <ul className="left-navbar">
            <li><Link to="/"><img className="site-logo" src='/cards.png' /></Link></li>
          </ul>
          <ul className="right-navbar">
            <li>
            {
              !authContext.isLoggedIn ? <></> : <CustomLink to="/accounts/me">Счета</CustomLink> 
            }
            </li>
            <li>
            {
              !authContext.isLoggedIn ? <CustomLink to="/users/signup">Регистрация</CustomLink> : 
              <CustomLink to="/users/settings">Настройки</CustomLink>
            }
            </li>
            {
              !authContext.isLoggedIn ? <li><CustomLink to="/users/login">Вход</CustomLink></li> : 
              <li id='exit-button'><LogoutLink to="/login" onClick={logOut}>Выход</LogoutLink></li>
            }  
          </ul>
        </nav>
      </header>
    </div>
  )
}

type linkProps = {
  to: string;
  children: string;
}

function CustomLink({ to, children, ...props }: linkProps) {
  const resolvedPath: Path = useResolvedPath(to);
  const isActive: any = useMatch({ path: resolvedPath.pathname });
  
  return (
      <li className={isActive ? "active" : ""}>
          <Link to={to}>{children}</Link>
      </li>
  )
}

type logoutLinkProps = {
  to: string;
  children: string;
  onClick: () => void
}

function LogoutLink({ to, children, onClick, ...props }: logoutLinkProps) {
  const resolvedPath: Path = useResolvedPath(to);
  const isActive: any = useMatch({ path: resolvedPath.pathname });
  
  return (
      <li className={isActive ? "active" : ""}>
          <Link to={to} onClick={onClick}>{children}</Link>
      </li>
  )
}
