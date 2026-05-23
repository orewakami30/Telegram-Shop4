// wallet.model.js
// Sequelize model definition for Wallet

module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
      defaultValue: 0,
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'USD',
    },
  }, {
    tableName: 'wallets',
    timestamps: true,
  });

  Wallet.associate = models => {
    Wallet.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Wallet;
};
