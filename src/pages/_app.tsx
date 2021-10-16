import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    //Toda configuração de temas extra, tem que ser disponibilizada no provider pra aplicação
    <ChakraProvider
      theme={theme}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
