const { SubscriptionPlan } = require("../../domain/entity/subscriptionPlan")
const SubscriptionPlanInterface = require("../../domain/port/subscriptionPlanInterface")

class UpdateByIdSubscriptionPlanPriceUseCase{
    constructor(subscriptionPlanInterfaces = new SubscriptionPlanInterface()){
        this.subscriptionPlanInterfaces = subscriptionPlanInterfaces
    }


    /**
     * 
     * @param {Number} plan_id 
     * @param {Float} newPrice 
     * @returns 
     */
    async run(plan_id, newPrice){
        try{
            const updatedSubscriptionPlan = await this.subscriptionPlanInterfaces.updateByIdSuscritptionPlanPrice(plan_id, newPrice)
            return updatedSubscriptionPlan
        }catch(error){
            return error
        }
    }
}

module.exports = { UpdateByIdSubscriptionPlanPriceUseCase }