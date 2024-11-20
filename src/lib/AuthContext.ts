import { onAuthStateChanged } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)

interface AuthProps
{
    children: React.ReactNode
}


export const AuthProvider = ({ children }: AuthProps ) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)