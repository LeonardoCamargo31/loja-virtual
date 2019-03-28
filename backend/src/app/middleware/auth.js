const jwt = require("jsonwebtoken");
const { promisify } = require("util");//promisify transformar o callback em uma promisse assim consigo usar o await

//esse middleware valida nosso token
module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    //verificando se existe o cabeçalho authorization
    if (!authHeader) {
        return res.status(401).json({ message: "Token not provided" });
    }

    const [, token] = authHeader.split(" ");

    try {
        //validando se o token é valido
        //promisify(jwt.verify) passo a função que quero trasnformar em uma promisse
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

        //dentro do token tem o id, então decodifico
        req.userId = decoded.id;

        return next();
    } catch (err) {
        //caso de erro
        return res.status(401).json({ message: "Token invalid" });
    }
};