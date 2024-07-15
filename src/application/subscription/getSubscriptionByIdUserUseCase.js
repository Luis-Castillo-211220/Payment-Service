const SubscriptionInterface = require("../../domain/port/subscriptionInterface")
const { Subscription } = require("../../domain/entity/subscription")

class GetSubscriptionByIdUserUseCase{
    constructor(subscriptionInterfaces = new SubscriptionInterface()){
        this.subscriptionInterfaces = subscriptionInterfaces
    }

    /**
     * 
     * @param {Number} user_id 
     * @returns {Promise<Subscription|null>}
     */
    async run(user_id){
        try{
            const subscription = await this.subscriptionInterfaces.getSubscriptionByIdUser(user_id)
            return subscription
        }catch(error){
            console.error('Error:', error)
            return null
        }
    }
}

module.exports = { GetSubscriptionByIdUserUseCase }