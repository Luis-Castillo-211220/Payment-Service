const SubscriptionInterface = require("../../domain/port/subscriptionInterface")
const { Subscription } = require("../../domain/entity/subscription")

class UpdatePlanSubscriptionUseCase{
    constructor(subscriptionInterface = new SubscriptionInterface()){
        this.subscriptionInterface = subscriptionInterface
    }

    /**
     * 
     * @param {Number} user_id 
     * @param {Number} newPlan_id 
     * @returns {Promise<Subscription|null>}
     */
    async run(user_id, newPlan_id){
        try{
            const subscriptionUpdatedPlan = await this.subscriptionInterface.updatePlanSubscription(user_id, newPlan_id)
            return subscriptionUpdatedPlan
        }catch(err){
            return err
        }
    }
}

module.exports = { UpdatePlanSubscriptionUseCase }