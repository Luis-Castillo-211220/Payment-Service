const { Subscription } = require("../../domain/entity/subscription")
const { Transactions } = require("../../domain/entity/transaction")
const TransactionInterface = require("../../domain/port/transacctionInterface")

class TransactionRepository extends TransactionInterface{
    async createTransaction(user_id, subscription_id){
        try{
            const status = 'Paypal' // hardcoded for now
            const subscriptionAux = await Subscription.findOne({where: {user_id: user_id, subscription_id: subscription_id}})
            
            if(!subscriptionAux){
               return null;
            }
            const transaction_date = subscriptionAux.start_date 

            const transaction = await Transactions.create(
                {
                    user_id: user_id,
                    subscription_id: subscription_id,
                    transaction_date: transaction_date,
                    status: status || 'Paypal'
                }
            )
            return transaction
        }catch(err){
            throw new Error("Failed to create transaction")
        }
    }
}

module.exports = { TransactionRepository }