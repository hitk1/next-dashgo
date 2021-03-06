import {
    Box,
    Flex,
    Heading,
    Divider,
    VStack,
    HStack,
    SimpleGrid,
    Button,
} from '@chakra-ui/react'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { api } from '../../services/axios'
import { queryClient } from '../../services/queryClient'
import { GetServerSideProps } from 'next'
import { getUser } from '../../services/hooks/useUsers'

type CreateUserFormData = {
    name: string
    email: string
    password: string
    password_confirmation: string
}

const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().required('Email obrigatório'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = await api.post('/users', {
            user: {
                ...user,
                create_at: new Date()
            }
        })

        return response.data.user
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')  //é importante que logo após criar/atualizar/deletar um dado, que o cache seja excluído para que os dados sejam atualizados novamente, ou atualizar os dados direto no cache do react query
        }
    })
    const {
        register,
        handleSubmit,
        formState,
    } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })
    const { errors } = formState

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await createUser.mutateAsync(values)
    }

    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
                    <Divider my="6" borderColor="gray.700" />
                    <VStack spacing="8">
                        <SimpleGrid
                            width="100%"
                            minChildWidth="240px"
                            spacing={["6", "8"]}
                        >
                            <Input
                                name="name"
                                type="text"
                                label="Nome completo"
                                error={errors.name}
                                {...register('name')}
                            />
                            <Input
                                name="email"
                                type="email"
                                label="Email"
                                error={errors.email}
                                {...register('email')}
                            />
                        </SimpleGrid>
                        <SimpleGrid
                            width="100%"
                            minChildWidth="240px"
                            spacing={["6", "8"]}
                        >
                            <Input
                                name="password"
                                type="password"
                                label="Senha"
                                error={errors.password}
                                {...register('password')}
                            />
                            <Input
                                name="password_confirmation"
                                type="password"
                                label="Confirmação de senha"
                                error={errors.password_confirmation}
                                {...register('password_confirmation')}
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}