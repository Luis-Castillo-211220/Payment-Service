const TransactionInterface = require("../../domain/port/transacctionInterface")

class CreateTransactionUseCase{
    constructor(transactionInterface = new TransactionInterface()){
        this.transactionInterface = transactionInterface
    }
    /**
     * @param {Number} user_id
     * @param {Number} subscription_id
     * @returns {Promise<Transaction|null>}
     */
    async run(user_id, subscription_id){
        try{
            const newTransaction = await this.transactionInterface.createTransaction(user_id, subscription_id)
            return newTransaction
        }catch(error){
            return error
        }
    }
}

module.exports = { CreateTransactionUseCase }