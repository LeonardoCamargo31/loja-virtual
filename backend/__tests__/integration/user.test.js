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
        //criamos o usuario
        await factory.create("User");

        const response = await request(app)
            .get("/user")//realizar um post na rota 


        //devemos ter um status 200
        expect(response.status).toBe(200);
    })

    it('Deve carregar usuario pelo id', async () => {
        //criamos o usuario
        await factory.create("User");


        const response = await request(app)
            .get("/user/1")//realizar um post na rota 


        //devemos ter um status 200
        expect(response.status).toBe(200);
    })

    it('Deve inserir um novo usuario', async () => {
        //criamos o usuario
        const user = await factory.build("User");

        const response = await request(app)
            .post("/user")
            .send({
                name: user.name,
                email: user.email,
                password: user.password
            })

        //devemos ter um status 200
        expect(response.status).toBe(200);
    })

    it('Deve alterar o usuario', async () => {
        //crio o usuario
        await factory.create("User");
        const name="teste"

        const response = await request(app)
            .put("/user/1")
            .send({
                name : name
            })

        console.log(response.body)
        //devemos ter um status 200
        expect(response.body.name).toBe("teste");
    })

})