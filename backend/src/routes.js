const SessionController = require("./app/controllers/SessionController");
const UserController = require("./app/controllers/UserController");
const CategoryController = require("./app/controllers/CategoryController");
const ProductController = require("./app/controllers/ProductController");

module.exports = (app) => {
    app.use("/sessions", SessionController)
    app.use('/user', UserController)
    app.use('/category', CategoryController)
    app.use('/product', ProductController)
}