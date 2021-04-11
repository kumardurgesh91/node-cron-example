module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('products', {
    product_code: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    product_value: {
      type: Sequelize.NUMBER,
    },
  });

  return Product;
};
