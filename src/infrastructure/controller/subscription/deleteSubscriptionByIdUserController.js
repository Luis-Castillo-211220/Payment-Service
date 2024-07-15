const { DeleteSubscriptionByIdUserUseCase } =  require("../../../application/subscription/deleteSubscriptionByIdUserUeCase")

class DeleteSubscriptionByIdUserController{
    constructor(deleteSubscriptionByIdUserUseCase = new DeleteSubscriptionByIdUserUseCase()){
        this.deleteSubscriptionByIdUserUseCase = deleteSubscriptionByIdUserUseCase
    }

    async run(req= Request, res= Response){
        const { user_id } = req.params
        const deleteSubscription = await this.deleteSubscriptionByIdUserUseCase.run(user_id)
        
        if(deleteSubscription){
            return res.status(200).json({
                message: "Subscription deleted successfully"
            })
        }else{
            return res.status(404).json({
                message: "User not found or subscription not found"
            })
        }
    }
}

module.exports = { DeleteSubscriptionByIdUserController }