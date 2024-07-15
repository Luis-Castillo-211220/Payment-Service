const SubscriptionInterface = require("../../domain/port/subscriptionInterface")

class CreateSubscriptionUseCase{
    constructor(subscriptionInterface = new SubscriptionInterface()){
        this.subscriptionInterface = subscriptionInterface
    }

    // * @param {Date|null} start_date 
    // * @param {Date|null} end_date 

    /**
     * 
     * @param {Number} user_id 
     * @param {Number} plan_id 

     * @param {String|null} status 
     */
    async run(user_id, plan_id, status){
        try{
            const newSubscription = await this.subscriptionInterface.createSubscription(user_id, plan_id, status)
            return newSubscription
        }catch(err){
            return err
        }
    }
}

module.exports = { CreateSubscriptionUseCase }