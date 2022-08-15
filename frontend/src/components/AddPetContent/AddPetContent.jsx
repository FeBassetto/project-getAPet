import React, { useContext, useState } from "react";
import PetForm from "../Forms/PetForm";
import styles from './AddPetContent.module.css'

import { Context } from "../../context/UserContext";


const AddPetContent = () => {

    const { registerPet } = useContext(Context)
    const [token] = useState(localStorage.getItem('token'))

    const [pet, setPet] = useState({})


    async function onSubmit(e) {
        e.preventDefault()

        await registerPet(token, pet)
    }

    return (
        <div className={styles.addpet_header}>
            <div>
                <h1>Cadastre seu Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm
                handleSubmit={onSubmit}
                pet={pet}
                setPet={setPet}
                btnText='Cadastrar'
            />
        </div>
    )
}

export default AddPetContent