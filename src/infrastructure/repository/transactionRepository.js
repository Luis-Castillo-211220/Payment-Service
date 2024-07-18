const { Subscription } = require("../../domain/entity/subscription")
const { Transactions } = require("../../domain/entity/transaction")
const TransactionInterface = require("../../domain/port/transacctionInterface")
const paypalAdapter = require("../../payment/paypalAdapter")
const { getToken } = require("../../payment/paypalClient")

class TransactionRepository extends TransactionInterface{
    async createTransaction(user_id, subscription_id){
        try{
            const subscriptionAux = await Subscription.findOne({where: {user_id: user_id, subscription_id: subscription_id}})
            
            if(!subscriptionAux){
               return null;
            }
            const transaction_date = subscriptionAux.start_date 
            const amount = subscriptionAux.price

            const transaction = await Transactions.create(
                {
                    user_id: user_id,
                    subscription_id: subscription_id,
                    transaction_date: transaction_date,
                    amount: amount,
                }
            )
            return transaction
        }catch(err){
            throw new Error("Failed to create transaction")
        }
    }

    async getTransanctionsByUserId(user_id) {
        try{
            const transactions = await Transactions.findOne({where: {user_id: user_id}})
            return transactions
        }catch(err){
            return null
        }
    }

    async getAllTransactions(){
        try{
            const transactions = await Transactions.findAll()
            return transactions
        }catch(err){
            return null
        }
    }

    //CAPTURE TRANSACTION - CONFIRMAR PAGO
    async updateStatusTransactionsByPaypalId(paypal_payment_id){
        try{
            const transaction = await Transactions.findOne({where: {paypal_payment_id: paypal_payment_id}})

            if(!transaction){
                return null
            }

            const token = await getToken()

            const captureResult = await paypalAdapter.capturePayment(paypal_payment_id, token.token_type, token.access_token)
            if(captureResult.statusText === 'Created'){
                await transaction.update({status: 'Completed'})
                await transaction.save()

                const updateSubs = await Subscription.findOne({where: {user_id: transaction.user_id}})
                if(updateSubs){
                    await updateSubs.update({status: 'Active'})
                    await updateSubs.save()
                }else{
                    throw new Error('Subscription not found')
                }

                return transaction
            }else{
                await transaction.update({status: 'failed'})
                await transaction.save()
                return transaction
            }
        }catch(err){
            return null
        }
    }
}

module.exports = { TransactionRepository }