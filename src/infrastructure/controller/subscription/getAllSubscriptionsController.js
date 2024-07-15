const { GetAllSubscriptionsUseCase } = require("../../../application/subscription/getAllSubscriptionsUseCase")

class GetAllSubscriptionsController{
    constructor(getAllSubscriptionsUseCase = new GetAllSubscriptionsUseCase()){
        this.getAllSubscriptionsUseCase = getAllSubscriptionsUseCase
    }

    async run(req= Request, res= Response){
        const subscriptions = await this.getAllSubscriptionsUseCase.run()

        if(subscriptions){
            return res.status(200).json({
                subscriptions
            })
        }else{
            res.status(404).json({
                message: "No subscriptions found"
            })
        }
    }
}

module.exports = { GetAllSubscriptionsController }