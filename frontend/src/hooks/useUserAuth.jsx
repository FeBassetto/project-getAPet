import api from "../utils/api";

import { useState, useEffect } from 'react'
import useFlashMessage from "./useFlashMessage";
import { useNavigate } from "react-router-dom";

const useUserAuth = () => {

    const { setFlashMessage } = useFlashMessage()
    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem('token')

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(false)
        }

        setAuthenticated(true)

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

    async function getPrivateUserInformations(token) {

        try {

            const data = api.get('users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then(res => {
                return res.data
            })

            return data

        } catch (err) {
            return
        }

    }

    async function editUser(token, user) {

        api.patch(`users/edit/${user._id}`, user, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            let msgType = 'success'
            let msgText = 'Modificado com sucesso!'

            setFlashMessage(msgText, msgType)

        }).catch(err => {
            let msgType = 'error'
            let msgText = err.response.data.message

            setFlashMessage(msgText, msgType)
        })

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

    //Pet
    async function registerPet(token, pet) {

        let msgType = 'success'
        let msgText = 'Pet cadastrado com sucesso!'

        const formData = new FormData()

        Object.keys(pet).forEach(key => {
            if (key === 'images') {
                // eslint-disable-next-line array-callback-return
                pet[key].map(image => {
                    formData.append('images', image);
                });
            } else {
                formData.append(key, pet[key]);
            }
        })

        api.post('pets/create', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            setFlashMessage(msgText, msgType)

            navigate('/')
        }).catch(err => {
            let msgType = 'error'
            let msgText = err.response.data.message

            setFlashMessage(msgText, msgType)
        })


    }

    return {
        register,
        authenticated,
        logout,
        login,
        getPrivateUserInformations,
        editUser,
        registerPet
    }

}

export default useUserAuth