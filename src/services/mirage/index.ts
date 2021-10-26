import { createServer, Factory, Model } from 'miragejs'
import faker from 'faker'

type User = {
    name: string
    email: string
    created_at: string
}

export function makeServer() {
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({})   //Partial é um attr do typescript que diz que o objeto não precisar estar completo
        },
        factories: {
            user: Factory.extend({
                name(i: number) {
                    return `User ${i + 1}`
                },
                email() {
                    return faker.internet.email().toLowerCase()
                },
                created_at() {
                    return faker.date.recent(10)
                }
            })
        },
        seeds(server) {
            server.createList('user', 20)
        },
        routes() {
            this.namespace = 'api'
            this.timing = 750
            this.get('/users');
            this.post('/users');

            this.namespace = '' //é necessário configurar o namespace em branco por conta das API routes do Next
            this.passthrough()  //Redireciona todas as chamadas que nao forem 'identificadas' pelo miragejs
        }
    })

    return server
}