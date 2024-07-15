const { Transactions } = require("../entity/transaction")

class TransactionInterface{

    /**
     * 
     * @param {Number} user_id 
     * @param {Number} subscription_id 
     * @returns {Promise<Transactions|null>}
     */
    async createTransaction(user_id, subscription_id,){
        throw new Error("createTransaction method not implemented")
    }

    /**
     * @param {Number} user_id 
     * @returns {Promise<Transactions|null|Array<Transactions>>}
     */
    async getTransanctionsByUserId(user_id){
        throw new Error("GetTransanctionsByUserId method not implemented")
    }

    /**
     * @returns {Promise<Array<Transactions>|null>}
     */
    async getAllTransactions(){
        throw new Error("getAllTransactions method not implemented")
    }
}

module.exports = TransactionInterface