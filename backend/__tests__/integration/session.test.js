const request = require("supertest");

const app = require("../../src/app");
//agora ao invés de importar o user, pegamos nossa factory
//const { User } = require('../../src/app/models')
const factory = require("../factories");
const truncate = require("../utils/truncate");

describe("Authentication", () => {
    //antes de todos os testes de 'Authentication'
    beforeEach(async () => {
        //executo o truncate, que vai deletar tudo no banco
        await truncate();
    });

    it('deve autenticar com credenciais válidas', async () => {
        const user = await factory.create("User", {
            password: "123123"
        });

        const response = await request(app)
            .post("/sessions")
            .send({
                email: user.email,
                password: "123123"
            });
            console.log(response.body)
        expect(response.status).toBe(200);
    })

    it("não deve autenticar com credenciais inválidas", async () => {
        const user = await factory.create("User", {
            password: "123123"
        });

        const response = await request(app)
            .post("/sessions")
            .send({
                email: user.email,
                password: "123456"
            });
            console.log(response.body)
        expect(response.status).toBe(401);
    });

    it("deve retornar token jwt quando autenticado", async () => {
        const user = await factory.create("User", {
            password: "123123"
        });

        const response = await request(app)
            .post("/sessions")
            .send({
                email: user.email,
                password: "123123"
            });

        //espero que no corpo da resposta tenha a propriedade token
        expect(response.body.details).toHaveProperty("token");
    });


    it("deve ser capaz de acessar rotas privadas quando autenticado", async () => {
        const user = await factory.create("User", {
            password: "123123"
        });

        const response = await request(app)
            .get("/dashboard")
            .set("Authorization", `Bearer ${user.generateToken()}`);//setando o token

        expect(response.status).toBe(200);
    });

    //não passo o token
    it("não deve ser possível acessar rotas privadas sem token jwt", async () => {
        const response = await request(app).get("/dashboard");

        expect(response.status).toBe(401);
    });

    //com token invalido
    it("não deve poder acessar rotas privadas com token jwt inválido", async () => {
        const response = await request(app)
            .get("/dashboard")
            .set("Authorization", `Bearer 123123`);

        expect(response.status).toBe(401);
    });
})