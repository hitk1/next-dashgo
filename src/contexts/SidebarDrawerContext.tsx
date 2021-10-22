import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext, ReactNode } from "react";

interface SidebarDrawerProviderProps {
    children: ReactNode
}

const SidebarDrawerContext = createContext({} as UseDisclosureReturn)

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
    const disclosure = useDisclosure()
    const router = useRouter()

    /*
    é uma estratégia utilizada pra fechar o drawer toda vez que acontecer uma troca de rotas
    ao inves de ficar fechando na própria função do click dos botões na tela
    */
    useEffect(() => {
        disclosure.onClose()
    }, [router.asPath])

    return (
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)