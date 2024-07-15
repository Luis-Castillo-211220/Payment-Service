const { SubscriptionPlanRepository } = require("../repository/subscriptionPlanRepository")

const { CreateSubscriptionPlanUseCase } = require("../../application/subscriptionPlan/createSubscriptionPlanUseCase")
const { CreateSubscriptionPlanController } = require("../controller/subscriptionPlan/CreateSubscriptionPlanController")
const { ListSubscriptionsPlansUseCase } = require("../../application/subscriptionPlan/listSubscriptionPlanUseCase")
const { ListSubscriptionsPlansController } =  require("../controller/subscriptionPlan/listSubscriptionPlanController")
const { GetByIdSubscriptionPlanUseCase } = require("../../application/subscriptionPlan/getByIdSubscriptionUseCase")
const { GetByIdSubscriptionPlanController } = require("../controller/subscriptionPlan/getByIdSubscriptionController")
const { UpdateByIdSubscriptionPlanPriceUseCase } = require("../../application/subscriptionPlan/updateByIdSubscriptionPlanPriceUseCase")
const { UpdateByIdSubscriptionPlanPriceController } = require("../controller/subscriptionPlan/updateByIdSubscriptionPlanPriceController")
const { DeleteByIdSubscriptionPlanUseCase} = require("../../application/subscriptionPlan/deleteByIdSubscriptionPlanUseCase")
const { DeleteByIdSubscriptionPlanController } = require("../controller/subscriptionPlan/deleteByIdSubscriptionPlanController")

const subscriptionPlanRepository = new SubscriptionPlanRepository()

const createSubscriptionPlanUseCase = new CreateSubscriptionPlanUseCase(subscriptionPlanRepository)
const createSubscriptionPlanController = new CreateSubscriptionPlanController(createSubscriptionPlanUseCase)

const listSubscriptionsPlansUseCase = new ListSubscriptionsPlansUseCase(subscriptionPlanRepository)
const listSubscriptionsPlansController = new ListSubscriptionsPlansController(listSubscriptionsPlansUseCase)

const getByIdSuscriptionPlanUseCase = new GetByIdSubscriptionPlanUseCase(subscriptionPlanRepository)
const getByIdSubscriptionPlanController = new GetByIdSubscriptionPlanController(getByIdSuscriptionPlanUseCase)

const updateByIdSubscriptionPlanPriceUseCase = new UpdateByIdSubscriptionPlanPriceUseCase(subscriptionPlanRepository)
const updateByIdSubscriptionPlanPriceController = new UpdateByIdSubscriptionPlanPriceController(updateByIdSubscriptionPlanPriceUseCase)

const deleteByIdSubscriptionPlanUseCase = new DeleteByIdSubscriptionPlanUseCase(subscriptionPlanRepository)
const deleteByIdSubscriptionPlanController = new DeleteByIdSubscriptionPlanController(deleteByIdSubscriptionPlanUseCase)

module.exports = { createSubscriptionPlanController, 
    listSubscriptionsPlansController, 
    getByIdSubscriptionPlanController, 
    updateByIdSubscriptionPlanPriceController,
    deleteByIdSubscriptionPlanController
}