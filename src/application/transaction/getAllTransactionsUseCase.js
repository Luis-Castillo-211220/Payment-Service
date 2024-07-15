const TransactionInterface = require("../../domain/port/transacctionInterface")
const { Transactions } = require("../../domain/entity/transaction")

class GetAllTransactionsUseCase{
    constructor(transactionInterface = new TransactionInterface()){
        this.transactionInterface = transactionInterface
    }

    /**
     * 
     * @returns {Promise<Array<Transactions>|null>}
     */
    async run(){
        try{
            const data = await this.transactionInterface.getAllTransactions()
            return data
        }catch(error){
            return error
        }
    }
}

module.exports = { GetAllTransactionsUseCase }