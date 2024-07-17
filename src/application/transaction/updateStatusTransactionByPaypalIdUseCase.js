const TransactionInterface = require("../../domain/port/transacctionInterface")
const { Transactions } = require("../../domain/entity/transaction")

class UpdateStatusTransactionByPaypalIdUseCase{
    constructor(transactionInterface = new TransactionInterface()){
        this.transactionInterface = transactionInterface
    }

    /**
     * 
     * @param {String} paypal_payment_id 
     * @returns {Promise<Transactions|null>}
     */
    async run(paypal_payment_id){
        try{
            const transaction = await this.transactionInterface.updateStatusTransactionsByPaypalId(paypal_payment_id)
            return transaction
        }catch(err){
            console.error('Error:', err)
            return null
        }
    }
}

module.exports = { UpdateStatusTransactionByPaypalIdUseCase }