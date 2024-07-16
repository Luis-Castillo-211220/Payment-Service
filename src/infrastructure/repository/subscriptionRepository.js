const { Subscription } = require("../../domain/entity/subscription")
const SubscriptionInterface = require("../../domain/port/subscriptionInterface")
const { SubscriptionPlan } = require("../../domain/entity/subscriptionPlan")
const  moment = require("moment")
const { Transactions } = require("../../domain/entity/transaction")
const { sequelize } = require("../../database/postgresql")

class SubscriptionRepository extends SubscriptionInterface{
    async createSubscription(user_id, plan_id, start_date, end_date, status){
        const transactionInst = await sequelize.transaction();
        try{
            const plan = await SubscriptionPlan.findByPk(plan_id)

            if(!plan){
                return null
            }else{
                const SubscriptionAux = await Subscription.findOne({where: {user_id}})

                if(SubscriptionAux){
                    return null
                }

                const start_date = new Date()
                const durationInMonths = parseInt(plan.duration)
                const end_date = moment(start_date).add(durationInMonths, 'months').toDate()
    
                const createdSubscription = await Subscription.create({
                    user_id,
                    plan_id,
                    start_date,
                    end_date,
                    status: status || 'Active'
                }, {
                    fields: ["user_id", "plan_id", "start_date", "end_date", "status"], 
                    transactionInst
                }); 
                
                const transactionData ={
                    user_id,
                    subscription_id: createdSubscription.subscription_id,
                    amount: plan.price,
                    transaction_date: start_date,
                    payment_method: 'Paypal',
                }

                const createdTransaction = await Transactions.create(transactionData, { transactionInst })
                await transactionInst.commit();

                return createdSubscription
            }

        }catch(err){
            return null
        }
    }

    async getAllSubscriptions(){
        try{                                                        // Incluir o no los planes 
            const subscriptions = await Subscription.findAll({include: [SubscriptionPlan]})
            return subscriptions;
        }catch(err){
            throw new Error('Error while fetching subscriptions')
        }
    }

    async getSubscriptionByIdUser(user_id){
        try{
            const subscription = await Subscription.findOne({where: {user_id}})
            return subscription;
        }catch(err){
            throw new Error('Error while fetching subscription by user_id')
        }
    }

    async deleteSubscriptionByIdUser(user_id){
        try{
            const subscription = await Subscription.findOne({where: {user_id}})
            if(subscription){
                await subscription.destroy()
                return true;
            }else{
                throw new Error('Subscription not found')
            }
        }catch(err){
            throw new Error('Error while deleting subscription')
        }
    }
}

module.exports = { SubscriptionRepository }