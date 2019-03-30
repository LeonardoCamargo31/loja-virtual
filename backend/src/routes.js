const SessionController = require("./app/controllers/SessionController");
const UserController = require("./app/controllers/UserController");

module.exports = (app) => {
    app.use("/sessions", SessionController)
    app.use('/user', UserController)
}