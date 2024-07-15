const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/postgresql');
const { Subscription } = require("./subscription")

const Transactions = sequelize.define('Transaction', {
    transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subscription_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Subscription,
            key: 'subscription_id',
        },
    },
    transaction_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.STRING,
        defaultValue: 'PayPal',
    },
});

Transactions.belongsTo(Subscription, {foreignKey: 'subscription_id'})

module.exports = { Transactions }   
