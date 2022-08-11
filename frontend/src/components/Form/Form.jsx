import React, { useContext, useState } from "react";
import styles from './Form.module.css'

import Input from "../Input/Input";
import { Link } from "react-router-dom";
import { Context } from "../../context/UserContext";

const Form = () => {

    const [user, setUser] = useState('')
    const { register } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        register(user)
    }

    return (
        <div className={styles.form_container}>
            <h1>Registrar</h1>
            <form action="#" onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={e => handleChange(e)}
                />

                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={e => handleChange(e)}
                />

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

                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Digite a senha novamente"
                    handleOnChange={e => handleChange(e)}
                />

                <input type="submit" value="Cadastrar" />
            </form>
            <p>
                Já tem conta? <Link to='/login'>Clique aqui</Link>
            </p>
        </div>
    )
}

export default Form