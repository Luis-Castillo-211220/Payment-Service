const { TransactionRepository } = require("../repository/transactionRepository")

const { CreateTransactionUseCase } = require("../../application/transaction/createTransanctionUseCase")
const { CreateTransactionController } = require("../controller/transaction/createTransactionController")
const { GetTransactionByIdUserUseCase } = require("../../application/transaction/getTransactionByIdUserUseCase")
const { GetTransactionByIdUserController } = require("../controller/transaction/getTransactionByIdUserController")
const { GetAllTransactionsUseCase }  = require("../../application/transaction/getAllTransactionsUseCase")
const { GetAllTransactionsController } = require("../controller/transaction/getAllTransactionsController")
const { UpdateStatusTransactionByPaypalIdUseCase } = require("../../application/transaction/updateStatusTransactionByPaypalIdUseCase")
const { UpdateStatusTransactionByPaypalIdController } = require("../controller/transaction/updateStatusTransactionByPaypalIdController")

const transactionRepository = new TransactionRepository()

const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository)
const createTransactionController = new CreateTransactionController(createTransactionUseCase)

const getTransactionByIdUserUseCase = new GetTransactionByIdUserUseCase(transactionRepository)
const getTransactionByIdUserController = new GetTransactionByIdUserController(getTransactionByIdUserUseCase)

const getAllTransactionsUseCase = new GetAllTransactionsUseCase(transactionRepository)
const getAllTransactionsController = new GetAllTransactionsController(getAllTransactionsUseCase)

const updateStatusTransactionByPaypalIdUseCase = new UpdateStatusTransactionByPaypalIdUseCase(transactionRepository)
const updateStatusTransactionByPaypalIdController = new UpdateStatusTransactionByPaypalIdController(updateStatusTransactionByPaypalIdUseCase)

module.exports = { createTransactionController,
    getTransactionByIdUserController,
    getAllTransactionsController,
    updateStatusTransactionByPaypalIdController,
}