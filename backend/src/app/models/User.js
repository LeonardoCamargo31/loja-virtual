const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {//User não é o nome da tabela e sim do model
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,//virtual é aquele que fica presente somente dentro do model, não aparece na base de dados
        password_hash: DataTypes.STRING
    },
        {
            hooks: {//toda vez antes de salvar o usuario
                beforeSave: async user => {
                    if (user.password) {
                        user.password_hash = await bcrypt.hash(user.password, 8);
                    }
                }
            }
        });

    //metodo responsavel por comparar as senhas
    User.prototype.checkPassword = function (password) {
        return bcrypt.compare(password, this.password_hash);
    };

    //novo metodo responsavem por gerar o token
    User.prototype.generateToken = function () {
        //sign({ id: this.id } faço com que o id seja incriptado dentro do token, para depois saber a qual token pertence a qual usuario
        //process.env.APP_SECRET unico da nossa aplicação, para diferenciar nossos tokens de outras aplicaçãoes , esse secrete esta dentro de uma variavel de ambiente
        return jwt.sign({ id: this.id }, process.env.APP_SECRET);
    };

    return User;
};