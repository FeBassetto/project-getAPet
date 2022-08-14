import React, { useContext, useState } from "react";
import styles from './Form.module.css'

import Input from '../Input/Input'
import Select from "../Select/Select";

import { Context } from "../../context/UserContext";

const PetForm = () => {

    const [pet, setPet] = useState({})
    const [preview, setPreview] = useState([])
    const [token] = useState(localStorage.getItem('token'))
    const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo', 'Mesclado']

    const { registerPet } = useContext(Context)

    function onFilechange(e) {
        setPreview(Array.from(e.target.files))
        setPet({ ...pet, images: [...e.target.files] })
    }

    function handleChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }

    function handleColor(e) {
        setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text })
    }

    async function onSubmit(e) {
        e.preventDefault()

        await registerPet(token, pet)
    }

    return (
        <form className={styles.form_container} onSubmit={e => onSubmit(e)}>
            <div className={styles.preview_pet_images}>
                {preview.length > 0 ?
                    preview.map((image, index) => (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={pet.image}
                            key={`${pet.name}+${index}`}
                        />
                    )) :
                    pet.images && pet.images.map((image, index) =>
                        <img
                            src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                            alt={pet.image}
                            key={`${pet.name}+${index}`}
                        />
                    )
                }
            </div>
            <Input
                text="Imagens do Pet"
                type='file'
                name='images'
                handleOnChange={e => onFilechange(e)}
                multiple={true}
            />

            <Input
                text="Nome do Pet"
                type='text'
                name='name'
                placeholder='Insira o nome do pet'
                handleOnChange={e => handleChange(e)}
                value={pet.name || ''}
            />

            <Input
                text="Idade do Pet"
                type='number'
                name='age'
                placeholder='Digite a idade'
                handleOnChange={e => handleChange(e)}
                value={pet.age || ''}
            />

            <Input
                text="Peso do Pet"
                type='number'
                name='weight'
                placeholder='Digite a idade'
                handleOnChange={e => handleChange(e)}
                value={pet.weight || ''}
            />

            <Select
                name="color"
                text="Selecione a cor"
                options={colors}
                handleOnChange={e => handleColor(e)}
                value={pet.color || ''}
            />

            <input type="submit" value="Cadastrar Pet" />
        </form>
    )
}

export default PetForm