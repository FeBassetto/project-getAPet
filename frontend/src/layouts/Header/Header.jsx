import React from "react";
import styles from './Header.module.css';

import { Link } from 'react-router-dom'

import Logo from '../../assets/img/logo.png'

const Header = () => {
    return (
        <nav className={styles.header}>
            <div className={styles.header__logo}>
                <img src={Logo} alt="Get a Pet" />
                <h2>Get a Pet</h2>
            </div>
            <ul className={styles.header__navigation}>
                <li>
                    <Link to='/'>Adotar</Link>
                </li>
                <li>
                    <Link to='/login'>Entrar</Link>
                </li>
                <li>
                    <Link to='/register'>Cadastrar</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header