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
        await factory.create("User", {
            password: "123123"//sobreponho a senha setada lá na factory
        });


        const response = await request(app)
            .get("/user")//realizar um post na rota 


        //devemos ter um status 200
        expect(response.status).toBe(200);
    })

    it('Deve carregar usuario pelo id', async () => {
        //criamos o usuario
        await factory.create("User", {
            password: "123123"//sobreponho a senha setada lá na factory
        });


        const response = await request(app)
            .get("/user/1")//realizar um post na rota 


        //devemos ter um status 200
        expect(response.status).toBe(200);
    })

})