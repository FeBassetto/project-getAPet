import { createContext } from "react";

import useUserAuth from "../hooks/useUserAuth";

const Context = createContext()

function UserProvider({ children }) {

    const {
        register,
        authenticated,
        logout,
        login,
        getPrivateUserInformations,
        editUser,
        registerPet
    } = useUserAuth()

    return (
        <Context.Provider value={
            {
                register,
                authenticated,
                logout,
                login,
                getPrivateUserInformations,
                editUser,
                registerPet
            }
        }>
            {children}
        </Context.Provider>
    )

}

export { Context, UserProvider }