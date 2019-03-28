const { sequelize } = require("../../src/app/models");

//esse arquivo vai percorrer nosso banco e deletar tudo 

module.exports = () => {
  return Promise.all(
    Object.keys(sequelize.models).map(key => {
      return sequelize.models[key].destroy({ truncate: true, force: true });
    })
  );
};