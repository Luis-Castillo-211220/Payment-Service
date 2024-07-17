const express = require('express')

const { createTransactionController,
    getTransactionByIdUserController,
    getAllTransactionsController,
    updateStatusTransactionByPaypalIdController
} = require("../dependencies/transanctionDependencies")
const { getAllSubscriptionsController } = require('../dependencies/subscriptionDependencies')

const transactionRouter = express.Router()

transactionRouter.post('/', createTransactionController.run.bind(createTransactionController))
transactionRouter.get('/:user_id', getTransactionByIdUserController.run.bind(getTransactionByIdUserController))
transactionRouter.get('/', getAllTransactionsController.run.bind(getAllTransactionsController))
transactionRouter.post('/:paypal_payment_id/certificate', updateStatusTransactionByPaypalIdController.run.bind(updateStatusTransactionByPaypalIdController))

module.exports = { transactionRouter }