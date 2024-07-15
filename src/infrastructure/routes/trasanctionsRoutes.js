const express = require('express')

const { createTransactionController,

} = require("../dependencies/transanctionDependencies")

const transactionRouter = express.Router()

transactionRouter.post('/', createTransactionController.run.bind(createTransactionController))

module.exports = { transactionRouter }