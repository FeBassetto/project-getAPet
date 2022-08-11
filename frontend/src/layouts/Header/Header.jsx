import React, { useContext } from "react";
import styles from './Header.module.css';

import { Link } from 'react-router-dom'

import { Context } from "../../context/UserContext";

const Header = () => {

    const { authenticated, logout } = useContext(Context)

    return (
        <nav className={styles.header}>
            <div className={styles.header__logo}>
                <h2>Get a Pet</h2>
            </div>
            <ul className={styles.header__navigation}>
                <li>
                    <Link to='/'>Adotar</Link>
                </li>
                {authenticated ?
                    <>
                        <li onClick={() => logout()}>Sair</li>
                    </> :
                    <>
                        <li>
                            <Link to='/login'>Entrar</Link>
                        </li>
                        <li>
                            <Link to='/register'>Cadastrar</Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Header