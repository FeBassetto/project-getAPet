import React, { useEffect, useState } from "react";

import styles from './Dashboard.module.css'

import PetForm from "../../components/Forms/PetForm";

import useFlashMessage from "../../hooks/useFlashMessage";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

const EditPet = () => {

    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()

    async function updatePet(e) {

        e.preventDefault()

        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(pet).forEach(key => {
            if (key === 'images') {

                // eslint-disable-next-line array-callback-return
                pet[key].map(image => {
                    formData.append('images', image);
                })

            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.patch(`pets/${pet._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res)
            return res.data
        })
        .catch(err => {
            msgType = 'error'
            return err.response.data
        })


        setFlashMessage(data.message, msgType)
    }

    useEffect(() => {

        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then(res => {
                setPet(res.data.pet)
            })

    }, [token, id])

    return (
        <section>
            <div className={styles.addpet_header}>
                <h1>Editando o Pet: {pet.name}</h1>
                <p>Depois da edição os dados serão atualizados no sistema</p>
            </div>
            {pet.name && (
                <PetForm
                    pet={pet}
                    setPet={setPet}
                    handleSubmit={updatePet}
                    btnText='Atualizar'
                />
            )}
        </section>
    )
}

export default EditPet