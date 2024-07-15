const express = require('express')

const { createTransactionController,
    getTransactionByIdUserController,
    getAllTransactionsController
} = require("../dependencies/transanctionDependencies")
const { getAllSubscriptionsController } = require('../dependencies/subscriptionDependencies')

const transactionRouter = express.Router()

transactionRouter.post('/', createTransactionController.run.bind(createTransactionController))
transactionRouter.get('/:user_id', getTransactionByIdUserController.run.bind(getTransactionByIdUserController))
transactionRouter.get('/', getAllTransactionsController.run.bind(getAllTransactionsController))

module.exports = { transactionRouter }