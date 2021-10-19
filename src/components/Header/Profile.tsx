import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

export function Profile() {
    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Luis Paulo</Text>
                <Text color="gray.300" fontSize="small">luispaulo.degini@gmail.com</Text>
            </Box>

            <Avatar size="md" name="Luis Paulo" src="https://github.com/hitk1.png" />
        </Flex>
    )
}