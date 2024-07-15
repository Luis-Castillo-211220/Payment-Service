const { SubscriptionPlan } = require("../../domain/entity/subscriptionPlan")
const SubscriptionPlanInterface = require("../../domain/port/subscriptionPlanInterface")

class CreateSubscriptionPlanUseCase{
    constructor(subscriptionPlanInterfaces = new SubscriptionPlanInterface){
        this.subscriptionPlanInterfaces = subscriptionPlanInterfaces
    }

    async run(name= String, price = Float, duration= Number, description= String){
        try{
            const createdSubscriptionPlan = await this.subscriptionPlanInterfaces.createSubscriptionPlan(name, price, duration, description)
            return createdSubscriptionPlan
        }catch(error){
            return error
        }
    }
}

module.exports = { CreateSubscriptionPlanUseCase }