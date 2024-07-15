const express = require('express')

const { createSubscriptionPlanController, 
    listSubscriptionsPlansController, 
    getByIdSubscriptionPlanController, 
    updateByIdSubscriptionPlanPriceController,
    deleteByIdSubscriptionPlanController   
} = require("../dependencies/subscriptionPlanDependencies")

const subscriptionPlanRouter = express.Router()

subscriptionPlanRouter.post('/', createSubscriptionPlanController.run.bind(createSubscriptionPlanController))
subscriptionPlanRouter.get('/', listSubscriptionsPlansController.run.bind(listSubscriptionsPlansController))
subscriptionPlanRouter.get('/:plan_id', getByIdSubscriptionPlanController.run.bind(getByIdSubscriptionPlanController))
subscriptionPlanRouter.put('/:plan_id/:newPrice/', updateByIdSubscriptionPlanPriceController.run.bind(updateByIdSubscriptionPlanPriceController))
subscriptionPlanRouter.delete('/:plan_id', deleteByIdSubscriptionPlanController.run.bind(deleteByIdSubscriptionPlanController))

module.exports = { subscriptionPlanRouter }