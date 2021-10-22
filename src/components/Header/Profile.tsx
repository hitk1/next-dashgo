import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

interface IProps {
    showProfileData: boolean
}

export function Profile({ showProfileData = true }: IProps) {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Luis Paulo</Text>
                    <Text color="gray.300" fontSize="small">luispaulo.degini@gmail.com</Text>
                </Box>
            )}

            <Avatar size="md" name="Luis Paulo" src="https://github.com/hitk1.png" />
        </Flex>
    )
}