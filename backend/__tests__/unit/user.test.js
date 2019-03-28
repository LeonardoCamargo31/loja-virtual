
const bcrypt = require("bcryptjs");

const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("User", () => {
    beforeEach(async () => {
        await truncate();
    });

    it("Deve criptografar a senha do usuário", async () => {
        const user = await User.create({
            name: "Leonardo",
            email: "leonardo@hotmail.com.br",
            password: "123456"
        });

        //comparar a senha com a senha gerada
        const compareHash = await bcrypt.compare("123456", user.password_hash);

        //espero que seja true
        expect(compareHash).toBe(true);
    });
});