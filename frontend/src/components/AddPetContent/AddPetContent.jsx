import React from "react";
import PetForm from "../Forms/PetForm";
import styles from './AddPetContent.module.css'

const AddPetContent = () => {
    return (
        <div className={styles.addpet_header}>
            <div>
                <h1>Cadastre seu Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm />
        </div>
    )
}

export default AddPetContent