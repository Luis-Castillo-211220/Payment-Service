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
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    transaction_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    paypal_payment_id:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    approval_url:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false, //Pending, Processing, Completed, Failed, Cancelled
        defaultValue: 'Processing', //Pending
    },
    payment_method: {
        type: DataTypes.STRING,
        defaultValue: 'PayPal',
    }
});

Transactions.belongsTo(Subscription, {foreignKey: 'subscription_id'})

module.exports = { Transactions }   
