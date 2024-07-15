const TransactionInterface = require("../../domain/port/transacctionInterface")
const { Transactions }  = require("../../domain/entity/transaction")

class GetTransactionByIdUserUseCase{
    constructor(transactionInterface = new TransactionInterface()){
        this.transactionInterface = transactionInterface
    }
    
    /**
     * 
     * @param {Number} user_id 
     * @returns {Promise<Transactions|null>}
     */
    async run(user_id){
        try{
            const transaction = await this.transactionInterface.getTransanctionsByUserId(user_id)
            return transaction
        }catch(err){
            console.error('Error:', err)
            return null
        }
    }
}

module.exports = { GetTransactionByIdUserUseCase }