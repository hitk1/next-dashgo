import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
//A importação do Chart deve ser feito com dynamic porque ele usa estritamente algumas dependencias do browser
// o "dynamic", faz com que a importação aconteça, necessariamente, no browser com a opção "ssr: false"
// o dynaic é muito utilizado para carregamentos dinamicos
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const options = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.gray[500]
    },
    grid: {
        show: false
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        enabled: false
    },
    xaxis: {
        type: "datetime",
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            '2021-10-18T22:02:00.000Z',
            '2021-10-19T22:02:00.000Z',
            '2021-10-20T22:02:00.000Z',
            '2021-10-21T22:02:00.000Z',
            '2021-10-22T22:02:00.000Z',
            '2021-10-23T22:02:00.000Z',
        ]
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3
        }
    }
}

const series = [
    {
        name: 'TypeData1',
        data: [213, 5, 78, 89, 45, 23,]
    } //Quantos tipos de dados que serão plotados
]

export default function Dashboard() {
    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <SimpleGrid
                    flex='1'
                    gap="4"
                    minChildWidth="320px"
                    align="flex-start"
                >
                    <Box
                        p="8"
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                    >
                        <Text
                            fontSize="lg"
                            mb="4"
                        >
                            Inscritos da semana
                        </Text>
                        <Chart
                            options={options}
                            series={series}
                            type="area"
                            height={160}
                        />
                    </Box>
                    <Box
                        p="8"
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                    >
                        <Text
                            fontSize="lg"
                            mb="4"
                        >
                            Taxa de abertura
                        </Text>
                        <Chart
                            options={options}
                            series={series}
                            type="area"
                            height={160}
                        />
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}