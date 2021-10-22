import { Text } from '@chakra-ui/react'

export function Logo() {
    return (
        <Text
            fontSize={["2xl", '3xl']}  /*Quando os valores são informados em forma de array, isso indicado condicionais para responsividade
                                            ou seja, os valores são informados em ordem que serão aplicados da menor tela para a maior
                                        */
            fontWeight="bold"
            letterSpacing="tight"
            w="64"
        >
            dashgo
            <Text
                as="span"
                ml="1"
                color="pink.500"
            >
                .
            </Text>
        </Text>
    )
}