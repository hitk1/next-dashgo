import { useQuery, UseQueryOptions, UseQueryResult } from "react-query"
import { api } from "../axios"

export type User = {
    id: string
    name: string
    email: string
    created_at: string
}

export type GetUsersResponse = {
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

export const useUsers = (page: number, options?: UseQueryOptions) => {
    /*
        Sempre que tiver varias informações para serem salvas em cache com 'react-query'
        é necessário criar varios indices para os respectivos dados.

        No caso, a aplicação esta usando de paginação para recuperar os registros,
        por isso, o correto é passar o numero da pagina na chave desses registros em cache
        para que a mudança aconteça
    */
    return useQuery(['users', page], () => getUser(page), { staleTime: 1000 * 60 * 10, ...options })
}