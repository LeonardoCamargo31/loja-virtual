require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require("express");


class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        //para entender os corpos em formato json
        this.express.use(express.json());
    }

    routes() {
        this.express.use(require("./routes"));
    }
}

//separamos a logica de locação da porta pois nos teste, não quero que ele aloque nenhuma porta

module.exports = new AppController().express;