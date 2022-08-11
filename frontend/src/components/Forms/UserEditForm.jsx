import React, { useContext, useEffect, useState } from "react";
import styles from './Form.module.css'

import Input from "../Input/Input";
import RoundedImage from "../RoundedImage/RoundedImage";

import { Context } from "../../context/UserContext";

const UserEditForm = () => {

    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token'))
    const [preview, setPreview] = useState()
    const { getPrivateUserInformations, editUser } = useContext(Context)

    useEffect(() => {

        getPrivateUserInformations(token).then(res => {
            setUser(res)
        })

    }, [getPrivateUserInformations, token])

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function onFileChange(e) {
        setPreview(e.target.files[0])
        setUser({ ...user, [e.target.name]: e.target.files[0] })
    }

    function handleSubmit(e) {
        e.preventDefault()

        editUser(token, user)
    }

    return (
        <div className={styles.form_container}>
            <div className={styles.profile_container}>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <RoundedImage
                        src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}images/users/${user.image}`}
                        alt={user.name}
                    />
                )}
            </div>
            <form onSubmit={e => handleSubmit(e)}>
                <Input
                    text="Imagem"
                    type="file"
                    name="image"
                    handleOnChange={e => onFileChange(e)}
                />

                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder='Digite seu email'
                    handleOnChange={e => handleChange(e)}
                    value={user.email || ''}
                />

                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder='Digite nome'
                    handleOnChange={e => handleChange(e)}
                    value={user.name || ''}
                />

                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder='Digite o seu telefone'
                    handleOnChange={e => handleChange(e)}
                    value={user.phone || ''}
                />

                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder='Digite a sua senha'
                    handleOnChange={e => handleChange(e)}
                />

                <Input
                    text="Confirme sua senha"
                    type="password"
                    name="confirmpassword"
                    placeholder='Confirme a sua senha'
                    handleOnChange={e => handleChange(e)}
                />

                <input type="submit" value="Editar" />
            </form>
        </div>
    )
}

export default UserEditForm