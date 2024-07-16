const { UpdatePlanSubscriptionUseCase } = require("../../../application/subscription/updatePlanSubscriptionUseCase")

class UpdatePlanSubscriptionController{
    constructor(updatePlanSubscriptionUseCase = new UpdatePlanSubscriptionUseCase()){
        this.updatePlanSubscriptionUseCase = updatePlanSubscriptionUseCase
    }

    async run(req = Request, res = Response){
        try{
            const { user_id, newPlan_id} = req.params
            const updatedPlan = await this.updatePlanSubscriptionUseCase.run(user_id, newPlan_id)
            if(updatedPlan){
                return res.status(200).json({
                    updatedPlan,
                    message: 'Subscription plan updated successfully'
                })
            }else{
                return res.status(404).json({ message: 'No subscription found or error Updating subscription plan' })
            }
        }catch(err){
            console.error(err)
            return res.status(500).json({ message: 'Internal Server error' })
        }
    }
}

module.exports = { UpdatePlanSubscriptionController }