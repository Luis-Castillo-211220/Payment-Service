const { Subscription } = require("../../domain/entity/subscription")
const SubscriptionInterface = require("../../domain/port/subscriptionInterface")

class UpdateSubscriptionStatusUseCase{
    constructor(subscriptionInterfaces = new SubscriptionInterface()){
        this.subscriptionInterfaces = subscriptionInterfaces
    }

    /**
     * 
     * @param {Number} user_id 
     * @param {String} dateNow 
     * @returns {Promise<Subscription|null>}
     */
    async run(user_id, dateNow){
        try{
            const updatedSubscription = await this.subscriptionInterfaces.updateSubscriptionStatus(user_id, dateNow)
            return updatedSubscription
        }catch(error){
            return error
        }  
    }
}   

module.exports = { UpdateSubscriptionStatusUseCase }