const { SubscriptionRepository } = require("../repository/subscriptionRepository")

const { CreateSubscriptionUseCase } = require("../../application/subscription/createSubscriptionUseCase")
const { CreateSubscriptionController } = require("../controller/subscription/createSubscriptionController")
const { GetAllSubscriptionsUseCase } = require("../../application/subscription/getAllSubscriptionsUseCase")
const { GetAllSubscriptionsController } = require("../controller/subscription/getAllSubscriptionsController")
const { GetSubscriptionByIdUserUseCase } = require("../../application/subscription/getSubscriptionByIdUserUseCase")
const { GetSubscriptionByIdUserController } = require("../controller/subscription/getSubscriptionByIdUserController")
const { DeleteSubscriptionByIdUserUseCase } = require("../../application/subscription/deleteSubscriptionByIdUserUeCase")
const { DeleteSubscriptionByIdUserController } = require("../controller/subscription/deleteSubscriptionByIdUserController")
const { UpdateSubscriptionStatusUseCase } = require("../../application/subscription/updateSubscriptionStatusUseCase")
const { UpdateSubscriptionStatusController } = require("../controller/subscription/updateSubscriptionStatusController")
const { UpdatePlanSubscriptionUseCase } = require("../../application/subscription/updatePlanSubscriptionUseCase")
const { UpdatePlanSubscriptionController } = require("../controller/subscription/updatePlanSubscriptionController")

const subscriptionRepository = new SubscriptionRepository()

const createSubscriptionUseCase = new CreateSubscriptionUseCase(subscriptionRepository)
const createSubscriptionController = new CreateSubscriptionController(createSubscriptionUseCase)

const getAllSubscriptionsUseCase = new GetAllSubscriptionsUseCase(subscriptionRepository)
const getAllSubscriptionsController = new GetAllSubscriptionsController(getAllSubscriptionsUseCase)

const getSubscriptionByIdUserUseCase = new GetSubscriptionByIdUserUseCase(subscriptionRepository)
const getSubscriptionByIdUserController = new GetSubscriptionByIdUserController(getSubscriptionByIdUserUseCase)

const deleteSubscriptionUseCase = new DeleteSubscriptionByIdUserUseCase(subscriptionRepository)
const deleteSubscriptionByIdUserController = new DeleteSubscriptionByIdUserController(deleteSubscriptionUseCase)

const updateSubscriptionStatusUseCase = new UpdateSubscriptionStatusUseCase(subscriptionRepository)
const updateSubscriptionStatusController = new UpdateSubscriptionStatusController(updateSubscriptionStatusUseCase)

const updatePlanSubscriptionUseCase = new UpdatePlanSubscriptionUseCase(subscriptionRepository)
const updatePlanSubscriptionController = new UpdatePlanSubscriptionController(updatePlanSubscriptionUseCase)

module.exports = { createSubscriptionController,
    getAllSubscriptionsController,
    getSubscriptionByIdUserController,
    deleteSubscriptionByIdUserController,
    updateSubscriptionStatusController,
    updatePlanSubscriptionController,
}