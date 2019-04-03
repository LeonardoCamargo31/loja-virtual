const request = require("supertest");

const app = require("../../src/app");
const factory = require("../factories");
const truncate = require("../utils/truncate");



describe("User", () => {
    //antes de todos os testes de 'User'
    beforeEach(async () => {
        //executo o truncate, que vai deletar tudo no banco
        await truncate();
    });


    it('Deve carregar usuario', async () => {
        await factory.create("User");

        const response = await request(app)
            .get("/user")

        expect(response.status).toBe(200);
    })

    it('Deve carregar usuario pelo id', async () => {
        await factory.create("User");

        const response = await request(app)
            .get("/user/1")

        expect(response.status).toBe(200);
    })

    it('Deve inserir um novo usuario', async () => {
        const user = await factory.build("User");

        const response = await request(app)
            .post("/user")
            .send({
                name: user.name,
                email: user.email,
                password: user.password
            })

        expect(response.status).toBe(200);
    })

    it('Deve alterar o usuario', async () => {
        const name = "teste"
        const user = await factory.create("User", { name });

        const response = await request(app)
            .put(`/user/${user.id}`)
            .send({ name })
            
        expect(response.body.details.name).toBe(name);
    })

    it('Deve deletar o usuario', async () => {
        const user = await factory.create("User");

        const response = await request(app)
            .delete(`/user/${user.id}`)

        expect(response.status).toBe(200);
    })

})