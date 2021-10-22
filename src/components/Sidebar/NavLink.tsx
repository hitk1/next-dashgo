import { Link, Icon, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { ElementType } from "react";

interface IProps extends ChakraLinkProps {
    icon: ElementType
    children: string
}

export function NavLink({ icon, children, ...restProps }: IProps) {

    return (
        <Link display="flex" align="center" {...restProps}>
            <Icon as={icon} fontSize='20' />
            <Text ml="4" fontWeight="medium">{children}</Text>
        </Link>
    )
}