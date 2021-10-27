import { Stack, Box, Text } from '@chakra-ui/react'
import { PaginationItem } from './PaginationItem'

interface IProps {
    totalCountOfRegisters: number
    registersPerPage?: number
    currentPage?: number
    onPageChange: (page: number) => void
}

const siblingsCount = 1

const generatePageArray = (from: number, to: number) => {
    return [...new Array(to - from)]
        .map((_, index) => from + index + 1)
        .filter(item => item > 0)
}

export function Pagination({
    totalCountOfRegisters,
    registersPerPage = 10,
    currentPage = 1,
    onPageChange,
}: IProps) {
    const lastPage = Math.floor(totalCountOfRegisters / registersPerPage)

    const previousPages = currentPage > 1
        ? generatePageArray(currentPage - 1 - siblingsCount, currentPage - 1)
        : []

    const nextPages = currentPage < lastPage
        ? generatePageArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
        : []


    return (
        <Stack
            direction={["column", "row"]}
            mt="8"
            spacing="6"
            justify="space-between"
            align="center"
        >
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>
            <Stack spacing="2" direction="row">
                {currentPage > (1 + siblingsCount) && (
                    <>
                        <PaginationItem onPageChange={onPageChange} pageNumber={1} />
                        {currentPage > (2 + siblingsCount) && (
                            <Text color="gray.300" width="8" textAlign="center">...</Text>
                        )}
                    </>
                )}

                {previousPages.length > 0 && previousPages.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} pageNumber={page} />
                })}
                <PaginationItem onPageChange={onPageChange} pageNumber={currentPage} isCurrent />
                {nextPages.length > 0 && nextPages.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} pageNumber={page} />
                })}

                {currentPage + siblingsCount < lastPage && (
                    <>
                        {(currentPage + 1 + siblingsCount) < lastPage && (
                            <Text color="gray.300" width="8" textAlign="center">...</Text>
                        )}
                        <PaginationItem onPageChange={onPageChange} pageNumber={lastPage} />
                    </>
                )}
            </Stack>
        </Stack>
    )
}