const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/postgresql');
const { SubscriptionPlan } = require('./subscriptionPlan') 

const Subscription = sequelize.define('Subscription', {
    subscription_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SubscriptionPlan,
            key: 'plan_id',
        }
    },
    start_date:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    end_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Inactive', //Active
    }
});

Subscription.belongsTo(SubscriptionPlan, {foreignKey: 'plan_id'})

module.exports = { Subscription }   
