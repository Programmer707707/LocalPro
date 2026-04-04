import {
  createContext,   
  useContext,      
  useState,        
  useEffect,              
} from "react";
import type {ReactNode} from "react";
import type { User, LoginIn, RegisterIn } from "@/types"
import * as authApi from "@/api/auth"

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (data: LoginIn) => Promise<User>
    register: (data: RegisterIn) => Promise<User>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null >(null)

export function AuthProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            authApi.getMe().then(userData => setUser(userData))
            .catch(() => localStorage.removeItem("token"))
            .finally(() => setLoading(false))
        }
        else{
            setLoading(false)
        }
    }, [])

    const login = async (data: LoginIn): Promise<User> => {
        const tokenData = await authApi.login(data)
        localStorage.setItem("token", tokenData.access_token)
        const userData = await authApi.getMe()
        setUser(userData)
        return userData
    }

    const register = async (data: RegisterIn): Promise<User> => {
        await authApi.register(data)
        const user = await login({ email: data.email, password: data.password })
        return user
    }

    const logout = async (): Promise<void> => {
        try{
            await authApi.logout()
        }
        catch{

        }
        finally{
            localStorage.removeItem("token")
            setUser(null)
            window.location.href = "/login"
        }
    }

    return(
        <AuthContext.Provider value={{user, loading, login,register, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used inside AuthProvider")
    }
    return context
}