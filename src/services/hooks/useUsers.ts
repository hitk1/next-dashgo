import { useQuery } from "react-query"
import { api } from "../axios"

type User = {
    id: string
    name: string
    email: string
    created_at: string
}

export const getUser = async (): Promise<User[]> => {
    const { data } = await api.get('/users')

    const users = data.users.map(user => ({
        ...user,
        created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }))

    return users
}

export const useUsers = () => {
    return useQuery('users', getUser)
}