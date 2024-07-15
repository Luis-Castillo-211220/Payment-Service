const { CreateSubscriptionPlanUseCase } = require("../../../application/subscriptionPlan/createSubscriptionPlanUseCase")
const { SubscriptionPlan } = require("../../../domain/entity/subscriptionPlan")

class CreateSubscriptionPlanController{
    constructor(createSubscriptionPlanUseCase = new CreateSubscriptionPlanUseCase){
        this.createSubscriptionPlanUseCase = createSubscriptionPlanUseCase
    }

    async run(req= new Request, res= new Response){
        const { name, price, duration, description } = req.body
        const createPlan = await this.createSubscriptionPlanUseCase.run(name, price, duration, description)

        if(createPlan){
            return res.status(200).send({
                createPlan,
                message: "Subscription plan created successfully"
            })
        }else{
            res.status(404).send({
                message: "Failed to create subscription plan"
            })
        }
    }

}

module.exports = { CreateSubscriptionPlanController }