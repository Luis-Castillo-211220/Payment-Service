const { ListSubscriptionsPlansUseCase } = require("../../../application/subscriptionPlan/listSubscriptionPlanUseCase")

class ListSubscriptionsPlansController{
    constructor(listSubscriptionsPlansUseCase = new ListSubscriptionsPlansUseCase()) {
        this.listSubscriptionsPlansUseCase = listSubscriptionsPlansUseCase;
    }

    async run(req= Request, res= Response){
        const plans = await this.listSubscriptionsPlansUseCase.run();

        if(plans){
            return res.status(200).json({
                plans
            });
        }else{
            return res.status(404).json({
                status: "error, no subscriptions found",
                message: "No subscriptions found"
            });
        }
    }
}

module.exports = { ListSubscriptionsPlansController }