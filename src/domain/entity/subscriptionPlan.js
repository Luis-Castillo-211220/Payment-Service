const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/postgresql');

    const SubscriptionPlan = sequelize.define('SubscriptionPlan', {
        plan_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate:{
                isNumeric: {
                    msg: 'Price must be a number'
                },
                min: 0,
                max: 1000000,
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    module.exports = { SubscriptionPlan }
