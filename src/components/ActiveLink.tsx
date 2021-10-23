import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";
import { cloneElement, ReactElement } from "react";

interface IProps extends LinkProps {
    children: ReactElement
    shouldMatchExactHref?: boolean
}

export function ActiveLink({ children, shouldMatchExactHref = false, ...restProps }: IProps) {
    const router = useRouter()
    let isActive: boolean

    if (shouldMatchExactHref)
        isActive = router.asPath === restProps.href || router.asPath === restProps.as
    else
        isActive = router.asPath.startsWith(String(restProps.href)) || router.asPath.startsWith(String(restProps.as))

    return (
        <Link {...restProps} >
            {cloneElement(children, {
                color: isActive ? 'pink.400' : 'gray.50'
            })}
        </Link>
    )
}