const { DeleteByIdSubscriptionPlanUseCase } = require("../../../application/subscriptionPlan/deleteByIdSubscriptionPlanUseCase")

class DeleteByIdSubscriptionPlanController{
    constructor(deleteByIdSubscriptionPlanUseCase= new DeleteByIdSubscriptionPlanUseCase()){
        this.deleteByIdSubscriptionPlanUseCase = deleteByIdSubscriptionPlanUseCase
    }

    async run(req = Request, res= Response){
        try{
            const { plan_id } = req.params
            const result = await this.deleteByIdSubscriptionPlanUseCase.run(plan_id)

            if (result){
                return res.status(200).json({
                    message: "Subscription plan deleted successfully"
                })
            }else{
                return res.status(404).json({
                    message: "Failed to delete subscription plan"
                })
            }
        }catch(err){
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = { DeleteByIdSubscriptionPlanController }