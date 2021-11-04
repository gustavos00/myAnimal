import React, { createContext, useEffect, useState } from "react";
import * as auth from '../services/auth'

interface UserContextData {
  familyname: string,
  givenname: string,
  email: string,
  photourl: string,
}

interface AuthContextData {
  signed: boolean,
  token: string | void,
  user: UserContextData | void,

  googleSignIn(): void,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export function AuthProvider({children} : any) {
  const [user, setUser] = useState<UserContextData | void>()
  const [token, setToken] = useState<string | void>()

  const googleSignIn = async() => {
    const response = await auth.GoogleSignIn()
    setToken(response.token)
    setUser(response)
  }

  return (
    <AuthContext.Provider value={{
      signed: !!user,
      token,
      user,

      googleSignIn
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;