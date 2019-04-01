module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        title: DataTypes.STRING,
        description:DataTypes.TEXT,
        price:DataTypes.DECIMAL,
        category:DataTypes.INTEGER
    });

    return Product;
};