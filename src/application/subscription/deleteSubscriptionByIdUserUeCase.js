const SubscriptionInterface = require("../../domain/port/subscriptionInterface")
const { Subscription } = require("../../domain/entity/subscription")

class DeleteSubscriptionByIdUserUseCase{
    constructor(subscriptionInterfaces = new SubscriptionInterface()){
        this.subscriptionInterfaces = subscriptionInterfaces
    }

    /**
     * 
     * @param {Number} user_id 
     * @returns {Promise<Boolean|null>}
     */
    async run(user_id){
        try{
            const deletedSubscription = await this.subscriptionInterfaces.deleteSubscriptionByIdUser(user_id)
            return deletedSubscription
        }catch(error){
            console.log(error)
            return error
        }
    }
}

module.exports = { DeleteSubscriptionByIdUserUseCase }