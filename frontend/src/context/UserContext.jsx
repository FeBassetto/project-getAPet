import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({ children }) {

    const { register, authenticated, logout, login, getPrivateUserInformations, editUser } = useAuth()

    return (
        <Context.Provider value={{ register, authenticated, logout, login, getPrivateUserInformations, editUser }}>
            {children}
        </Context.Provider>
    )

}

export { Context, UserProvider }