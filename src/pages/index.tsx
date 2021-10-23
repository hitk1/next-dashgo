import { Flex, Button, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '../components/Form/Input'

type SignInFormData = {
  email: string
  password: string
}

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm()

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    const { errors } = formState
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="Email"
            {...register('email')}
          />
          <Input
            name="Password"
            type="Password"
            label="Senha"
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
        >
          Entrar</Button>
      </Flex>
    </Flex>
  )
}
