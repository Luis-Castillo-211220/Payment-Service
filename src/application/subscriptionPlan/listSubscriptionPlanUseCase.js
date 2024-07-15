const SubscriptionPlanInterface = require("../../domain/port/subscriptionPlanInterface")
const { SubscriptionPlan } = require("../../domain/entity/subscriptionPlan")

class ListSubscriptionsPlansUseCase{
    constructor(subscriptionPlanInterfaces = new SubscriptionPlanInterface()){
        this.subscriptionPlanInterfaces = subscriptionPlanInterfaces
    }
    /**
     * 
     * @returns {Promise<Array<SubscriptionPlan>|null>}
     */
    async run(){
        try{
            return await this.subscriptionPlanInterfaces.listSubscriptionsPlans()
        }catch(error){
            console.error('Error:', error)
            return error
        }
    }
}

module.exports = { ListSubscriptionsPlansUseCase }