import {
    Box,
    Flex,
    Heading,
    Button,
    Icon,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Checkbox,
    Text,
    useBreakpointValue,
    Spinner,
    Link,
} from '@chakra-ui/react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import NextLink from 'next/link'

import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { GetUsersResponse, useUsers } from '../../services/hooks/useUsers'
import { useState } from 'react'
import { queryClient } from '../../services/queryClient'
import { api } from '../../services/axios'
import { GetServerSideProps } from 'next'

export default function UserList({ users = [] }) {
    const [page, setPage] = useState(1)

    /*
    Para fazer integração com SSR do Next, seria preciso passar um 'initialData' pro hook 'useUsers' repassar então pro react query que funcionaria normalmente
    ex.:
        useUsers(page, { initialData: users })
        // React query
        useQuery(['users', page], () => getUser(page), { staleTime: 1000 * 60 * 10, ...options })   --> "options" representa o 'initialData'
    */
    const { isLoading, isFetching, error, data } = useUsers(page)

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    const handlePretechUser = async (userId: string) => {
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`/users/${userId}`)

            return response.data
        }, {
            staleTime: 1000 * 60 * 10
        })
    }

    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p="8"
                >
                    <Flex
                        mb="8"
                        align="center"
                        justify="space-between"
                    >
                        <Heading
                            size="lg"
                            fontWeight="normal"
                        >
                            Usuários
                            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
                        </Heading>
                        <NextLink href="/users/create">
                            <Button
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize={20} />}
                            >
                                {isWideVersion && 'Criar novo'}
                            </Button>
                        </NextLink>
                    </Flex>

                    {isLoading ?
                        (
                            <Flex justify="center">
                                <Spinner />
                            </Flex>
                        )
                        : error ? (
                            <Flex>
                                <Text>Erro ao obter os dados de usuários</Text>
                            </Flex>
                        ) : (
                            <>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th px="6" color="gray.300" width="8">
                                                <Checkbox colorScheme="pink" />
                                            </Th>
                                            <Th>Usuário</Th>
                                            {isWideVersion && <Th>Data de Cadastro</Th>}
                                            <Th w="1"></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {(data as GetUsersResponse).users.map(user => (
                                            <Tr key={user.id}>

                                                <Td px={["4", "4", "6"]}>
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Link color="purple.400" onMouseEnter={() => handlePretechUser(user.id)}>
                                                            <Text fontWeight="bold">{user.name}</Text>
                                                        </Link>
                                                        <Text fontSize="sm" color="gray.300">{user.name}</Text>
                                                    </Box>
                                                </Td>
                                                {isWideVersion && <Td>{user.created_at}</Td>}
                                                <Td>
                                                    <Button
                                                        as="a"
                                                        size="sm"
                                                        fontSize="sm"
                                                        colorScheme="purple"
                                                        leftIcon={<Icon as={RiPencilLine} fontSize={16} />}
                                                    >
                                                        {isWideVersion && 'Editar'}
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                                <Pagination
                                    totalCountOfRegisters={(data as GetUsersResponse).total}
                                    currentPage={page}
                                    onPageChange={setPage}
                                />
                            </>
                        )}
                </Box>
            </Flex>
        </Box>
    )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     const { users } = await getUser()

//     return {
//         props: {
//             users
//         }
//     }
// }