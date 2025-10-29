import classes from './header.module.css'
import headerLogo from '../../assets/images/header-logo.png'
import { useContext } from 'react';
import { AppContext } from '../../Router';
import { useNavigate } from 'react-router';


const Header = () => {
 
  const { user } = useContext(AppContext) // get current user from context
  const navigate = useNavigate() // hook for navigation

  const logOut = () => { // log out function
    localStorage.removeItem('token') // remove auth token
    navigate('/login') // redirect to login
  }

  const token = localStorage.getItem('token') // get token from localStorage


  return (
    <>
      <header className={classes.header}>
        <div className={classes.container}>
          <a href="/home" className={classes.logo}>
            <img src={headerLogo} alt="Evangadi Logo" />
          </a>
          <nav className={classes.navLinks}>
            <a href="/home">Home</a>
            <a href="/home">How it Works</a>
            {token && (
              <button className={classes.signinBtn} onClick={logOut}>
                Log out
              </button>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header
