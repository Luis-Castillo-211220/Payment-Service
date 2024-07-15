const { TransactionRepository } = require("../repository/transactionRepository")

const { CreateTransactionUseCase } = require("../../application/transaction/createTransanctionUseCase")
const { CreateTransactionController } = require("../controller/transaction/createTransactionController")

const transactionRepository = new TransactionRepository()

const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository)
const createTransactionController = new CreateTransactionController(createTransactionUseCase)


module.exports = { createTransactionController,

}