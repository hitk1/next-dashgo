import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input as ChakraInput,
    InputProps as ChakraInputProps
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface IInputProps extends ChakraInputProps {
    name: string
    error?: FieldError
    label?: string
}

const InputElem: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = ({ name, label, error = null, ...rest }: IInputProps, ref) => {
    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <ChakraInput
                id={name}
                name={name}
                type="password"
                focusBorderColor="pink.500"
                bgColor="gray.900"
                variant="filled"
                _hover={{
                    bgColor: 'gray.900'
                }}
                size="lg"
                ref={ref}
                {...rest}
            />
            {!!error && (
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    )
}

export const Input = forwardRef(InputElem)