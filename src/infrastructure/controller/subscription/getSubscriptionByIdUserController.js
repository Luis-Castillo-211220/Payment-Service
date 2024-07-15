const { GetSubscriptionByIdUserUseCase } = require("../../../application/subscription/getSubscriptionByIdUserUseCase")

class GetSubscriptionByIdUserController{
    constructor(getSubscriptionByIdUserUseCase = new GetSubscriptionByIdUserUseCase()){
        this.getSubscriptionByIdUserUseCase = getSubscriptionByIdUserUseCase
    }

    async run(req= Request, res= Response){
        const { user_id } = req.params
        const getSubscription = await this.getSubscriptionByIdUserUseCase.run(user_id)

        if(getSubscription){
            return res.status(200).json({
                getSubscription
            })
        }else{
            res.status(404).json({
                status: "error, no subscription found",
            })
        }
    }
}

module.exports = { GetSubscriptionByIdUserController }