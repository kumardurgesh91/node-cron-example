module.exports = (sequelize, Sequelize) => {
  const ProductQueue = sequelize.define('products_queue', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    product_code: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    product_value: {
      type: Sequelize.NUMBER,
    },
  });

  return ProductQueue;
};
