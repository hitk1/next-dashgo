import {
    FormControl,
    FormLabel,
    Input as ChakraInput,
    InputProps as ChakraInputProps
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'

interface IInputProps extends ChakraInputProps {
    name: string
    label?: string
}

const InputElem: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = ({ name, label, ...rest }: IInputProps, ref) => {
    return (
        <FormControl>
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
        </FormControl>
    )
}

export const Input = forwardRef(InputElem)