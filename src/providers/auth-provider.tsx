import { noop } from 'lodash'
import React, { createContext, useContext, useState, PropsWithChildren } from 'react'

interface IAuthContextProps {
  isAuthenticated: boolean,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<IAuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: noop
})

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if(!authContext) {
    throw new Error("Unable to use AuthContext outside it's provider")
  }

  return authContext
}

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}