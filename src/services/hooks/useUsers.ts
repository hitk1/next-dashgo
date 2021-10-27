import { useQuery } from "react-query"
import { api } from "../axios"

type User = {
    id: string
    name: string
    email: string
    created_at: string
}

type GetUsersResponse = {
    total: number
    users: User[]
}

export const getUser = async (page: number = 1): Promise<GetUsersResponse> => {
    const { data, headers } = await api.get('/users', {
        params: {
            page
        }
    })
    const total = Number(headers['x-total-count'])

    const users = data.users.map(user => ({
        ...user,
        created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }))

    return { users, total }
}

export const useUsers = (page: number) => {
    return useQuery('users', () => getUser(page))
}