const SubscriptionInterface = require("../../domain/port/subscriptionInterface")
const { Subscription } = require("../../domain/entity/subscription")

class GetAllSubscriptionsUseCase{
    constructor(subscriptionInterface = new SubscriptionInterface()){
        this.subscriptionInterface = subscriptionInterface
    }

    /**
     * @returns {Promise<Array<Subscription>|null>}
     */
    async run(){
        try{
            return await this.subscriptionInterface.getAllSubscriptions()
        }catch(error){
            console.error('Error:', error)
            return null
        }
    }
}

module.exports = { GetAllSubscriptionsUseCase }