module.exports = (sequelize, Sequelize) => {
  const ProductRegion = sequelize.define('products_region', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    zone: {
      type: Sequelize.STRING,
    },
  });

  return ProductRegion;
};
