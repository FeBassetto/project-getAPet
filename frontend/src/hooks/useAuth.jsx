import api from "../utils/api";

import { useState, useEffect } from 'react'
import useFlashMessage from "./useFlashMessage";
import { useNavigate } from "react-router-dom";

const useAuth = () => {

    const { setFlashMessage } = useFlashMessage()
    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem('token')

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        }

    }, [])

    async function register(user) {

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'

        try {
            const data = await api.post('users/register', user).then(response => {
                return response.data
            })

            await authUser(data)

        } catch (err) {
            msgText = err.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)


    }

    async function login(user) {

        let msgText = 'Usuário logado!'
        let msgType = 'success'

        try {

            const data = await api.post('users/login', user).then(res => {
                return res.data
            })

            await authUser(data)

        } catch (err) {
            msgText = err.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)

    }

    async function authUser(data) {

        setAuthenticated(true)

        localStorage.setItem('token', JSON.stringify(data.token))

        navigate('/')

    }

    async function logout() {

        const msgText = 'Logout Realizado com sucesso'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessage(msgText, msgType)

    }

    return { register, authenticated, logout, login }

}

export default useAuth