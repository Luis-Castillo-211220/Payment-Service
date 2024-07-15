const {UpdateByIdSubscriptionPlanPriceUseCase } = require("../../../application/subscriptionPlan/updateByIdSubscriptionPlanPriceUseCase")

class UpdateByIdSubscriptionPlanPriceController{
    constructor(updateByIdSubscriptionPlanPriceUseCase = new UpdateByIdSubscriptionPlanPriceUseCase()){
        this.updateByIdSubscriptionPlanPriceUseCase = updateByIdSubscriptionPlanPriceUseCase
    }

    async run(req= new Request, res= new Response){
        try{
            const plan_id= req.params.plan_id;
            const newPrice = req.params.newPrice;
            const updated = await this.updateByIdSubscriptionPlanPriceUseCase.run(plan_id, newPrice)
            
            if(updated){
                return res.status(200).json({
                    updated,
                    message: "Subscription plan price updated successfully"
                })
            }else{
                return res.status(404).json({
                    message: "Failed to update subscription plan price"
                })
            }

        }catch(error){
            res.status(400).send({
                message: error.message
            })
        }
    }
}

module.exports = { UpdateByIdSubscriptionPlanPriceController }