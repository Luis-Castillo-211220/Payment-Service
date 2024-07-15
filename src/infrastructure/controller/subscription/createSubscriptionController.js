const { CreateSubscriptionUseCase } = require("../../../application/subscription/createSubscriptionUseCase")
const { Subscription } = require("../../../domain/entity/subscription")

class CreateSubscriptionController{
    constructor(createSubscriptionUseCase = new CreateSubscriptionUseCase){
        this.createSubscriptionUseCase = createSubscriptionUseCase
    }

    async run(req = Request, res = Response){
        try{
            const {user_id, plan_id, status} = req.body
            const createdSubscription = await this.createSubscriptionUseCase.run(user_id, plan_id, status)

            if(createdSubscription){
                return res.status(200).json({
                    createdSubscription,
                    message: "Subscription created successfully"
                })
            }else{
                return res.status(400).json({
                    error: "Failed to create subscription"
                })
            }

        }catch(err){
            throw new Error('Error while creating subscription')
        }
    }
}

module.exports = { CreateSubscriptionController }