//repetimos essa parte de criação do usuario muitas vezes, então usamos factory-girl, que ajuda a criar factorys
const faker = require("faker");//essa lib nos ajuda a gerar dados fake
const { factory } = require("factory-girl");
const { User } = require("../src/app/models");

//nome definido, o model
factory.define("User", User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});


module.exports = factory;