import React, { useContext, useState } from "react";
import styles from './Form.module.css';

import {Link} from 'react-router-dom'

import Input from "../Input/Input";

import { Context } from "../../context/UserContext";

const LoginForm = () => {

    const [user, setUser] = useState({})
    const { login } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        login(user)
    }

    return (
        <div className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={e => handleChange(e)}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite uma senha"
                    handleOnChange={e => handleChange(e)}
                />
                <input type="submit" value="Logar" />
            </form>
            <p>
                Não tem conta? <Link to='/register'>Clique aqui</Link>
            </p>
        </div>
    )
}

export default LoginForm