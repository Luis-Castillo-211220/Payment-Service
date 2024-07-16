const express = require('express');

const { createSubscriptionController,
    getAllSubscriptionsController,
    getSubscriptionByIdUserController,
    deleteSubscriptionByIdUserController,
    updateSubscriptionStatusController,
    updatePlanSubscriptionController
 } = require("../dependencies/subscriptionDependencies")

const subscriptionRouter = express.Router()

subscriptionRouter.post('/', createSubscriptionController.run.bind(createSubscriptionController))
subscriptionRouter.get('/', getAllSubscriptionsController.run.bind(getAllSubscriptionsController))
subscriptionRouter.get('/:user_id', getSubscriptionByIdUserController.run.bind(getSubscriptionByIdUserController))
subscriptionRouter.delete('/:user_id', deleteSubscriptionByIdUserController.run.bind(deleteSubscriptionByIdUserController))
subscriptionRouter.put('/', updateSubscriptionStatusController.run.bind(updateSubscriptionStatusController))
subscriptionRouter.put('/:user_id/:newPlan_id', updatePlanSubscriptionController.run.bind(updatePlanSubscriptionController))

module.exports = { subscriptionRouter }