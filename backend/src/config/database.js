require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});
//repetimos esse codigo, pois o teste não tem acesso a app, ele roda aqui diretamente

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "mysql",
  storage: "./__tests__/database.sqlite",//meu banco de teste sera alocado aqui
  //operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true,//para toda tabela venha com createAt e UpdateAt para acada registro
    underscored: true,//para não pluralizar o o nome das tabelas 
    underscoredAll: true//para não pluralizar o o nome dos atributos
  }
};