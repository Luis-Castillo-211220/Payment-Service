const { Subscription } = require("../../domain/entity/subscription")
const SubscriptionInterface = require("../../domain/port/subscriptionInterface")
const { SubscriptionPlan } = require("../../domain/entity/subscriptionPlan")
const  moment = require("moment")
const { Transactions } = require("../../domain/entity/transaction")
const { sequelize } = require("../../database/postgresql")
const paypalAdapter = require("../Services/paypal/paypalAdapter")

class SubscriptionRepository extends SubscriptionInterface{
    async createSubscription(user_id, plan_id, start_date, end_date, status){
        const transactionInst = await sequelize.transaction();
        try{
            const plan = await SubscriptionPlan.findByPk(plan_id)

            if(!plan){
                return null
            }

            const existingSubscription = await Subscription.findOne({where: {user_id}})

            if(existingSubscription){
                return null
            }

            const start_date = new Date()
            const durationInMonths = parseInt(plan.duration)
            const end_date = moment(start_date).add(durationInMonths, 'months').toDate()

            const paymentResult = await paypalAdapter.createPayment(plan.price)
            if(paymentResult.status !== 'success'){
                return null
            }

            const paypal_payment_id = paymentResult.id
            const approvalUrl = paymentResult.approvalUrl
            
            const createdSubscription = await Subscription.create({
                user_id,
                plan_id,
                start_date,
                end_date,
            }, {
                fields: ["user_id", "plan_id", "start_date", "end_date", "status"], 
                transactionInst
            }); 
            
            const transactionData ={
                user_id,
                subscription_id: createdSubscription.subscription_id,
                amount: plan.price,
                transaction_date: start_date,
                paypal_payment_id: paypal_payment_id,
                approval_url: approvalUrl,
                status: 'pending',
                payment_method: 'Paypal',
                
            }

            const createdTransaction = await Transactions.create(transactionData, { transaction: transactionInst })
            await transactionInst.commit();

            return createdSubscription
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

    async updateSubscriptionStatus(user_id, dateNow) {

        try{
            const subscription = await Subscription.findOne({where: {user_id}})
            if(subscription){
                const dateConvert = moment(dateNow, moment.ISO_8601, true).toDate();
                if(dateConvert >= subscription.end_date){
                    await subscription.update({ status: 'Inactive' })
                    await subscription.save()
                    return false
                }else{
                    return true
                }
            }else{
                return null
            }
        }catch(err){
            console.log(err)
            return null
        }
    }

    async updatePlanSubscription(user_id, newPlan_id){
        const transactionInst = await sequelize.transaction();
        try{
            const subscription = await Subscription.findOne({where: {user_id}})
            if(subscription){
                if(subscription.status === 'Active'){
                    return null
                }
                const plan = await SubscriptionPlan.findByPk(newPlan_id)
                const start_date = new Date()
                const durationInMonths = parseInt(plan.duration)
                const end_date = moment(start_date).add(durationInMonths, 'months').toDate()

                const paymentResult = await paypalAdapter.createPayment(plan.price)
                if(paymentResult.status !== 'success'){
                    return null
                }

                const paypal_payment_id = paymentResult.id
                const approvalUrl = paymentResult.approvalUrl

                await subscription.update({
                    plan_id: newPlan_id,
                    start_date: start_date,
                    end_date: end_date,
                    status: 'Active'
                }, transactionInst)
                await subscription.save()

                const transactionData ={
                    user_id,
                    subscription_id: subscription.subscription_id,
                    amount: plan.price,
                    transaction_date: start_date,
                    paypal_payment_id: paypal_payment_id,
                    approval_url: approvalUrl,
                    status: 'pending',
                    payment_method: 'Paypal',
                }

                const createdTransaction = await Transactions.create(transactionData, { transactionInst })
                await transactionInst.commit();

                return subscription
            }else{
                return null
            }
        }catch(err){
            console.log(err)
            return null
        }
    }
}

module.exports = { SubscriptionRepository }