const { UpdateSubscriptionStatusUseCase } = require("../../../application/subscription/updateSubscriptionStatusUseCase")

class UpdateSubscriptionStatusController{
    constructor(updateSubscriptionStatusUseCase = new UpdateSubscriptionStatusUseCase()){
        this.updateSubscriptionStatusUseCase = updateSubscriptionStatusUseCase
    }

    async run(req= Request, res= Response){
        try{
            const { user_id, dateNow } = req.body
            const updatedSubscription = await this.updateSubscriptionStatusUseCase.run(user_id, dateNow)
            
            if(!updatedSubscription){
                return res.status(200).json({
                    updatedSubscription,
                    message: "Subscription status updated successfully"
                })
            }else{
                return res.status(404).json({
                    message: "User not found or subscription not found"
                })
            }
        }catch(err){
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }

    }
}

module.exports = { UpdateSubscriptionStatusController }
