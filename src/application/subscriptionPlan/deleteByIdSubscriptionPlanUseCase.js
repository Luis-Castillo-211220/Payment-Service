const { SubscriptionPlan } = require("../../domain/entity/subscriptionPlan");
const SubscriptionPlanInterface = require("../../domain/port/subscriptionPlanInterface")

class DeleteByIdSubscriptionPlanUseCase{
    constructor(subscriptionPlanInterface = new SubscriptionPlanInterface()){
        this.subscriptionPlanInterface = subscriptionPlanInterface
    }

    /**
     * 
     * @param {Number} plan_id 
     * @return {Boolean}
     */
    async run(plan_id){
        try{
            return await this.subscriptionPlanInterface.deleteByIdSubscriptionPlan(plan_id)
        }catch(error){
            console.error(error.message)
            return error
        }
    }
}

module.exports = { DeleteByIdSubscriptionPlanUseCase }