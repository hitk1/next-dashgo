import { Button } from '@chakra-ui/react'

interface IProps {
    pageNumber: number
    isCurrent?: boolean
    onPageChange: (page: number) => void
}

export function PaginationItem({ isCurrent = false, pageNumber, onPageChange }: IProps) {
    if (isCurrent)
        return (
            <Button
                size="sm"
                fontSize="xs"
                width="4"
                colorScheme="pink"
                disabled
                _disable={{
                    bgColor: 'pink.500',
                    cursor: 'pointers'
                }}
            >
                {pageNumber}
            </Button>
        )

    return (
        <Button
            size="sm"
            fontSize="xs"
            width="4"
            bg="gray.700"
            _hover={{
                bg: 'gray.500'
            }}
            onClick={() => onPageChange(pageNumber)}
        >
            {pageNumber}
        </Button>
    )
}