const { SubscriptionPlan } = require("../../domain/entity/subscriptionPlan");
const SubscriptionPlanInterface = require("../../domain/port/subscriptionPlanInterface")

class GetByIdSubscriptionPlanUseCase{
    constructor(subscriptionPlanInterfaces = new SubscriptionPlanInterface()){
        this.subscriptionPlanInterfaces = subscriptionPlanInterfaces
    }

    /**
     * 
     * @param {Number} plan_id 
     * @returns {Promise<SubscriptionPlan|String|null>}
     */
    async run(plan_id){
        try{
            const data = await this.subscriptionPlanInterfaces.getByIdSuscritptionPlan(plan_id)
            return data
        }catch(error){
            console.error('Error:', error)
            return error
        }
    }
}

module.exports = { GetByIdSubscriptionPlanUseCase }